import { CreditCard, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function BillingsPage() {
    const invoices = [
        { id: 1, date: 'May 1, 2023', amount: '$29.00', status: 'Paid' },
        { id: 2, date: 'Apr 1, 2023', amount: '$29.00', status: 'Paid' },
        { id: 3, date: 'Mar 1, 2023', amount: '$29.00', status: 'Paid' },
        { id: 4, date: 'Feb 1, 2023', amount: '$29.00', status: 'Paid' },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Billings</h1>
                <p className="text-gray-500 mt-1">Manage your subscription and invoices</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="border-2 lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Current Plan</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-6 bg-linear-to-br from-indigo-600 to-purple-600 rounded-xl text-white">
                                <div>
                                    <p className="text-sm opacity-90 mb-1">Pro Plan</p>
                                    <p className="text-4xl font-bold">
                                        $29<span className="text-lg font-normal">/month</span>
                                    </p>
                                </div>
                                <CreditCard className="w-16 h-16 opacity-80" />
                            </div>
                            <div className="space-y-3 pt-2">
                                <div className="flex items-center justify-between text-sm py-2 border-b border-gray-100">
                                    <span className="text-gray-600">Next billing date</span>
                                    <span className="font-semibold text-gray-900">June 1, 2023</span>
                                </div>
                                <div className="flex items-center justify-between text-sm py-2 border-b border-gray-100">
                                    <span className="text-gray-600">Payment method</span>
                                    <span className="font-semibold text-gray-900">•••• 4242</span>
                                </div>
                            </div>
                            <Button variant="outline" className="w-full h-11 rounded-xl border-2 mt-4">
                                Manage Subscription
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-2">
                    <CardHeader>
                        <CardTitle>Recent Invoices</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {invoices.map((invoice) => (
                                <div key={invoice.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
                                    <div>
                                        <p className="text-sm font-semibold text-gray-900">{invoice.amount}</p>
                                        <p className="text-xs text-gray-500">{invoice.date}</p>
                                    </div>
                                    <Button variant="ghost" size="icon">
                                        <Download className="w-4 h-4" />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
