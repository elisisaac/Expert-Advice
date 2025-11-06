'use client';

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Copy, Trash2 } from 'lucide-react';
import { FormType } from '@/lib/types/forms.types';
import { toast } from 'sonner';
import FormRowSkeleton from './FormRowSkeleton';
import { format } from 'date-fns';

export default function FormsTable({ initialForms }: { initialForms: FormType[] }) {
    const [forms, setForms] = useState<FormType[]>([]);
    const [loading, setLoading] = useState(true);
    const [selected, setSelected] = useState<number[]>([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const timer = setTimeout(() => {
            setForms(initialForms);
            setLoading(false);
        }, 600);
        return () => clearTimeout(timer);
    }, [initialForms]);

    const filtered = forms.filter((f) => f.name.toLowerCase().includes(search.toLowerCase()));

    const toggleSelect = (id: number) => setSelected((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));

    const handleDelete = () => {
        setForms((prev) => prev.filter((f) => !selected.includes(f.id)));
        setSelected([]);
        toast('Deleted', { description: 'Selected forms removed.' });
    };

    const handleDeleteSingle = (id: number) => {
        setForms((prev) => prev.filter((f) => f.id !== id));
        toast('Deleted', { description: 'Form removed.' });
    };

    const handleCopy = async (link: string) => {
        await navigator.clipboard.writeText(link);
        toast('Copied', { description: 'Form link copied to clipboard.' });
    };

    return (
        <div className="border rounded-2xl overflow-hidden shadow-sm bg-white">
            <div className="p-4 flex items-center justify-between bg-gray-50 border-b gap-4">
                <Input placeholder="Search forms..." value={search} onChange={(e) => setSearch(e.target.value)} className="max-w-sm focus-visible:ring-indigo-500" />
                {selected.length >= 2 && (
                    <Button variant="destructive" onClick={handleDelete} className="rounded-lg font-medium">
                        Delete {selected.length ? `(${selected.length})` : ''}
                    </Button>
                )}
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead className="bg-gray-100 text-gray-700 border-b">
                        <tr>
                            <th className="p-4 w-10">
                                <Checkbox checked={selected.length === filtered.length && filtered.length > 0} onCheckedChange={() => setSelected(selected.length === filtered.length ? [] : filtered.map((f) => f.id))} />
                            </th>
                            <th className="p-4 text-left font-semibold">Form Name</th>
                            <th className="p-4 text-left font-semibold">Submissions</th>
                            <th className="p-4 text-left font-semibold">Status</th>
                            <th className="p-4 text-left font-semibold">Created</th>
                            <th className="p-4 text-left font-semibold">Copy Link</th>
                            <th className="p-4 text-left font-semibold">Action</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y">
                        {loading
                            ? Array.from({ length: 4 }).map((_, i) => <FormRowSkeleton key={i} />)
                            : filtered.map((form) => (
                                  <tr key={form.id} className="hover:bg-gray-50 transition-colors duration-150">
                                      <td className="p-4">
                                          <Checkbox checked={selected.includes(form.id)} onCheckedChange={() => toggleSelect(form.id)} />
                                      </td>
                                      <td className="p-4 font-medium text-gray-900">{form.name}</td>
                                      <td className="p-4 text-gray-700">{form.submissions}</td>
                                      <td className="p-4">
                                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${form.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{form.status}</span>
                                      </td>
                                      <td className="p-4 text-gray-500">{format(form.createdAt, 'MMM dd, yyyy')}</td>
                                      <td className="p-4 text-left">
                                          <Button size="sm" variant="outline" onClick={() => handleCopy(form.link)} className="flex items-center gap-1 text-gray-700 hover:text-indigo-600 border-gray-200 hover:border-indigo-400">
                                              <Copy className="w-3 h-3" /> Copy
                                          </Button>
                                      </td>
                                      <td className="p-4 text-left">
                                          <Button size="sm" variant="ghost" onClick={() => handleDeleteSingle(form.id)} className="text-red-600 hover:text-white hover:bg-red-600 transition-colors">
                                              <Trash2 className="w-4 h-4" />
                                          </Button>
                                      </td>
                                  </tr>
                              ))}
                    </tbody>
                </table>
            </div>

            {!loading && !filtered.length && <div className="text-center text-gray-500 py-8 text-sm">No forms found</div>}
        </div>
    );
}
