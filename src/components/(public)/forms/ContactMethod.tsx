'use client';
import PhoneInputField from './PhoneInputField';
import { Mail, Phone as PhoneIcon, Check } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { ContactOption } from '@/lib/types/collection-form.types';
import { ValidationErrors } from '@/lib/utils/validation';
import type { Value } from 'react-phone-number-input';

interface ContactMethodProps {
    value: 'email' | 'phone' | '';
    onChange: (value: 'email' | 'phone') => void;
    email: string;
    phone: string;
    onEmailChange: (value: string) => void;
    onPhoneChange: (value: string) => void;
    errors: ValidationErrors;
}

const contactOptions: ContactOption[] = [
    { id: 'email', label: 'Email', icon: Mail, desc: 'Get quote via email' },
    { id: 'phone', label: 'Phone', icon: PhoneIcon, desc: "We'll call you back" },
];

export default function ContactMethod({ value, onChange, email, phone, onEmailChange, onPhoneChange, errors }: ContactMethodProps) {
    const handlePhoneChange = (val: Value) => {
        onPhoneChange(val || '');
    };

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-1 gap-3">
                {contactOptions.map((option) => {
                    const Icon = option.icon;
                    const isSelected = value === option.id;
                    return (
                        <button
                            key={option.id}
                            type="button"
                            onClick={() => onChange(option.id)}
                            className={`relative p-4 rounded-xl border-2 transition-all duration-200 text-left group ${
                                isSelected ? 'border-indigo-600 bg-indigo-50 shadow-sm' : errors.contactMethod ? 'border-red-300 bg-white hover:border-red-400' : 'border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50'
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
            {errors.contactMethod && <p className="text-xs text-red-600 mt-1">{errors.contactMethod}</p>}

            {value === 'email' && (
                <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                    <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                        Email Address <span className="text-red-500">*</span>
                    </Label>
                    <Input id="email" type="email" value={email} onChange={(e) => onEmailChange(e.target.value)} placeholder="you@example.com" className={`h-11 text-base ${errors.email ? 'border-red-500 focus:border-red-500' : 'border-gray-300 focus:border-indigo-500'}`} />
                    {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
                </div>
            )}

            {value === 'phone' && (
                <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                    <PhoneInputField value={phone as Value} onChange={handlePhoneChange} error={errors.phone} />
                </div>
            )}
        </div>
    );
}
