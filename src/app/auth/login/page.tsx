'use client';

import React, { useState } from 'react';
import { Mail, Lock, ArrowRight, Loader2 } from 'lucide-react';
import AuthLayout from '@/components/auth/AuthLayout';
import AuthHeader from '@/components/auth/AuthHeader';
import InputField from '@/components/auth/InputField';
import { Button } from '@/components/ui/button';
import { validateEmail } from '@/lib/utils/validation';
import { supabaseClient } from '@/supabase/client';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function LoginPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isFormValid) return;

        setLoading(true);

        const loadingToast = toast.loading('Signing In', {
            description: 'Please wait while we authenticate your credentials...',
        });

        const { error } = await supabaseClient.auth.signInWithPassword({
            email: formData.email,
            password: formData.password,
        });

        toast.dismiss(loadingToast);
        setLoading(false);

        if (error) {
            toast.error('Sign In Failed', {
                description: error.message || 'Invalid email or password. Please try again.',
            });
            return;
        }

        toast.success('Welcome Back!', {
            description: 'Redirecting to your dashboard...',
        });

        setTimeout(() => {
            router.push('/dashboard');
        }, 500);
    };

    const isEmailValid = validateEmail(formData.email);
    const isPasswordValid = formData.password.length > 0;
    const isFormValid = isEmailValid && isPasswordValid;

    return (
        <AuthLayout stats={{ inbox: '176,18', engagement: '46' }}>
            <div className="flex flex-col h-full justify-between min-h-[500px]">
                <div>
                    <AuthHeader title="Sign In" subtitle="Welcome back! Please enter your details" linkText="Don't have an account?" linkHref="/auth/signup" />

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <InputField type="email" name="email" placeholder="Email Address" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} icon={Mail} validated={isEmailValid && formData.email.length > 0} />

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
                            validated={isPasswordValid}
                        />

                        <div className="flex items-center justify-between pt-2 pb-2">
                            <Button type="button" variant="link" className="text-sm text-indigo-400 hover:text-indigo-300 p-0 h-auto font-medium" onClick={() => router.push('/auth/forgot-password')}>
                                Forgot password?
                            </Button>
                        </div>

                        <Button
                            type="submit"
                            disabled={!isFormValid || loading}
                            className="w-full h-12 bg-indigo-600 hover:bg-indigo-500 text-white text-base font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-indigo-600/30 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-indigo-600"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                    Signing In...
                                </>
                            ) : (
                                <>
                                    <span>Sign In</span>
                                    <ArrowRight className="w-5 h-5 ml-2" />
                                </>
                            )}
                        </Button>
                    </form>
                </div>
            </div>
        </AuthLayout>
    );
}
