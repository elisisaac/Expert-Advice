'use client';

import { useEffect } from 'react';
import { useFormsStore } from '@/store/forms.store';
import FormsTable from '@/components/forms/FormsTable';
import CreateFormDialog from '@/components/forms/CreateFormDialog';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { FormType } from '@/lib/types/forms.types';

export default function FormWrapper({ initialForms }: { initialForms: FormType[] }) {
    const setForms = useFormsStore((s) => s.setForms);

    useEffect(() => {
        setForms(initialForms);
    }, [initialForms, setForms]);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Forms</h1>
                    <p className="text-gray-500 mt-1">Manage and monitor all forms</p>
                </div>
                <CreateFormDialog>
                    <Button className="bg-indigo-600 hover:bg-indigo-700">
                        <Plus className="w-4 h-4 mr-2" /> Create Form
                    </Button>
                </CreateFormDialog>
            </div>
            <FormsTable />
        </div>
    );
}
