'use client';

import { useState } from 'react';
import { Sparkles, Check, AlertCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface ResubscribeSectionProps {
    previousPlan?: 'go' | 'pro';
    yearlyDiscountPercent: number;
    onResubscribe: (planKey: 'go' | 'pro', interval: 'monthly' | 'yearly') => void;
    isLoading: boolean;
    loadingPlan: string | null;
}

const plans = [
    {
        key: 'go' as const,
        name: 'Go Plan',
        monthlyPrice: 27,
        description: 'Essential tools for individuals and small teams',
        features: ['5 active forms', '20 form submissions', '120 minutes of audio transcription', '10 GB storage', 'Standard support'],
        gradient: 'from-slate-600 to-slate-700',
    },
    {
        key: 'pro' as const,
        name: 'Pro Plan',
        monthlyPrice: 69,
        description: 'Unlock higher potential and advanced intelligence',
        features: ['20 active forms', '100 form submissions', '600 minutes of audio transcription', '300 minutes of video intelligence', '50 GB storage', 'Priority support'],
        gradient: 'from-indigo-600 to-violet-600',
        popular: true,
    },
];

export function ResubscribeSection({ previousPlan, yearlyDiscountPercent, onResubscribe, isLoading, loadingPlan }: ResubscribeSectionProps) {
    const [isYearly, setIsYearly] = useState(false);

    const getYearlyPrice = (monthlyPrice: number) => {
        return monthlyPrice * (1 - yearlyDiscountPercent / 100);
    };

    return (
        <div className="space-y-6">
            {/* Alert Banner */}
            <Alert className="border-amber-200 bg-amber-50/50 dark:border-amber-900/50 dark:bg-amber-900/10">
                <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                <AlertDescription className="text-amber-800 dark:text-amber-200">Your subscription has ended. Choose a plan below to continue using all features.</AlertDescription>
            </Alert>

            {/* Header */}
            <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold">Welcome Back! Choose Your Plan</h2>
                <p className="text-muted-foreground">Pick up where you left off with flexible billing options</p>
            </div>

            {/* Monthly/Yearly Toggle */}
            <div className="flex justify-center">
                <div className="flex items-center bg-muted/50 p-1 rounded-lg border">
                    <button onClick={() => setIsYearly(false)} className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${!isYearly ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}>
                        Monthly
                    </button>
                    <button onClick={() => setIsYearly(true)} className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${isYearly ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}>
                        Yearly
                        <span className="ml-1.5 text-[10px] uppercase font-bold text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400 px-1.5 py-0.5 rounded-full">-{yearlyDiscountPercent}%</span>
                    </button>
                </div>
            </div>

            {/* Plan Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {plans.map((plan) => {
                    const displayPrice = isYearly ? getYearlyPrice(plan.monthlyPrice) : plan.monthlyPrice;
                    const isCurrentLoading = loadingPlan === `${plan.key}-${isYearly ? 'yearly' : 'monthly'}`;
                    const wasPreviousPlan = previousPlan === plan.key;

                    return (
                        <Card key={plan.key} className={`relative overflow-hidden transition-all hover:shadow-lg ${plan.popular ? 'border-indigo-200 dark:border-indigo-800 shadow-md' : 'border-border'}`}>
                            {plan.popular && <div className="absolute top-0 right-0 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">POPULAR</div>}
                            {wasPreviousPlan && <div className="absolute top-0 left-0 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-br-lg">YOUR PLAN</div>}

                            <div className="p-6 space-y-6">
                                {/* Plan Header */}
                                <div>
                                    <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
                                    <p className="text-sm text-muted-foreground">{plan.description}</p>
                                </div>

                                {/* Price */}
                                <div>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-4xl font-bold tracking-tight">${displayPrice % 1 === 0 ? displayPrice.toFixed(0) : displayPrice.toFixed(2)}</span>
                                        <span className="text-muted-foreground font-medium">/{isYearly ? 'year' : 'month'}</span>
                                    </div>
                                    {isYearly && <p className="text-sm text-green-600 dark:text-green-400 mt-1 font-medium">Save ${(plan.monthlyPrice * 12 - displayPrice * 12).toFixed(2)}/year</p>}
                                </div>

                                {/* Features */}
                                <ul className="space-y-3">
                                    {plan.features.map((feature, idx) => (
                                        <li key={idx} className="flex items-start gap-2">
                                            <div className="mt-0.5 p-0.5 rounded-full bg-green-100 dark:bg-green-900/30">
                                                <Check className="w-3.5 h-3.5 text-green-600 dark:text-green-400" />
                                            </div>
                                            <span className="text-sm">{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                {/* CTA Button */}
                                <Button
                                    onClick={() => onResubscribe(plan.key, isYearly ? 'yearly' : 'monthly')}
                                    disabled={isLoading}
                                    className={`w-full h-11 font-semibold transition-all ${plan.popular ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-200 dark:shadow-indigo-900/20' : 'bg-muted hover:bg-accent text-foreground border-2'}`}
                                >
                                    {isCurrentLoading ? (
                                        'Processing...'
                                    ) : (
                                        <>
                                            {wasPreviousPlan ? 'Reactivate' : 'Subscribe to'} {plan.name}
                                            {!isCurrentLoading && plan.popular && <Sparkles className="w-4 h-4 ml-2" />}
                                        </>
                                    )}
                                </Button>
                            </div>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}
