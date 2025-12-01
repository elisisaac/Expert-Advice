import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2, Zap } from 'lucide-react';

export function FormSubmitted() {
    return (
        <div className="w-full max-w-lg mx-auto animate-in fade-in zoom-in duration-500">
            <Card className="bg-[#0A0A0A] border border-green-500/30 shadow-2xl shadow-green-900/40 overflow-hidden">
                <CardContent className="p-10 text-center">
                    <div className="mb-6">
                        <div className="w-20 h-20 bg-green-600/30 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-500/50 shadow-inner shadow-green-500/10">
                            <CheckCircle2 className="w-10 h-10 text-green-400 animate-in zoom-in duration-1000" />
                        </div>
                        <h2 className="text-3xl font-bold text-white mb-2">Form Submitted!</h2>
                        <p className="text-gray-400 mb-4">We have received your submission.</p>
                        <div className="inline-flex items-center gap-2 text-sm font-medium text-indigo-400 bg-indigo-950/20 px-4 py-2 rounded-full border border-indigo-500/30">
                            <Zap className="w-4 h-4" />
                            Analysis initiated.
                        </div>
                        <p className="text-sm text-gray-500 mt-4">We'll review your information and get back to you soon.</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
