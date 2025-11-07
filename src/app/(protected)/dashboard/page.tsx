import { FileText, Send, DollarSign, TrendingUp } from 'lucide-react';
import StatsCard from '@/components/dashboard/StatsCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata = {
    title: 'Dashboard',
};

export default function DashboardPage() {
    const stats = [
        { label: 'Total Forms', value: '24', change: '+12%', trend: 'up' as const, icon: FileText },
        { label: 'Submissions', value: '1,429', change: '+8%', trend: 'up' as const, icon: Send },
        { label: 'Revenue', value: '$12,450', change: '+23%', trend: 'up' as const, icon: DollarSign },
        { label: 'Conversion Rate', value: '68%', change: '+5%', trend: 'up' as const, icon: TrendingUp },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Overview</h1>
                <p className="text-gray-500 mt-1">Welcome back! Here's what's happening today.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => (
                    <StatsCard key={stat.label} {...stat} />
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="border-2">
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[1, 2, 3, 4, 5].map((item) => (
                                <div key={item} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                                    <div className="w-10 h-10 bg-linear-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">{item}</div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-gray-900">New form submission received</p>
                                        <p className="text-xs text-gray-500">{item * 2} minutes ago</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card className="border-2">
                    <CardHeader>
                        <CardTitle>Popular Forms</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[
                                { name: 'Contact Form', count: 234 },
                                { name: 'Newsletter Signup', count: 189 },
                                { name: 'Feedback Form', count: 156 },
                                { name: 'Support Request', count: 123 },
                            ].map((form, index) => (
                                <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                                            <FileText className="w-5 h-5 text-indigo-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">{form.name}</p>
                                            <p className="text-xs text-gray-500">{form.count} submissions</p>
                                        </div>
                                    </div>
                                    <div className="text-sm font-semibold text-indigo-600">{form.count}</div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
