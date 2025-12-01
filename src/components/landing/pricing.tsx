'use client';

import { useState } from 'react';
import { Check, X, Zap } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

type Plan = {
    name: string;
    price: { monthly: number; yearly: number };
    description: string;
    features: string[];
    // Updated notIncluded content based on the final business logic (no API/Webhooks)
    notIncluded?: string[];
    popular?: boolean;
};

const plans: Plan[] = [
    {
        name: 'Starter',
        price: { monthly: 0, yearly: 0 },
        description: 'Perfect for small projects and evaluating AI processing.',
        features: ['15 Video Uploads/mo', 'Standard Transcription', 'Basic JSON Output', '7-day Data Retention', '1 Active Form'],
        notIncluded: ['Object Detection & Sizing', 'Markdown Summary', 'Priority Processing', 'Custom AI Models'],
    },
    {
        name: 'Pro',
        price: { monthly: 49, yearly: 39 },
        description: 'Full automation and visual intelligence for growing businesses.',
        popular: true,
        features: ['500 Video Uploads/mo', 'Priority Transcription', 'Object Detection & Sizing', 'JSON & Markdown Output', 'Unlimited Data Retention', 'Unlimited Active Forms'],
    },
    {
        name: 'Enterprise',
        price: { monthly: 199, yearly: 159 },
        description: 'Custom AI model training and dedicated infrastructure.',
        features: ['Unlimited Uploads', 'Custom AI Model Training', 'Plant/Damage Analysis Suites', 'Dedicated Support', 'SSO & Audit Logs', 'On-Premise Deployment Option'],
    },
];

export function PricingTable() {
    const [isYearly, setIsYearly] = useState(false);

    return (
        <section className="py-24 px-4" id="pricing">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-linear-to-b from-white to-white/60 mb-4">Simple, transparent pricing</h2>
                    <p className="text-gray-400 mt-4 max-w-2xl mx-auto">Pay for the intelligence you use. Unlock full processing capabilities.</p>

                    {/* Toggle Switch */}
                    <div className="flex items-center justify-center gap-4 mt-8">
                        <span className={`text-sm font-medium transition-colors ${!isYearly ? 'text-white' : 'text-gray-500'}`}>Monthly Billing</span>
                        <button onClick={() => setIsYearly(!isYearly)} className="relative w-16 h-8 bg-white/10 rounded-full p-1 transition-colors hover:bg-white/20 shadow-inner shadow-black/30" aria-label="Toggle annual billing">
                            <div className={`w-6 h-6 bg-indigo-500 rounded-full shadow-lg transition-transform duration-300 ${isYearly ? 'translate-x-8' : 'translate-x-0'}`} />
                        </button>
                        <span className={`text-sm font-medium transition-colors ${isYearly ? 'text-white' : 'text-gray-500'}`}>
                            Yearly Billing <span className="text-green-400 text-xs ml-1 font-semibold block sm:inline-block">(Save 20%)</span>
                        </span>
                    </div>
                </div>

                {/* Cards Grid (Responsive Grid) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                    {plans.map((plan) => (
                        <div
                            key={plan.name}
                            className={`relative rounded-xl border p-6 md:p-8 flex flex-col transition-all duration-300 transform hover:scale-[1.02] shadow-2xl 
                                ${plan.popular ? 'bg-white/5 border-indigo-500/50 shadow-indigo-500/10' : 'bg-[#0A0A0A] border-white/10'}`}
                        >
                            {plan.popular && (
                                <motion.div
                                    initial={{ scale: 0.8 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: 'spring', stiffness: 500, damping: 20 }}
                                    className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-md shadow-indigo-900/50"
                                >
                                    Best Value
                                </motion.div>
                            )}

                            <div className="mb-6">
                                <h3 className="text-2xl font-bold text-white mb-1">{plan.name}</h3>
                                <p className="text-gray-400 text-sm h-10">{plan.description}</p>

                                {/* Price Display */}
                                <div className="mt-6 flex items-baseline gap-1">
                                    <span className="text-5xl font-extrabold text-white">${isYearly ? plan.price.yearly : plan.price.monthly}</span>
                                    <span className="text-lg font-medium text-gray-500">/mo</span>
                                </div>
                            </div>

                            {/* Features List */}
                            <ul className="space-y-3 mb-8 flex-1 border-t border-white/5 pt-6">
                                {plan.features.map((feature) => (
                                    <li key={feature} className="flex items-start gap-3 text-sm text-gray-300">
                                        <Check className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                                {/* Not Included Features (Muted/Disabled) */}
                                {plan.notIncluded?.map((feature) => (
                                    <li key={feature} className="flex items-start gap-3 text-sm text-gray-600 opacity-60">
                                        <X className="w-5 h-5 text-red-500/50 shrink-0 mt-0.5" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            {/* CTA Button */}
                            <Link href="/auth/signup" className="block w-full">
                                <button
                                    className={`w-full py-3 rounded-lg font-medium transition-all text-base h-12 active:scale-[0.98]
                                        ${
                                            plan.popular
                                                ? 'bg-indigo-600 text-white hover:bg-indigo-500 shadow-md shadow-indigo-600/50'
                                                : plan.price.monthly === 0
                                                  ? 'bg-white/10 text-white hover:bg-white/20 border border-white/10'
                                                  : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10'
                                        }`}
                                >
                                    {plan.price.monthly === 0 ? 'Start Free Tier' : 'Get Started'}
                                </button>
                            </Link>
                        </div>
                    ))}
                </div>

                {/* Footer Note */}
                <p className="text-center text-xs text-gray-600 mt-12 max-w-xl mx-auto">Pricing is based on per-submission AI processing and storage. Contact us for custom Enterprise volume discounts.</p>
            </div>
        </section>
    );
}
