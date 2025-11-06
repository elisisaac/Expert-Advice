'use client';

import { Eye, EyeOff, Check } from 'lucide-react';
import { InputFieldProps } from '@/lib/types/auth.types';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export default function InputField({ type = 'text', placeholder, value, onChange, icon: Icon, validated, error, showPasswordToggle, onTogglePassword, showPassword, name }: InputFieldProps) {
    const inputType = showPasswordToggle && showPassword ? 'text' : type;

    return (
        <div className="relative w-full group mb-4">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
                <Icon className={cn('w-5 h-5 transition-colors', validated && 'text-green-500', error && 'text-red-500', !validated && !error && 'text-gray-400 group-focus-within:text-indigo-600')} />
            </div>

            <Input
                type={inputType}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className={cn(
                    'h-14 pl-12 pr-12 text-base border-2 rounded-xl',
                    'focus-visible:ring-0 focus-visible:ring-offset-0',
                    'transition-all duration-200',
                    validated && 'border-green-500 bg-green-50/30 focus-visible:border-green-600',
                    error && 'border-red-500 bg-red-50/30 focus-visible:border-red-600',
                    !validated && !error && 'border-gray-200 focus-visible:border-indigo-500'
                )}
            />

            {validated && !showPasswordToggle && (
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500">
                    <Check className="w-5 h-5" strokeWidth={2.5} />
                </div>
            )}

            {showPasswordToggle && (
                <button type="button" onClick={onTogglePassword} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition-colors p-1 rounded-md hover:bg-gray-100" tabIndex={-1}>
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
            )}
        </div>
    );
}
