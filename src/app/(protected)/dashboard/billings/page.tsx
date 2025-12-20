import { supabaseServer } from '@/supabase/server';
import BillingWrapper from '@/components/billing/BillingWrapper';
import type { BillingDisplayData } from '@/lib/types/billing.types';
import { db } from '@/lib/db/drizzle';
import { eq } from 'drizzle-orm';
import { subscriptions, usage, limits } from '../../../../../drizzle/schema';
import { PLAN_CONFIG, type PlanKey, stripe } from '@/lib/stripe/config';

export const metadata = {
    title: 'Billings | AdviceExpert.io',
};

export default async function BillingsPage() {
    const supabase = await supabaseServer();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    const userId = user!.id;

    const userSubscription = await db.query.subscriptions.findFirst({
        where: eq(subscriptions.userId, userId),
    });

    if (!userSubscription) {
        const billingData: BillingDisplayData = {
            subscription: null,
            usage: null,
            invoices: [],
        };
        return <BillingWrapper initialBillingData={billingData} />;
    }

    const userUsage = await db.query.usage.findFirst({
        where: eq(usage.userId, userId),
    });

    const userLimits = await db.query.limits.findFirst({
        where: eq(limits.userId, userId),
    });

    const actualPlan = (userSubscription.plan || userSubscription.planKey) as PlanKey;
    const planConfig = PLAN_CONFIG[actualPlan];

    const actualLimits = userLimits
        ? {
              storage_bytes: Number(userLimits.storageLimitBytes),
              forms_limit: userLimits.formsLimit,
              submissions_limit: userLimits.submissionsLimit,
              audio_minutes: userLimits.audioMinutesLimit,
              video_minutes: userLimits.videoMinutesLimit,
              video_intelligence: userLimits.videoIntelligenceEnabled,
          }
        : planConfig.limits;

    const storageUsed = Number(userUsage?.storageUsedBytes || 0);
    const storageLimit = actualLimits.storage_bytes;
    const audioUsed = Number(userUsage?.audioMinutesTranscribed || 0);
    const audioLimit = actualLimits.audio_minutes;

    const billingData: BillingDisplayData = {
        subscription: {
            plan: actualPlan,
            planName: planConfig.name,
            status: userSubscription.status,
            price: actualPlan === 'go' ? '$27' : '$69',
            nextBillingDate: userSubscription.subscriptionEnd
                ? new Date(userSubscription.subscriptionEnd).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric',
                  })
                : null,
            stripeCustomerId: userSubscription.stripeCustomerId,
        },
        usage: {
            storage: {
                used: storageUsed,
                limit: storageLimit,
                percentage: Math.round((storageUsed / storageLimit) * 100),
            },
            forms: {
                used: userUsage?.formsCreatedCount || 0,
                limit: actualLimits.forms_limit,
                unlimited: false,
            },
            submissions: {
                used: userUsage?.submissionsCount || 0,
                limit: actualLimits.submissions_limit,
                unlimited: false,
            },
            audioMinutes: {
                used: audioUsed,
                limit: audioLimit,
                percentage: Math.round((audioUsed / audioLimit) * 100),
            },
        },
        invoices: [],
    };

    if (actualLimits.video_intelligence) {
        const videoUsed = Number(userUsage?.videoMinutesUsed || 0);
        const videoLimit = actualLimits.video_minutes;
        billingData.usage!.videoMinutes = {
            used: videoUsed,
            limit: videoLimit,
            percentage: Math.round((videoUsed / videoLimit) * 100),
        };
    }

    if (userSubscription.stripeCustomerId) {
        try {
            const stripeInvoices = await stripe.invoices.list({
                customer: userSubscription.stripeCustomerId,
                limit: 5,
            });

            billingData.invoices = stripeInvoices.data.map((invoice) => ({
                id: invoice.id,
                date: new Date(invoice.created * 1000).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                }),
                amount: `$${(invoice.amount_paid / 100).toFixed(2)}`,
                status: invoice.status as any,
                pdfUrl: invoice.invoice_pdf || null,
            }));
        } catch (error) {
            console.error('Failed to fetch invoices from Stripe:', error);
        }
    }

    return <BillingWrapper initialBillingData={billingData} />;
}
