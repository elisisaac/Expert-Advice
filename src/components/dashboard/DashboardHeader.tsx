'use client';

import { Button } from '@/components/ui/button';
import { PanelLeft, PanelLeftClose } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { supabaseClient } from '@/supabase/client';
import { useEffect, useState } from 'react';
import UserDropdown from './UserDropdown';
import { Skeleton } from '@/components/ui/skeleton';

interface DashboardHeaderProps {
    isCollapsed: boolean;
    onToggle: () => void;
}

interface UserData {
    name: string;
    email: string;
    profilePhoto?: string | null;
}

export default function DashboardHeader({ isCollapsed, onToggle }: DashboardHeaderProps) {
    const router = useRouter();
    const [user, setUser] = useState<UserData | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            const {
                data: { user: authUser },
            } = await supabaseClient.auth.getUser();

            if (authUser) {
                const name = authUser.user_metadata?.name ?? authUser.email?.split('@')[0] ?? 'Anonymous';
                const email = authUser.email ?? '';
                const profilePhoto = authUser.user_metadata?.profile_photo ?? authUser.user_metadata?.avatar_url ?? null;

                setUser({ name, email, profilePhoto });
            }
            setIsLoading(false);
        };

        fetchUser();
    }, []);

    const handleLogout = async () => {
        await supabaseClient.auth.signOut();
        router.push('/auth/login');
    };

    return (
        <header className={cn('fixed top-0 right-0 z-30 bg-white border-b border-gray-100 transition-all duration-300', isCollapsed ? 'lg:left-20' : 'lg:left-64', 'left-0')}>
            <div className="px-4 py-3 lg:px-2">
                <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 flex-1">
                        <Button variant="ghost" size="icon" className="shrink-0" onClick={onToggle}>
                            {isCollapsed ? <PanelLeft className="w-5 h-5" /> : <PanelLeftClose className="w-5 h-5" />}
                        </Button>
                        <h1 className="text-lg sm:text-2xl font-bold truncate">Dashboard</h1>
                    </div>

                    <div className="flex items-center h-10">
                        {isLoading ? (
                            <div className="flex items-center gap-2 px-2">
                                <Skeleton className="h-8 w-8 sm:h-10 sm:w-10 rounded-full" />
                                <Skeleton className="h-4 w-4 rounded-sm hidden sm:block" />
                            </div>
                        ) : (
                            user && <UserDropdown user={user} onLogout={handleLogout} />
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}
