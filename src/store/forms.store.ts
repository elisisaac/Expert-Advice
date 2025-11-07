import { create } from 'zustand';
import { FormType } from '@/lib/types/forms.types';
import { toast } from 'sonner';

interface FormsState {
    forms: FormType[];
    setForms: (data: FormType[]) => void;
    addForm: (form: FormType) => void;
    deleteForm: (id: string) => Promise<void>;
    deleteMany: (ids: string[]) => Promise<void>;
}

export const useFormsStore = create<FormsState>((set, get) => ({
    forms: [],
    setForms: (data) => set({ forms: data }),
    addForm: (form) => set((state) => ({ forms: [form, ...state.forms] })),

    deleteForm: async (id) => {
        try {
            const res = await fetch(`/api/forms?id=${id}`, { method: 'DELETE' });
            if (!res.ok) throw new Error('Failed to delete form');
            set((state) => ({ forms: state.forms.filter((f) => f.id !== id) }));
            toast('Form deleted');
        } catch {
            toast('Failed to delete form');
        }
    },

    deleteMany: async (ids) => {
        try {
            const res = await fetch('/api/forms', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ids }),
            });
            if (!res.ok) throw new Error('Failed to delete forms');
            set((state) => ({ forms: state.forms.filter((f) => !ids.includes(f.id)) }));
            toast(`Deleted ${ids.length} forms`);
        } catch {
            toast('Failed to delete forms');
        }
    },
}));
