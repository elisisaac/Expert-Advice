'use client';
import { ArrowRight, ArrowLeft, Package, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CollectionFormData, HelpOption } from '@/lib/types/collection-form.types';
import { Check } from 'lucide-react';
import { ValidationErrors, validateStep2 } from '@/lib/utils/validation';

interface Step2DetailsProps {
    formData: CollectionFormData;
    onUpdate: (key: keyof CollectionFormData, value: any) => void;
    onNext: () => void;
    onBack: () => void;
    errors: ValidationErrors;
    setErrors: (errors: ValidationErrors) => void;
}

const helpOptions: HelpOption[] = [
    { id: 'labour', label: 'Moving Labour', icon: Users, desc: 'Professional movers to help' },
    { id: 'storage', label: 'Storage Container', icon: Package, desc: 'Portable moving container' },
    { id: 'both', label: 'Both Services', icon: Package, desc: 'Complete moving solution' },
];

export default function Step2Details({ formData, onUpdate, onNext, onBack, errors, setErrors }: Step2DetailsProps) {
    const handleNext = () => {
        const validationErrors = validateStep2(formData);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        setErrors({});
        onNext();
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Information</h2>
                <p className="text-gray-600">Tell us about your needs</p>
            </div>

            <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                        <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">
                            First Name <span className="text-red-500">*</span>
                        </Label>
                        <Input id="firstName" value={formData.firstName} onChange={(e) => onUpdate('firstName', e.target.value)} placeholder="John" className={`h-11 text-base ${errors.firstName ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-indigo-500'}`} />
                        {errors.firstName && <p className="text-xs text-red-600 mt-1">{errors.firstName}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">
                            Last Name <span className="text-red-500">*</span>
                        </Label>
                        <Input id="lastName" value={formData.lastName} onChange={(e) => onUpdate('lastName', e.target.value)} placeholder="Doe" className={`h-11 text-base ${errors.lastName ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-indigo-500'}`} />
                        {errors.lastName && <p className="text-xs text-red-600 mt-1">{errors.lastName}</p>}
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="zipcode" className="text-sm font-medium text-gray-700">
                        Delivery Zipcode <span className="text-red-500">*</span>
                    </Label>
                    <Input
                        id="zipcode"
                        type="text"
                        inputMode="numeric"
                        value={formData.zipcode}
                        onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, '');
                            onUpdate('zipcode', value);
                        }}
                        placeholder="Enter your zipcode"
                        className={`h-11 text-base ${errors.zipcode ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-indigo-500'}`}
                    />
                    {errors.zipcode && <p className="text-xs text-red-600 mt-1">{errors.zipcode}</p>}
                </div>

                <div className="space-y-3">
                    <Label className="text-sm font-medium text-gray-700">
                        I need expert help with <span className="text-red-500">*</span>
                    </Label>
                    <div className="grid grid-cols-1 gap-3">
                        {helpOptions.map((option) => {
                            const Icon = option.icon;
                            const isSelected = formData.helpType === option.id;
                            return (
                                <button
                                    key={option.id}
                                    type="button"
                                    onClick={() => onUpdate('helpType', option.id)}
                                    className={`relative p-4 rounded-xl border-2 transition-all duration-200 text-left group ${
                                        isSelected ? 'border-indigo-600 bg-indigo-50 shadow-sm' : errors.helpType ? 'border-red-300 bg-white hover:border-red-400' : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
                                    }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={`p-2.5 rounded-lg transition-colors ${isSelected ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600 group-hover:bg-gray-200'}`}>
                                            <Icon className="w-5 h-5" />
                                        </div>
                                        <div className="flex-1">
                                            <div className={`font-semibold text-sm mb-0.5 ${isSelected ? 'text-indigo-900' : 'text-gray-900'}`}>{option.label}</div>
                                            <div className={`text-xs ${isSelected ? 'text-indigo-700' : 'text-gray-500'}`}>{option.desc}</div>
                                        </div>
                                        {isSelected && (
                                            <div className="shrink-0">
                                                <div className="w-5 h-5 bg-indigo-600 rounded-full flex items-center justify-center">
                                                    <Check className="w-3 h-3 text-white" />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                    {errors.helpType && <p className="text-xs text-red-600 mt-1">{errors.helpType}</p>}
                </div>
            </div>

            <div className="flex gap-3 pt-4">
                <Button variant="outline" onClick={onBack} size="lg" className="px-6 border-2 hover:bg-gray-50">
                    <ArrowLeft className="mr-2 w-5 h-5" />
                    Back
                </Button>
                <Button onClick={handleNext} size="lg" className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-base font-semibold shadow-lg hover:shadow-xl transition-all">
                    Continue
                    <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
            </div>
        </div>
    );
}
