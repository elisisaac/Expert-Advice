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
            <Label htmlFor="phone" className="text-sm font-medium text-gray-300">
                Phone Number <span className="text-red-500">*</span>
            </Label>
            <div className="phone-input-dark">
                <PhoneInput international defaultCountry="US" value={value} onChange={onChange} className={error ? 'phone-input-error' : ''} />
            </div>
            {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
            <style jsx global>{`
                /* Global styles to override react-phone-number-input for dark mode */

                .phone-input-dark .PhoneInput {
                    display: flex;
                    align-items: center;
                    /* Base Dark Input Styles */
                    background: #1a1a1a; /* Slightly lighter than card body #0A0A0A */
                    border: 1px solid ${error ? '#ef4444' : '#27272a'}; /* Gray 800 */
                    border-radius: 0.75rem;
                    padding: 0;
                    height: 2.75rem;
                    transition: all 0.2s;
                }

                .phone-input-dark .PhoneInput:focus-within {
                    /* Focus/Active State */
                    border-color: ${error ? '#ef4444' : '#6366f1'}; /* Indigo 500 */
                    outline: none;
                    box-shadow:
                        0 0 0 1px ${error ? '#ef4444' : '#6366f1'},
                        0 0 0 3px ${error ? 'rgba(239, 68, 68, 0.2)' : 'rgba(99, 102, 241, 0.2)'};
                }

                .phone-input-dark .PhoneInputCountry {
                    /* Country Flag and Code Area */
                    padding: 0 0.75rem;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    border-right: 1px solid #27272a; /* Dark separator */
                    margin-right: 0.5rem;
                    color: #d4d4d8; /* Text color for country code */
                }

                .phone-input-dark .PhoneInputCountrySelect {
                    /* Style for country dropdown button */
                    background: transparent;
                }

                .phone-input-dark .PhoneInputCountryIcon {
                    width: 1.5rem;
                    height: 1.5rem;
                    border-radius: 0.25rem;
                    overflow: hidden;
                    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
                }

                .phone-input-dark .PhoneInputCountrySelectArrow {
                    /* Chevron Icon */
                    width: 0.75rem;
                    height: 0.75rem;
                    color: #a1a1aa; /* Gray 400 */
                    opacity: 0.8;
                    margin-left: 0.25rem;
                }

                .phone-input-dark .PhoneInputInput {
                    /* Main Phone Number Input */
                    flex: 1;
                    border: none;
                    outline: none;
                    font-size: 1rem;
                    padding: 0 0.75rem 0 0;
                    height: 100%;
                    background: transparent;
                    color: #ffffff; /* White text color */
                }

                .phone-input-dark .PhoneInputInput::placeholder {
                    color: #52525b; /* Gray 600 placeholder */
                }
            `}</style>
        </div>
    );
}
