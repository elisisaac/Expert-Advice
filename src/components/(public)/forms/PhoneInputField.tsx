'use client';
import PhoneInput, { type Value } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { Label } from '@/components/ui/label';

interface PhoneInputFieldProps {
    value: Value;
    onChange: (value: Value) => void;
    error?: string;
}

export default function PhoneInputField({ value, onChange, error }: PhoneInputFieldProps) {
    return (
        <div className="space-y-2">
            <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                Phone Number <span className="text-red-500">*</span>
            </Label>
            <div className="phone-input-modern">
                <PhoneInput international defaultCountry="US" value={value} onChange={onChange} className={error ? 'phone-input-error' : ''} />
            </div>
            {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
            <style jsx global>{`
                .phone-input-modern .PhoneInput {
                    display: flex;
                    align-items: center;
                    border: 1px solid ${error ? '#ef4444' : '#d1d5db'};
                    border-radius: 0.75rem;
                    padding: 0;
                    height: 2.75rem;
                    transition: all 0.2s;
                    background: white;
                }
                .phone-input-modern .PhoneInput:focus-within {
                    border-color: ${error ? '#ef4444' : '#6366f1'};
                    outline: none;
                    box-shadow: 0 0 0 3px ${error ? 'rgba(239, 68, 68, 0.1)' : 'rgba(99, 102, 241, 0.1)'};
                }
                .phone-input-modern .PhoneInputCountry {
                    padding: 0 0.75rem;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    border-right: 1px solid #e5e7eb;
                    margin-right: 0.5rem;
                }
                .phone-input-modern .PhoneInputCountryIcon {
                    width: 1.5rem;
                    height: 1.5rem;
                    border-radius: 0.25rem;
                    overflow: hidden;
                }
                .phone-input-modern .PhoneInputCountryIcon img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
                .phone-input-modern .PhoneInputCountrySelectArrow {
                    width: 0.75rem;
                    height: 0.75rem;
                    color: #6b7280;
                    opacity: 0.8;
                    margin-left: 0.25rem;
                }
                .phone-input-modern .PhoneInputInput {
                    flex: 1;
                    border: none;
                    outline: none;
                    font-size: 1rem;
                    padding: 0 0.75rem 0 0;
                    height: 100%;
                    background: transparent;
                }
                .phone-input-modern .PhoneInputInput::placeholder {
                    color: #9ca3af;
                }
            `}</style>
        </div>
    );
}
