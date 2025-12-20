import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { stripe } from '@/lib/stripe/config';
export async function POST(req: Request) {
    const body = await req.text();
    const headersList = await headers();
    const signature = headersList.get('stripe-signature');
    if (!signature) {
        return NextResponse.json({ error: 'No signature' }, { status: 400 });
    }
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!webhookSecret) {
        return NextResponse.json({ error: 'Webhook not configured' }, { status: 500 });
    }
    // Verify signature
    let event;
    try {
        event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err: any) {
        console.error('[Webhook] Signature verification failed:', err.message);
        return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }
    // Forward verified event to N8N and wait for response
    const n8nUrl = process.env.N8N_STRIPE_WEBHOOK_URL!;
    if (!n8nUrl) {
        console.error('[Webhook] N8N URL not configured');
        return NextResponse.json({ error: 'N8N not configured' }, { status: 500 });
    }

    try {
        // Forward to N8N with timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 25000); // 25s timeout (Stripe has 30s limit)

        const n8nResponse = await fetch(n8nUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(event),
            signal: controller.signal,
        });

        clearTimeout(timeoutId);

        // Check if N8N processed successfully
        if (!n8nResponse.ok) {
            const errorText = await n8nResponse.text();
            console.error('[Webhook] N8N processing failed:', n8nResponse.status, errorText);
            return NextResponse.json({ error: 'N8N processing failed', details: errorText }, { status: 500 });
        }

        const n8nResult = await n8nResponse.json();
        console.log('[Webhook] N8N processed successfully:', event.type);

        // Return success to Stripe only if N8N succeeded
        return NextResponse.json({ n8nResult });
    } catch (error: any) {
        if (error.name === 'AbortError') {
            console.error('[Webhook] N8N request timeout');
            return NextResponse.json({ error: 'N8N timeout' }, { status: 504 });
        }
        console.error('[Webhook] Failed to forward to N8N:', error);
        return NextResponse.json({ error: 'N8N request failed' }, { status: 500 });
    }
}
