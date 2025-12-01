'use client';

import React, { useState } from 'react';
import { Mail, Lock, User, ArrowRight, Loader2 } from 'lucide-react';
import AuthLayout from '@/components/auth/AuthLayout';
import AuthHeader from '@/components/auth/AuthHeader';
import InputField from '@/components/auth/InputField';
import PasswordRequirements from '@/components/auth/PasswordRequirements';
import EmailVerificationSuccess from '@/components/auth/EmailVerificationSuccess';
import { Button } from '@/components/ui/button';
import { validateEmail, isPasswordValid } from '@/lib/utils/validation';
import { supabaseClient } from '@/supabase/client';
import { toast } from 'sonner';

export default function SignUpPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isFormValid) return;

        setLoading(true);

        const { error } = await supabaseClient.auth.signUp({
            email: formData.email,
            password: formData.password,
            options: {
                data: {
                    name: formData.name,
                },
                emailRedirectTo: `${window.location.origin}/auth/callback?redirectTo=/dashboard`,
            },
        });

        setLoading(false);

        if (error) {
            toast.error('Account Creation Failed', {
                description: error.message || 'Unable to create account. Please try again.',
            });
            return;
        }

        setSuccess(true);
        toast.success('Account Created Successfully!', {
            description: 'Please check your email to verify your account.',
        });
    };

    const isNameValid = formData.name.trim().length > 0;
    const isEmailValid = validateEmail(formData.email);
    const isPasswordStrong = isPasswordValid(formData.password);
    const doPasswordsMatch = formData.confirmPassword === formData.password && formData.confirmPassword.length > 0;

    const isFormValid = isNameValid && isEmailValid && isPasswordStrong && doPasswordsMatch;

    return (
        <AuthLayout stats={{ inbox: '176,18', engagement: '46' }}>
            {success ? (
                <EmailVerificationSuccess email={formData.email} />
            ) : (
                <div className="flex flex-col h-full justify-between min-h-[500px]">
                    <div>
                        <AuthHeader title="Sign Up" subtitle="Create your account to get started" linkText="Already have an account?" linkHref="/auth/login" />

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <InputField type="text" name="name" placeholder="Full Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} icon={User} validated={isNameValid} />

                            <InputField type="email" name="email" placeholder="Email Address" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} icon={Mail} validated={isEmailValid} />

                            <InputField
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                icon={Lock}
                                showPasswordToggle
                                showPassword={showPassword}
                                onTogglePassword={() => setShowPassword(!showPassword)}
                                validated={isPasswordStrong}
                            />

                            <PasswordRequirements password={formData.password} />

                            <InputField
                                type="password"
                                name="confirmPassword"
                                placeholder="Re-Type Password"
                                value={formData.confirmPassword}
                                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                icon={Lock}
                                showPasswordToggle
                                showPassword={showConfirmPassword}
                                onTogglePassword={() => setShowConfirmPassword(!showConfirmPassword)}
                                validated={doPasswordsMatch}
                            />

                            <Button
                                type="submit"
                                disabled={!isFormValid || loading}
                                className="w-full h-12 bg-indigo-600 hover:bg-indigo-500 text-white text-base font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-indigo-600/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-indigo-600 mt-6"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                        Creating account...
                                    </>
                                ) : (
                                    <>
                                        <span>Sign Up</span>
                                        <ArrowRight className="w-5 h-5 ml-2" />
                                    </>
                                )}
                            </Button>
                        </form>
                    </div>
                </div>
            )}
        </AuthLayout>
    );
}
