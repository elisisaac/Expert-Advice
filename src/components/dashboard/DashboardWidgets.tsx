'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Zap, FileText } from 'lucide-react';
import { getIcon } from './IconMap';

export interface ActivityItem {
    text: string;
    time: number;
    iconName: string;
    color: 'indigo' | 'green' | 'pink' | 'yellow';
}

export function RecentActivityCard({ activities }: { activities: ActivityItem[] }) {
    return (
        <Card className="bg-[#0A0A0A] border border-white/10 shadow-xl shadow-black/20 flex flex-col h-full">
            <CardHeader className="border-b border-white/5 pb-4 shrink-0">
                <CardTitle className="text-lg font-medium text-white flex items-center gap-2">
                    <Zap className="w-5 h-5 text-yellow-400" />
                    Recent Activity
                </CardTitle>
            </CardHeader>
            <CardContent className="p-6 overflow-y-auto custom-scrollbar">
                <div className="space-y-4">
                    {activities.map((item, index) => {
                        const Icon = getIcon(item.iconName);
                        return (
                            <div key={index} className="flex items-center space-x-4 p-3 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/10 group">
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-${item.color}-500/10 text-${item.color}-400 border border-${item.color}-500/20 group-hover:scale-105 transition-transform`}>
                                    <Icon className="w-5 h-5" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-gray-200">{item.text}</p>
                                    <p className="text-xs text-gray-500 mt-0.5">{item.time} minutes ago</p>
                                </div>
                                <div className="text-xs font-medium text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer hover:text-white">View</div>
                            </div>
                        );
                    })}
                </div>
            </CardContent>
        </Card>
    );
}

export interface PopularFormItem {
    name: string;
    count: number;
}

export function PopularFormsCard({ forms }: { forms: PopularFormItem[] }) {
    return (
        <Card className="bg-[#0A0A0A] border border-white/10 shadow-xl shadow-black/20 flex flex-col h-full">
            <CardHeader className="border-b border-white/5 pb-4 shrink-0">
                <CardTitle className="text-lg font-medium text-white flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-indigo-400" />
                    Popular Forms
                </CardTitle>
            </CardHeader>
            <CardContent className="p-6 overflow-y-auto custom-scrollbar">
                <div className="space-y-4">
                    {forms.map((form, index) => (
                        <div key={index} className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors border border-transparent hover:border-white/10 group">
                            <div className="flex items-center space-x-4">
                                <div className="w-10 h-10 bg-indigo-500/10 rounded-lg flex items-center justify-center border border-indigo-500/20 group-hover:border-indigo-500/40 transition-colors">
                                    <FileText className="w-5 h-5 text-indigo-400" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-200">{form.name}</p>
                                    <p className="text-xs text-gray-500 mt-0.5">Submissions</p>
                                </div>
                            </div>
                            <div className="text-sm font-bold text-indigo-300 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">{form.count}</div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
