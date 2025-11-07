'use client';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import VideoUploader from './VideoUploader';
import { CollectionFormData } from '@/lib/types/collection-form.types';
import { ValidationErrors, validateStep1 } from '@/lib/utils/validation';

interface Step1VideoProps {
    formData: CollectionFormData;
    onUpdate: (key: keyof CollectionFormData, value: any) => void;
    onNext: () => void;
    errors: ValidationErrors;
    setErrors: (errors: ValidationErrors) => void;
}

export default function Step1Video({ formData, onUpdate, onNext, errors, setErrors }: Step1VideoProps) {
    const handleNext = () => {
        const validationErrors = validateStep1(formData);
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
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Upload Your Video</h2>
                <p className="text-gray-600">Share a quick video to help us understand your needs</p>
            </div>

            <div>
                <VideoUploader file={formData.videoFile} onChange={(f) => onUpdate('videoFile', f)} />
                {errors.videoFile && <p className="text-xs text-red-600 mt-2">{errors.videoFile}</p>}
            </div>

            <div className="flex justify-end pt-4">
                <Button onClick={handleNext} size="lg" className="bg-indigo-600 hover:bg-indigo-700 px-8 text-base font-semibold shadow-lg hover:shadow-xl transition-all">
                    Continue
                    <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
            </div>
        </div>
    );
}
