'use client';

import AuthSidebar from './AuthSidebar';
import { AuthLayoutProps } from '@/lib/types/auth.types';

export default function AuthLayout({ children, stats }: AuthLayoutProps) {
    return (
        <div className="min-h-screen bg-[#030303] flex items-center justify-center p-4">
            <div className="w-full max-w-6xl bg-[#0A0A0A] rounded-2xl border border-white/10 shadow-2xl shadow-black/40 overflow-hidden grid grid-cols-1 lg:grid-cols-2">
                {/* Left Side (Form) */}
                <div className="p-8 lg:p-12 order-2 lg:order-1 text-gray-200">{children}</div>

                {/* Right Side (Visual/Sidebar) */}
                <div className="hidden lg:flex h-full items-center justify-center bg-white/5 p-8 lg:p-12 relative overflow-hidden order-1 lg:order-2 border-l border-white/10">
                    <AuthSidebar stats={stats} />
                </div>
            </div>
        </div>
    );
}
