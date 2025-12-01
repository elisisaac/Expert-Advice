import Link from 'next/link';
import { TriangleAlert, ArrowLeft, Ghost } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
    return (
        <div className="min-h-screen w-full bg-[#030303] text-gray-200 flex flex-col items-center justify-center p-6 relative overflow-hidden">
            {/* --- Background Effect --- */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[500px] bg-indigo-500/10 blur-[150px] rounded-full pointer-events-none" />

            <div className="relative z-10 text-center max-w-md w-full">
                {/* --- Icon and Code --- */}
                <div className="flex flex-col items-center mb-6">
                    <TriangleAlert className="w-16 h-16 text-red-500/80 mb-2 animate-bounce-slow" />
                    <h1 className="text-8xl font-extrabold text-white tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">404</h1>
                    <p className="text-xl font-medium text-red-400 mt-2">Page Not Found</p>
                </div>

                {/* --- Separator Line --- */}
                <div className="w-24 h-1 mx-auto bg-indigo-600 rounded-full mb-8" />

                {/* --- Main Message --- */}
                <p className="text-lg text-gray-400 mb-8">Uh oh! We couldn't find the page you were looking for. It might have been moved or doesn't exist.</p>

                {/* --- Action Buttons --- */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/dashboard" className="w-full sm:w-auto">
                        <Button className="w-full h-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold shadow-lg shadow-indigo-600/30 transition-all active:scale-95">
                            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
                        </Button>
                    </Link>

                    <Link href="/" className="w-full sm:w-auto">
                        <Button variant="outline" className="w-full h-12 bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 hover:text-white transition-colors">
                            <Ghost className="w-4 h-4 mr-2" /> Go to Homepage
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
