'use client';

import { Zap, Check, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useState } from 'react';
import { toast } from 'sonner';

interface UpgradeSectionProps {
    yearlyDiscountPercent: number;
}

const proFeatures = [
    { icon: Zap, text: '20 active forms', highlight: true },
    { icon: Zap, text: '100 form submissions', highlight: true },
    { icon: Zap, text: '600 minutes of audio transcription' },
    { icon: Sparkles, text: '300 minutes of video intelligence', highlight: true },
    { icon: Check, text: '50 GB storage' },
    { icon: Check, text: 'Priority support' },
];

export function UpgradeSection({ yearlyDiscountPercent }: UpgradeSectionProps) {
    const [isYearly, setIsYearly] = useState(false);
    const [loading, setLoading] = useState(false);

    const getYearlyPrice = (monthlyPrice: number) => {
        return monthlyPrice * (1 - yearlyDiscountPercent / 100);
    };

    const monthlyPrice = 69; // Pro plan monthly price
    const displayPrice = isYearly ? getYearlyPrice(monthlyPrice) : monthlyPrice;

    const handleUpgrade = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/billing/portal', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            });

            const data = await res.json();

            if (data.error) {
                toast.error(data.error);
                setLoading(false);
                return;
            }

            // Redirect to Stripe Billing Portal
            window.location.href = data.url;
        } catch (error) {
            toast.error('Failed to open billing portal');
            setLoading(false);
        }
    };

    return (
        <Card className="bg-gradient-to-br from-indigo-50/50 to-purple-50/50 dark:from-indigo-950/20 dark:to-purple-950/20 border-indigo-200 dark:border-indigo-800 shadow-sm">
            <div className="p-6 md:p-8 space-y-8">
                {/* Header with Toggle */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2">
                            <div className="p-2 rounded-lg bg-indigo-600/10 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400">
                                <Sparkles className="w-5 h-5" />
                            </div>
                            <h3 className="text-xl font-bold">Upgrade to Pro</h3>
                        </div>
                        <p className="text-sm text-muted-foreground ml-11">Unlock advanced AI features & more storage</p>
                    </div>

                    {/* Monthly/Yearly Toggle */}
                    <div className="flex items-center bg-muted/50 p-1 rounded-lg border ml-11 md:ml-0">
                        <button onClick={() => setIsYearly(false)} className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${!isYearly ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}>
                            Monthly
                        </button>
                        <button onClick={() => setIsYearly(true)} className={`px-4 py-2 text-sm font-medium rounded-md transition-all ${isYearly ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}>
                            Yearly
                            <span className="ml-1.5 text-[10px] uppercase font-bold text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400 px-1.5 py-0.5 rounded-full">-{yearlyDiscountPercent}%</span>
                        </button>
                    </div>
                </div>

                {/* Pricing */}
                <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-bold tracking-tight">${displayPrice % 1 === 0 ? displayPrice.toFixed(0) : displayPrice.toFixed(2)}</span>
                    <span className="text-lg text-muted-foreground font-medium">/{isYearly ? 'year' : 'month'}</span>
                </div>

                {isYearly && (
                    <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400 font-medium -mt-4">
                        <Check className="w-4 h-4" />
                        Save ${((monthlyPrice - displayPrice) * 12).toFixed(2)} per year
                    </div>
                )}

                {/* Features */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {proFeatures.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                            <div className={`p-1.5 rounded-md ${feature.highlight ? 'bg-indigo-100 dark:bg-indigo-900/30' : 'bg-muted'}`}>
                                <feature.icon className={`w-4 h-4 ${feature.highlight ? 'text-indigo-600 dark:text-indigo-400' : 'text-muted-foreground'}`} />
                            </div>
                            <span className="text-sm leading-relaxed">{feature.text}</span>
                        </div>
                    ))}
                </div>

                {/* CTA Button */}
                <Button onClick={handleUpgrade} disabled={loading} className="w-full h-12 text-base font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-200 dark:shadow-indigo-900/20 transition-all group">
                    {loading ? (
                        'Opening Billing Portal...'
                    ) : (
                        <>
                            Manage Subscription
                            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                        </>
                    )}
                </Button>
            </div>
        </Card>
    );
}
