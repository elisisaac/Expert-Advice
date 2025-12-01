import { Code2, ScanLine, Mic, LayoutGrid, Check, FileText } from 'lucide-react';
import Link from 'next/link';

export function FeatureBento() {
    return (
        <section className="container mx-auto px-4 py-20" id="features">
            <div className="mb-12 text-center">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-linear-to-b from-white to-white/60 mb-4">The Integrated AI Intelligence Layer</h2>
                <p className="text-gray-400 mt-4 max-w-2xl mx-auto">We turn raw customer video submissions into actionable, structured data instantly.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[minmax(250px, auto)]">
                {/* Large Card (1): Structured Data & Reporting */}
                <div className="md:col-span-2 group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-8 transition-colors hover:bg-white/10 flex flex-col justify-between">
                    <div className="absolute right-0 top-0 h-full w-1/3 bg-linear-to-l from-indigo-500/10 to-transparent" />
                    <div>
                        <Code2 className="mb-4 h-8 w-8 text-indigo-400" />
                        <h3 className="text-xl font-semibold text-white">Machine-Ready Data Output</h3>
                        <p className="mt-2 text-gray-400 max-w-lg text-sm">Every video is processed to generate structured data files, available directly in your dashboard: clean **JSON files** for database import and **Markdown summaries** for easy reporting.</p>
                    </div>
                    {/* Decorative Output Tags */}
                    <div className="mt-4 flex flex-wrap gap-2">
                        <span className="text-xs bg-indigo-500/20 text-indigo-300 px-2 py-1 rounded border border-indigo-500/30">JSON Data</span>
                        <span className="text-xs bg-indigo-500/20 text-indigo-300 px-2 py-1 rounded border border-indigo-500/30">Markdown Summary</span>
                    </div>
                </div>

                {/* Tall Card (2): Visual Intelligence & Measurement */}
                <div className="row-span-2 group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-8 transition-colors hover:bg-white/10 flex flex-col justify-start">
                    <div className="absolute right-0 top-0 h-full w-1/3 bg-linear-to-l from-indigo-500/10 to-transparent" />
                    <ScanLine className="mb-4 h-8 w-8 text-pink-400" />
                    <h3 className="text-xl font-semibold text-white">Precision Visual Analysis</h3>
                    <p className="mt-2 text-gray-400 text-sm">Our specialized AI models analyze video frames to identify objects, measure dimensions, and detect specific types of damage automatically.</p>
                    <div className="mt-6 space-y-3">
                        <div className="flex items-center gap-3 text-sm text-gray-300">
                            <Check className="w-4 h-4 text-green-400 shrink-0" />
                            Object Detection & Sizing (e.g., furniture, vehicles)
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-300">
                            <Check className="w-4 h-4 text-green-400 shrink-0" />
                            Plant/Crop Health & Disease Analysis
                        </div>
                    </div>
                </div>

                {/* Small Card (3): Audio Transcription & Summarization */}
                <div className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-8 transition-colors hover:bg-white/10">
                    <div className="absolute right-0 top-0 h-full w-1/3 bg-linear-to-l from-indigo-500/10 to-transparent" />
                    <Mic className="mb-4 h-8 w-8 text-blue-400" />
                    <h3 className="text-xl font-semibold text-white">Instant Transcription & Summary</h3>
                    <p className="mt-2 text-gray-400 text-sm">Get accurate text transcripts from customer video audio, plus an AI-generated summary of the core request.</p>
                </div>

                {/* Small Card (4): Dashboard Management & Forms (Replaces API/Webhook) */}
                <div className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-8 transition-colors hover:bg-white/10">
                    <div className="absolute right-0 top-0 h-full w-1/3 bg-linear-to-l from-indigo-500/10 to-transparent" />
                    <LayoutGrid className="mb-4 h-8 w-8 text-green-400" />
                    <h3 className="text-xl font-semibold text-white">Form & Data Management</h3>
                    <p className="mt-2 text-gray-400 text-sm">Create unlimited intake forms and manage all video submissions, processed data, and billing history directly in your secured dashboard.</p>
                </div>
            </div>
        </section>
    );
}
