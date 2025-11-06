import { EngagementChartProps } from '@/lib/types/auth.types';

export default function EngagementChart({ count }: EngagementChartProps) {
    return (
        <div className="bg-white rounded-2xl p-6 shadow-lg flex items-center justify-center relative h-32 transform hover:scale-105 transition-transform duration-300">
            <svg width="200" height="100" viewBox="0 0 200 100" className="absolute">
                <path d="M 20 80 Q 60 20, 100 50 T 180 30" fill="none" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
                <path d="M 20 80 Q 60 60, 100 70 T 180 60" fill="none" stroke="#6366F1" strokeWidth="3" strokeLinecap="round" />
            </svg>
            <div className="absolute bg-gray-900 text-white text-xs font-bold px-3 py-1.5 rounded-full z-10">{count}</div>
        </div>
    );
}
