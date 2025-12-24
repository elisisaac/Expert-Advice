'use client';

import { useEffect, useState } from 'react';
import { RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useBillingStore } from '@/store/billing.store';
import type { BillingDisplayData } from '@/lib/types/billing.types';
import { PricingView } from './PricingView';
import { PlanDetailsCard, InvoiceHistoryCard } from './BillingWidget';
import type { SubscriptionDetails } from './BillingWidget';
import { UsageQuotaCard } from './UsageQuotaCard';
import { UpgradeSection } from './UpgradeSection';
import { ResubscribeSection } from './ResubscribeSection';

interface BillingWrapperProps {
    initialBillingData: BillingDisplayData;
}

const YEARLY_DISCOUNT_PERCENT = parseInt(process.env.NEXT_PUBLIC_YEARLY_DISCOUNT_PERCENT || '10', 10);

export default function BillingWrapper({ initialBillingData }: BillingWrapperProps) {
    const { billingData, setBillingData, refreshBillingData, createCheckout, isCheckoutLoading, isRefreshing, loadingPlan } = useBillingStore();
    const [isYearly, setIsYearly] = useState(false);

    useEffect(() => {
        setBillingData(initialBillingData);
    }, [initialBillingData, setBillingData]);

    const subscription = billingData?.subscription;
    const usage = billingData?.usage;
    const invoices = billingData?.invoices || [];

    // Check subscription status
    const isCancelled = subscription?.status === 'cancelled';
    const showUpgrade = subscription?.plan === 'go' && subscription?.status === 'active';
    const showResubscribe = isCancelled;

    const handleSelectPlan = (planKey: string, interval: 'monthly' | 'yearly') => {
        createCheckout(planKey as any, interval);
    };

    if (!subscription) {
        return <PricingView isYearly={isYearly} onToggleYearly={() => setIsYearly(!isYearly)} onSelectPlan={handleSelectPlan} isLoading={isCheckoutLoading} loadingPlan={loadingPlan} yearlyDiscountPercent={YEARLY_DISCOUNT_PERCENT} />;
    }

    const subscriptionDetails: SubscriptionDetails = {
        plan: subscription.plan as 'go' | 'pro',
        status: subscription.status as 'active' | 'cancelled' | 'past_due',
        price: subscription.price,
        nextBillingDate: subscription.nextBillingDate,
    };

    return (
        <div className="flex flex-col p-4 md:p-8 gap-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl md:text-4xl font-bold">Billing & Usage</h1>
                    <p className="text-muted-foreground mt-1">Manage your subscription and monitor your usage</p>
                </div>
                <Button onClick={refreshBillingData} disabled={isRefreshing} variant="outline" className="gap-2">
                    <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                    {isRefreshing ? 'Refreshing...' : 'Refresh Data'}
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                {/* Left Column: Plan Details & Invoices */}
                <div className="space-y-8 flex flex-col h-full">
                    <PlanDetailsCard subscription={subscriptionDetails} />
                    <InvoiceHistoryCard invoices={invoices} />
                </div>

                {/* Right Column: Usage & Upgrade/Resubscribe */}
                <div className="space-y-8 flex flex-col h-full">
                    {!isCancelled && usage && <UsageQuotaCard usage={usage} />}

                    {showResubscribe && <ResubscribeSection previousPlan={subscription.plan as 'go' | 'pro'} yearlyDiscountPercent={YEARLY_DISCOUNT_PERCENT} onResubscribe={handleSelectPlan} isLoading={isCheckoutLoading} loadingPlan={loadingPlan} />}

                    {showUpgrade && <UpgradeSection yearlyDiscountPercent={YEARLY_DISCOUNT_PERCENT} />}
                </div>
            </div>
        </div>
    );
}
