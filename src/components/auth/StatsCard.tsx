import { StatsCardProps } from '@/lib/types/auth.types';

export default function StatsCard({ value, label }: StatsCardProps) {
    return (
        <div className="bg-white rounded-2xl p-6 shadow-lg transform hover:scale-105 transition-transform duration-300">
            <p className="text-orange-500 text-sm font-medium mb-2">{label}</p>
            <p className="text-4xl font-bold text-gray-900">{value}</p>
        </div>
    );
}
