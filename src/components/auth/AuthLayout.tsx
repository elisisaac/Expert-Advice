import AuthSidebar from './AuthSidebar';
import { AuthLayoutProps } from '@/lib/types/auth.types';

export default function AuthLayout({ children, stats }: AuthLayoutProps) {
    return (
        <div className="min-h-screen bg-linear-to-br from-indigo-50 via-purple-50 to-blue-50 flex items-center justify-center p-4">
            <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2">
                <div className="p-8 lg:p-12 order-2 lg:order-1">{children}</div>
                <div className="hidden lg:flex bg-linear-to-br from-indigo-600 via-purple-600 to-blue-600 p-8 lg:p-12 relative overflow-hidden order-1 lg:order-2">
                    <AuthSidebar stats={stats} />
                </div>
            </div>
        </div>
    );
}
