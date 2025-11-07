'use client';
import { Check } from 'lucide-react';
import { StepConfig } from '@/lib/types/collection-form.types';

interface StepIndicatorProps {
    steps: StepConfig[];
    currentStep: number;
}

export default function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
    return (
        <div className="relative mb-12">
            <div className="flex items-center justify-center">
                <div className="relative flex items-center justify-between w-full max-w-md">
                    <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200 -z-10">
                        <div className="h-full bg-indigo-600 transition-all duration-500 ease-out" style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }} />
                    </div>
                    {steps.map((s) => (
                        <div key={s.number} className="flex flex-col items-center relative bg-white px-2">
                            <div
                                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${
                                    currentStep > s.number ? 'bg-indigo-600 text-white' : currentStep === s.number ? 'bg-indigo-600 text-white ring-4 ring-indigo-100' : 'bg-white border-2 border-gray-300 text-gray-400'
                                }`}
                            >
                                {currentStep > s.number ? <Check className="w-5 h-5" /> : s.number}
                            </div>
                            <div className="absolute top-14 text-center whitespace-nowrap">
                                <div className={`font-medium text-xs ${currentStep >= s.number ? 'text-gray-900' : 'text-gray-400'}`}>{s.title}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
