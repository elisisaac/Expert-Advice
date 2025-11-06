'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, FileText, Send, CreditCard, Settings, HelpCircle, LogOut, Fan } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { supabaseClient } from '@/supabase/client';

export default function Sidebar({ isCollapsed, onToggle }: { isCollapsed: boolean; onToggle: () => void }) {
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = async () => {
        const { error } = await supabaseClient.auth.signOut();
        if (error) console.error('Logout error:', error);
        router.push('/auth/login');
    };

    const mainItems = [
        { icon: LayoutDashboard, label: 'Overview', href: '/dashboard' },
        { icon: FileText, label: 'Forms', href: '/dashboard/forms' },
        { icon: Send, label: 'Submissions', href: '/dashboard/submissions' },
        { icon: CreditCard, label: 'Billings', href: '/dashboard/billings' },
        { icon: Settings, label: 'Settings', href: '/dashboard/settings' },
    ];

    const bottomItems = [
        { icon: HelpCircle, label: 'Help & Information', href: '/help' },
        { icon: LogOut, label: 'Log out', onClick: handleLogout },
    ];

    return (
        <>
            <aside className={cn('fixed left-0 top-0 h-screen bg-white flex flex-col transition-all duration-300 z-40 border-r border-gray-100', isCollapsed ? 'w-20 -translate-x-full lg:translate-x-0' : 'w-64 translate-x-0')}>
                <div className="p-6 flex items-center justify-center">
                    <Link href={'/'}>
                        <div className="flex items-center gap-2 w-full justify-center cursor-pointer">
                            <Fan className="w-8 h-8 text-indigo-600 hover:text-indigo-700" />
                            {!isCollapsed && <span className="text-xl font-bold text-gray-900 whitespace-nowrap transition-opacity duration-200">Logip</span>}
                        </div>
                    </Link>
                </div>

                <nav className="flex-1 p-4 space-y-1 overflow-hidden">
                    {mainItems.map((item) => (
                        <Link key={item.href} href={item.href} className={cn('flex items-center gap-3 px-4 py-3 rounded-lg transition-all', pathname === item.href ? 'bg-indigo-50 text-indigo-600' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900', isCollapsed && 'justify-center px-2')}>
                            <item.icon className="w-5 h-5 shrink-0" />
                            {!isCollapsed && <span className="text-sm font-medium">{item.label}</span>}
                        </Link>
                    ))}
                </nav>

                {!isCollapsed && (
                    <div className="p-4">
                        <div className="bg-gray-50 rounded-xl p-4 mb-4">
                            <h3 className="font-semibold text-sm mb-1">Upgrade to Pro</h3>
                            <p className="text-xs text-gray-500 mb-3">Get 1 month free and unlock</p>
                            <Button className="w-full bg-indigo-600 hover:bg-indigo-700 h-9 text-sm rounded-lg">Upgrade</Button>
                        </div>
                    </div>
                )}

                <div className="p-4 border-t border-gray-100">
                    <div className="space-y-1">
                        {bottomItems.map((item) =>
                            item.onClick ? (
                                <button key={item.label} onClick={item.onClick} className={cn('flex w-full items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all text-left cursor-pointer', isCollapsed && 'justify-center px-2')}>
                                    <item.icon className="w-5 h-5 shrink-0" />
                                    {!isCollapsed && <span className="text-sm font-medium">{item.label}</span>}
                                </button>
                            ) : (
                                <Link key={item.href} href={item.href} className={cn('flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all', isCollapsed && 'justify-center px-2')}>
                                    <item.icon className="w-5 h-5 shrink-0" />
                                    {!isCollapsed && <span className="text-sm font-medium">{item.label}</span>}
                                </Link>
                            )
                        )}
                    </div>
                </div>
            </aside>

            {!isCollapsed && <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={onToggle} />}
        </>
    );
}
