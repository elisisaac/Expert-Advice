import { NextResponse } from 'next/server';
import { supabaseServer } from '@/supabase/server';
import { stripe, PLAN_CONFIG, type PlanKey } from '@/lib/stripe/config';

export async function POST(req: Request) {
    try {
        const { planKey, interval = 'monthly' } = await req.json();

        const supabase = await supabaseServer();
        const { data: user } = await supabase.auth.getUser();
        const userId = user?.user?.id;
        if (!userId) return NextResponse.json({ error: 'Unauthenticated' }, { status: 401 });

        const plan = PLAN_CONFIG[planKey as PlanKey];
        if (!plan) {
            return NextResponse.json({ error: 'Invalid plan' }, { status: 400 });
        }

        const priceId = interval === 'yearly' ? plan.stripePriceId.yearly : plan.stripePriceId.monthly;

        // Check if user already has a subscription record
        const { data: existingSubscription } = await supabase.from('subscriptions').select('stripe_customer_id, stripe_subscription_id, status, plan_key').eq('user_id', userId).single();

        // Build checkout session parameters
        const sessionParams: any = {
            line_items: [
                {
                    price: priceId,
                    quantity: 1,
                },
            ],
            mode: 'subscription',
            success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/billings`,
            cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/billings`,
            metadata: {
                userId: userId,
                planKey: plan.key,
                interval: interval,
            },
        };

        // Use existing customer ID if available, otherwise use email to create new customer
        if (existingSubscription?.stripe_customer_id) {
            sessionParams.customer = existingSubscription.stripe_customer_id;
        } else {
            sessionParams.customer_email = user.user?.email;
        }

        const session = await stripe.checkout.sessions.create(sessionParams);

        return NextResponse.json({ url: session.url });
    } catch (error: any) {
        console.error('Checkout error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
