'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CreditCard, Download, CheckCircle, AlertTriangle, Clock, FileText, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'sonner';

export type PlanType = 'go' | 'pro';
export type SubscriptionStatus = 'active' | 'cancelled' | 'past_due';

export interface SubscriptionDetails {
    plan: PlanType;
    status: SubscriptionStatus;
    price: string;
    nextBillingDate: string | null;
    paymentMethod?: string;
}

export interface Invoice {
    id: string;
    date: string;
    amount: string;
    status: 'paid' | 'open' | 'void' | 'uncollectible';
    pdfUrl: string | null;
}

const getPlanGradient = (plan: PlanType) => {
    switch (plan) {
        case 'pro':
            return 'bg-gradient-to-br from-indigo-600 to-purple-600';
        default:
            return 'bg-gradient-to-br from-gray-800 to-gray-900 border border-white/10';
    }
};

export function PlanDetailsCard({ subscription }: { subscription: SubscriptionDetails }) {
    const [loading, setLoading] = useState(false);

    const handleManageSubscription = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/billing/portal', {
                method: 'POST',
            });

            const data = await res.json();

            if (data.error) {
                toast.error(data.error);
                return;
            }

            window.location.href = data.url;
        } catch (error) {
            toast.error('Failed to open billing portal');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="bg-card border border-border shadow-sm flex flex-col h-full ">
            <CardHeader className="border-b pb-4">
                <CardTitle className="text-lg font-bold flex items-center justify-between">
                    Current Plan
                    <Badge
                        variant="outline"
                        className={`capitalize ${subscription.status === 'active' ? 'text-green-600 border-green-200 bg-green-50/50 dark:text-green-400 dark:border-green-900/50 dark:bg-green-900/20' : 'text-red-600 border-red-200 bg-red-50/50 dark:text-red-400 dark:border-red-900/50 dark:bg-red-900/20'}`}
                    >
                        {subscription.status.replace('_', ' ')}
                    </Badge>
                </CardTitle>
            </CardHeader>
            <CardContent className="p-6 flex flex-col gap-6">
                {/* Visual Credit Card */}
                <div className="relative overflow-hidden rounded-2xl p-6 bg-gradient-to-br from-indigo-600 to-violet-600 dark:from-indigo-700 dark:to-violet-700 text-white shadow-lg shadow-indigo-500/20 group">
                    <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 pointer-events-none group-hover:bg-white/15 transition-colors duration-500" />
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-black/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

                    <CreditCard className="absolute -right-4 -bottom-4 w-24 h-24 text-white/10 rotate-12 pointer-events-none" />

                    <div className="relative z-10">
                        <div className="flex justify-between items-start mb-6">
                            <div className="p-2 rounded-lg bg-white/20 backdrop-blur-sm border border-white/10">
                                <Sparkles className="w-5 h-5 text-white" />
                            </div>
                            {subscription.plan === 'pro' && <Badge className="bg-white/20 hover:bg-white/30 text-white border-0 backdrop-blur-md shadow-sm">PRO</Badge>}
                        </div>

                        <div className="space-y-1">
                            <p className="text-sm font-medium text-indigo-100 uppercase tracking-wider">{subscription.plan} Plan</p>
                            <div className="flex items-baseline gap-1">
                                <span className="text-4xl font-bold tracking-tight">{subscription.price}</span>
                                <span className="text-sm text-indigo-100 font-medium">/month</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm p-3 rounded-lg bg-muted/50 border hover:bg-muted/80 transition-colors">
                        <span className="text-muted-foreground flex items-center gap-2">
                            <Clock className="w-4 h-4 text-indigo-500" /> Next billing
                        </span>
                        <span className="font-semibold tabular-nums">{subscription.nextBillingDate || 'N/A'}</span>
                    </div>
                </div>

                <div className="mt-auto mx-auto pt-2">
                    <Button onClick={handleManageSubscription} disabled={loading} className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-md shadow-indigo-200 dark:shadow-indigo-900/20 h-11 transition-all active:scale-[0.98]">
                        {loading ? 'Redirecting...' : 'Manage Subscription'}
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}

export function InvoiceHistoryCard({ invoices }: { invoices: Invoice[] }) {
    return (
        <Card className="bg-card border border-border shadow-sm flex flex-col h-full">
            <CardHeader className="border-b pb-4">
                <CardTitle className="text-lg font-bold flex items-center gap-2">
                    <FileText className="w-4 h-4 text-muted-foreground" />
                    Recent Invoices
                </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                <div className="divide-y max-h-[300px] overflow-y-auto custom-scrollbar">
                    {invoices.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-12 text-center">
                            <div className="p-3 rounded-full bg-muted mb-3">
                                <FileText className="w-5 h-5 text-muted-foreground" />
                            </div>
                            <p className="text-sm font-medium text-muted-foreground">No invoices found</p>
                        </div>
                    ) : (
                        invoices.map((invoice) => (
                            <div key={invoice.id} className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors group">
                                <div className="flex items-center gap-4">
                                    <div className={`p-2 rounded-lg ${invoice.status === 'paid' ? 'bg-green-500/10 text-green-600 dark:text-green-400' : 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400'}`}>
                                        {invoice.status === 'paid' ? <CheckCircle className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-foreground">{invoice.amount}</p>
                                        <p className="text-xs text-muted-foreground">{invoice.date}</p>
                                    </div>
                                </div>
                                <Button asChild variant="ghost" size="sm" className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity" disabled={!invoice.pdfUrl}>
                                    <Link href={invoice.pdfUrl || '#'} target="_blank">
                                        <Download className="w-4 h-4" />
                                        <span className="sr-only">Download</span>
                                    </Link>
                                </Button>
                            </div>
                        ))
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
