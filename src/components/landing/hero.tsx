import { ArrowRight, PlayCircle, FileJson, ScanLine } from 'lucide-react';
import Link from 'next/link';

export function Hero() {
    return (
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden px-4">
            {/* Background Glow (Always centered, responsive blur area) */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[90vw] max-w-[1200px] h-[400px] bg-indigo-500/20 blur-[120px] rounded-full opacity-50 pointer-events-none" />

            <div className="container mx-auto relative z-10 text-center">
                {/* Badge (Mobile Friendly) */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-indigo-300 mb-8 hover:bg-white/10 transition-colors cursor-default">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                    </span>
                    v2.0 Now Available: Object Detection
                </div>

                {/* Headline (Responsive Sizing) */}
                <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-linear-to-b from-white to-white/60 mb-6 max-w-4xl mx-auto leading-tight">
                    Data intake forms that <br />
                    <span className="text-indigo-400">watch, listen, and analyze.</span>
                </h1>

                <p className="text-base md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">The "Typeform" for the AI era. Let customers upload video evidence. We auto-transcribe it to JSON, detect damages, and format it for your workflow.</p>

                {/* CTA Buttons (Responsive Stack) */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
                    <Link href="/auth/signup" className="w-full sm:w-auto h-12 px-8 rounded-lg bg-indigo-600 text-white font-semibold flex items-center justify-center gap-2 hover:bg-indigo-500 transition-all active:scale-95 shadow-lg shadow-indigo-600/30">
                        Start Free Trial <ArrowRight className="w-4 h-4" />
                    </Link>
                    <button className="w-full sm:w-auto h-12 px-8 rounded-lg bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                        <PlayCircle className="w-4 h-4 text-indigo-400" /> Watch Demo
                    </button>
                </div>

                {/* Visual Mockup - Responsive Grid Layout */}
                <div className="relative mx-auto max-w-5xl rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-3 md:p-4 shadow-2xl">
                    <div className="absolute inset-0 bg-linear-to-tr from-indigo-500/10 to-transparent rounded-xl pointer-events-none" />

                    {/* Mockup Header */}
                    <div className="h-6 md:h-8 flex items-center gap-2 px-3 md:px-4 border-b border-white/10 mb-3 md:mb-4">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/50" />
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500/20 border border-green-500/50" />
                    </div>

                    {/* Mockup Body: Stacked on Mobile, Split on MD */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-2 md:p-4 text-left">
                        {/* Left: Video Input Simulation */}
                        <div className="space-y-3">
                            <div className="text-xs text-gray-500 font-mono uppercase">Input Source</div>
                            <div className="aspect-video bg-black/40 rounded-lg border border-white/5 flex items-center justify-center relative overflow-hidden group">
                                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-40 grayscale group-hover:grayscale-0 transition-all duration-500" />
                                <ScanLine className="w-10 h-10 md:w-12 md:h-12 text-indigo-500/80 absolute animate-pulse" />
                                <div className="absolute bottom-2 left-2 bg-black/60 px-2 py-1 rounded text-xs text-green-400 font-mono">● REC | AI Analyzing...</div>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                <span className="text-xs bg-indigo-500/20 text-indigo-300 px-2 py-1 rounded border border-indigo-500/30">Detection: Damage</span>
                                <span className="text-xs bg-indigo-500/20 text-indigo-300 px-2 py-1 rounded border border-indigo-500/30">Confidence: 98%</span>
                            </div>
                        </div>

                        {/* Right: Code Output Simulation (Uses small font for responsiveness) */}
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <div className="text-xs text-gray-500 font-mono uppercase">Output: Structured Data</div>
                                <FileJson className="w-4 h-4 text-gray-600" />
                            </div>
                            <div className="bg-[#0A0A0A] rounded-lg p-3 md:p-4 font-mono text-[10px] md:text-xs text-gray-400 border border-white/5 overflow-hidden relative">
                                <div className="absolute top-0 right-0 p-2">
                                    <div className="flex gap-1">
                                        <div className="w-2 h-2 rounded-full bg-gray-700" />
                                        <div className="w-2 h-2 rounded-full bg-gray-700" />
                                    </div>
                                </div>
                                <p>
                                    <span className="text-purple-400">"first_name"</span>: <span className="text-green-400">"John"</span>,
                                </p>
                                <p>
                                    <span className="text-purple-400">"last_name"</span>: <span className="text-green-400">"Doe"</span>,
                                </p>
                                <p>
                                    <span className="text-purple-400">"email"</span>: <span className="text-green-400">"john@example.com"</span>,
                                </p>
                                <p>
                                    <span className="text-purple-400">"help_type"</span>: <span className="text-green-400">"labour"</span>,
                                </p>
                                <p>
                                    <span className="text-purple-400">"transcription"</span>: <span className="text-yellow-200">"The shipment arrived with a tear on the left cushion..."</span>,
                                </p>
                                <p>
                                    <span className="text-purple-400">"analysis"</span>: &#123;
                                </p>
                                <p className="pl-4">
                                    <span className="text-purple-400">"defect_detected"</span>: <span className="text-red-400">true</span>
                                </p>
                                <p>&#125;</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
