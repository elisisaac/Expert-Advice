'use client';

import CollectionForm from '@/components/(public)/forms/CollectionForm';
import { useParams } from 'next/navigation';

export default function SubmissionFormPage() {
    const params = useParams();
    const formId = params.id as string;

    return (
        <div className="min-h-screen bg-linear-to-br from-gray-50 to-indigo-50/20 flex items-center justify-center p-6">
            <CollectionForm formId={formId} />
        </div>
    );
}
