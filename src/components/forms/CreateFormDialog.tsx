'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useFormsStore } from '@/store/forms.store';
import { FormType } from '@/lib/types/forms.types';

export default function CreateFormDialog({ children }: { children: React.ReactNode }) {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const addForm = useFormsStore((s) => s.addForm);

    const handleCreate = async () => {
        if (!name.trim()) return toast('Form name required.');
        setLoading(true);
        try {
            const res = await fetch('/api/forms', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name }),
            });
            const json = await res.json();
            if (!res.ok) throw new Error(json.error || 'Failed');
            const created: FormType = json.form;
            addForm(created);
            toast('Form created successfully!');
            setOpen(false);
            setName('');
        } catch {
            toast('Error creating form.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="max-w-sm">
                <DialogHeader>
                    <DialogTitle>Create New Form</DialogTitle>
                </DialogHeader>
                <div className="space-y-3 mt-2">
                    <Input placeholder="Enter form name" value={name} onChange={(e) => setName(e.target.value)} disabled={loading} className="focus-visible:ring-indigo-500" />
                    <Button onClick={handleCreate} className="w-full bg-indigo-600 hover:bg-indigo-700" disabled={loading}>
                        {loading ? 'Creating...' : 'Create'}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
