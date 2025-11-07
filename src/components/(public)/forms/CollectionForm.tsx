'use client';
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import StepIndicator from './StepIndicator';
import Step1Video from './Step1Video';
import Step2Details from './Step2Details';
import Step3Contact from './Step3Contact';
import { CollectionFormData, StepConfig } from '@/lib/types/collection-form.types';
import { ValidationErrors } from '@/lib/utils/validation';
import { toast } from 'sonner';

const steps: StepConfig[] = [
    { number: 1, title: 'Video', desc: 'Upload video' },
    { number: 2, title: 'Details', desc: 'Your info' },
    { number: 3, title: 'Contact', desc: 'Get in touch' },
];

interface CollectionFormProps {
    formId: string;
}

export default function CollectionForm({ formId }: CollectionFormProps) {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<ValidationErrors>({});
    const [formData, setFormData] = useState<CollectionFormData>({
        firstName: '',
        lastName: '',
        zipcode: '',
        helpType: '',
        contactMethod: '',
        email: '',
        phone: '',
        countryCode: '+1',
        videoFile: null,
    });

    const updateFormData = (key: keyof CollectionFormData, value: any) => {
        setFormData((prev) => ({ ...prev, [key]: value }));
        if (key in errors) {
            const newErrors = { ...errors };
            delete newErrors[key as keyof ValidationErrors];
            setErrors(newErrors);
        }
    };

    const handleSubmit = async () => {
        try {
            setLoading(true);

            const submissionData = new FormData();
            submissionData.append('formId', formId);
            submissionData.append('firstName', formData.firstName);
            submissionData.append('lastName', formData.lastName);
            submissionData.append('zipcode', formData.zipcode);
            submissionData.append('helpType', formData.helpType);
            submissionData.append('contactMethod', formData.contactMethod);

            if (formData.contactMethod === 'email') {
                submissionData.append('email', formData.email);
            } else {
                submissionData.append('phone', formData.phone);
                submissionData.append('countryCode', formData.countryCode);
            }

            if (formData.videoFile) {
                submissionData.append('video', formData.videoFile);
            }

            const response = await fetch('/api/submissions', {
                method: 'POST',
                body: submissionData,
            });

            if (!response.ok) {
                throw new Error('Failed to submit form');
            }

            const result = await response.json();
            toast.success('Form submitted successfully!');
            console.log('Submission result:', result);

            setLoading(false);
        } catch (error) {
            console.error('Submission error:', error);
            toast.error('Failed to submit form. Please try again.');
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto">
            <div className="mb-10 text-center">
                <h1 className="text-3xl md:text-4xl font-bold text-yellow-400 mb-3">
                    Box <span className="text-gray-400">Rental</span> Now
                </h1>
                <p className="text-gray-600 text-lg">Get Expert Advice</p>
            </div>

            <StepIndicator steps={steps} currentStep={step} />

            <Card className="border border-gray-200 shadow-lg overflow-hidden">
                <CardContent className="p-6 md:p-10">
                    {step === 1 && <Step1Video formData={formData} onUpdate={updateFormData} onNext={() => setStep(2)} errors={errors} setErrors={setErrors} />}

                    {step === 2 && <Step2Details formData={formData} onUpdate={updateFormData} onNext={() => setStep(3)} onBack={() => setStep(1)} errors={errors} setErrors={setErrors} />}

                    {step === 3 && <Step3Contact formData={formData} onUpdate={updateFormData} onSubmit={handleSubmit} onBack={() => setStep(2)} loading={loading} errors={errors} setErrors={setErrors} />}
                </CardContent>
            </Card>
        </div>
    );
}
