import FormsTable from '@/components/forms/FormsTable';
import { Button } from '@/components/ui/button';
import { FormType } from '@/lib/types/forms.types';
import { Plus } from 'lucide-react';

async function getForms(): Promise<FormType[]> {
    return [
        {
            id: 1,
            name: 'Customer Feedback',
            submissions: 23,
            status: 'Active',
            createdAt: '2025-11-04T12:00:00Z',
            link: 'https://example.com/form/1',
        },
        {
            id: 2,
            name: 'Support Request',
            submissions: 56,
            status: 'Completed',
            createdAt: '2025-10-31T09:00:00Z',
            link: 'https://example.com/form/2',
        },
        {
            id: 3,
            name: 'Event Registration',
            submissions: 12,
            status: 'Active',
            createdAt: '2025-11-01T10:00:00Z',
            link: 'https://example.com/form/3',
        },
    ];
}

export default async function FormsPage() {
    const forms = await getForms();

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Forms</h1>
                    <p className="text-gray-500 mt-1">Manage and monitor all forms</p>
                </div>
                <Button className="bg-indigo-600 hover:bg-indigo-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Form
                </Button>
            </div>
            <FormsTable initialForms={forms} />
        </div>
    );
}
