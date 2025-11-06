import { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface StatsCardProps {
    label: string;
    value: string | number;
    change?: string;
    trend?: 'up' | 'down';
    icon: LucideIcon;
}

export default function StatsCard({ label, value, change, trend, icon: Icon }: StatsCardProps) {
    return (
        <Card className="border-2 hover:shadow-lg transition-shadow duration-200">
            <CardContent className="p-6">
                <div className="flex items-start justify-between">
                    <div className="flex-1">
                        <p className="text-sm font-medium text-gray-500 mb-1">{label}</p>
                        <h3 className="text-3xl font-bold text-gray-900 mb-2">{value}</h3>
                        {change && (
                            <p className={cn('text-sm font-medium', trend === 'up' ? 'text-green-600' : 'text-red-600')}>
                                {trend === 'up' ? '↑' : '↓'} {change}
                            </p>
                        )}
                    </div>
                    <div className="w-12 h-12 bg-linear-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
                        <Icon className="w-6 h-6 text-white" />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
