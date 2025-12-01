'use client';

import { FileText, Send, DollarSign, TrendingUp, Users, Zap, LucideIcon } from 'lucide-react';

export const iconMap: Record<string, LucideIcon> = {
    FileText,
    Send,
    DollarSign,
    TrendingUp,
    Users,
    Zap,
};

export const getIcon = (name: string) => {
    return iconMap[name] || FileText;
};
