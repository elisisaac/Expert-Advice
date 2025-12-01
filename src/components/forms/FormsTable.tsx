'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Copy, Trash2, MoreVertical, Pencil, CheckCircle, Search, Hash, Send, Calendar } from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { useFormsStore } from '@/store/forms.store';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import EditFormDialog from './EditFormDialog';

interface EditingForm {
    id: string;
    name: string;
}

export default function FormsTable() {
    const { forms, deleteForm, deleteMany, updateForm } = useFormsStore();
    const [selected, setSelected] = useState<string[]>([]);
    const [search, setSearch] = useState('');
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [editingForm, setEditingForm] = useState<EditingForm | null>(null);

    const filtered = forms.filter((f) => f.name.toLowerCase().includes(search.toLowerCase()));

    const toggleSelect = (id: string) => setSelected((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));

    const handleCopy = async (id: string) => {
        const link = `${process.env.NEXT_PUBLIC_SITE_URL}/forms/${id}`;
        await navigator.clipboard.writeText(link);
        toast.success('Form link copied to clipboard.');
    };

    const handleDeleteSelected = async () => {
        await deleteMany(selected);
        setSelected([]);
        toast.success(`Deleted ${selected.length} forms.`);
    };

    const handleDeleteSingle = async (id: string) => {
        await deleteForm(id);
        toast.success(`Form deleted.`);
    };

    const handleEditClick = (id: string, name: string) => {
        setEditingForm({ id, name });
        setEditDialogOpen(true);
    };

    const handleToggleStatus = async (id: string, currentStatus: string) => {
        const newStatus = currentStatus === 'active' ? 'completed' : 'active';
        await updateForm(id, { status: newStatus });
        toast.success(`Form marked as ${newStatus}.`);
    };

    const getStatusStyles = (status: string) => {
        if (status === 'active') {
            return 'bg-green-500/10 text-green-400 border border-green-500/20';
        }
        return 'bg-gray-500/10 text-gray-400 border border-gray-500/20';
    };

    return (
        <>
            {editingForm && <EditFormDialog formId={editingForm.id} currentName={editingForm.name} open={editDialogOpen} onOpenChange={setEditDialogOpen} />}

            <div className="bg-[#0A0A0A] border border-white/10 rounded-xl overflow-hidden shadow-2xl shadow-black/20 flex flex-col flex-1 min-h-0">
                {/* Search & Actions Bar */}
                <div className="p-4 flex items-center justify-between bg-white/5 border-b border-white/10 gap-4 shrink-0">
                    <div className="relative max-w-sm w-full">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                        <Input placeholder="Search forms..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full bg-white/5 border-white/10 text-white pl-10 placeholder:text-gray-600 focus-visible:ring-indigo-500 focus-visible:ring-offset-0" />
                    </div>
                    {selected.length >= 1 && (
                        <Button variant="destructive" onClick={handleDeleteSelected} className="rounded-lg font-medium bg-red-600 hover:bg-red-700 active:scale-95 transition-all">
                            <Trash2 className="w-4 h-4 mr-2" /> Delete ({selected.length})
                        </Button>
                    )}
                </div>

                <div className="overflow-x-auto overflow-y-auto flex-1">
                    <table className="w-full text-sm relative border-separate border-spacing-0 min-w-[700px]">
                        <thead className="sticky top-0 z-10 bg-[#0A0A0A]">
                            <tr className="border-b border-white/10 text-gray-400 uppercase tracking-wider">
                                <th className="p-4 w-[5%] bg-[#0A0A0A] border-b border-white/10">
                                    <Checkbox
                                        checked={selected.length === filtered.length && filtered.length > 0}
                                        onCheckedChange={() => setSelected(selected.length === filtered.length ? [] : filtered.map((f) => f.id))}
                                        className="border-white/20 data-[state=checked]:bg-indigo-500 data-[state=checked]:text-white"
                                    />
                                </th>
                                <th className="p-4 text-left font-medium w-[40%] bg-[#0A0A0A] border-b border-white/10">Form Name</th>
                                <th className="p-4 text-left font-medium w-[15%] hidden sm:table-cell bg-[#0A0A0A] border-b border-white/10">Submissions</th>
                                <th className="p-4 text-left font-medium w-[15%] bg-[#0A0A0A] border-b border-white/10">Status</th>
                                <th className="p-4 text-left font-medium w-[15%] hidden lg:table-cell bg-[#0A0A0A] border-b border-white/10">Created</th>
                                <th className="p-4 text-left font-medium w-[10%] bg-[#0A0A0A] border-b border-white/10">Link</th>
                                <th className="p-4 text-left font-medium w-[5%] bg-[#0A0A0A] border-b border-white/10"></th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-white/5">
                            {filtered.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="text-center text-gray-600 py-8 text-sm">
                                        No forms found matching the search criteria.
                                    </td>
                                </tr>
                            ) : (
                                filtered.map((form) => (
                                    <tr key={form.id} className="hover:bg-white/2 transition-colors">
                                        <td className="p-4">
                                            <Checkbox checked={selected.includes(form.id)} onCheckedChange={() => toggleSelect(form.id)} className="border-white/20 data-[state=checked]:bg-indigo-500 data-[state=checked]:text-white" />
                                        </td>
                                        <td className="p-4 font-medium text-gray-200 flex items-center gap-2">
                                            <Hash className="w-4 h-4 text-indigo-400 shrink-0" />
                                            {form.name}
                                        </td>
                                        <td className="p-4 font-medium text-indigo-300 hidden sm:table-cell items-center gap-1">
                                            <Send className="w-3 h-3 text-indigo-500" />
                                            {form.submissions}
                                        </td>
                                        <td className="p-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center w-fit ${getStatusStyles(form.status)}`}>
                                                <CheckCircle className="h-3.5 w-3.5 mr-1" />
                                                {form.status.charAt(0).toUpperCase() + form.status.slice(1)}
                                            </span>
                                        </td>
                                        <td className="p-4 text-gray-500 text-xs hidden lg:table-cell">
                                            <div className="flex items-center gap-1">
                                                <Calendar className="w-3 h-3 text-gray-600" />
                                                {format(new Date(form.created_at), 'MMM dd, yyyy')}
                                            </div>
                                        </td>
                                        <td className="p-4 text-left">
                                            <Button size="sm" variant="outline" onClick={() => handleCopy(form.id)} className="flex items-center gap-1 text-gray-400 hover:text-white border-white/10 hover:border-indigo-400/50 bg-white/5 hover:bg-indigo-500/10 transition-all">
                                                <Copy className="w-3 h-3" /> Link
                                            </Button>
                                        </td>
                                        <td className="p-4 text-left">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-gray-500 hover:bg-white/10">
                                                        <MoreVertical className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="bg-[#1A1A1A] border-white/10 text-gray-200">
                                                    <DropdownMenuItem onClick={() => handleEditClick(form.id, form.name)} className="hover:bg-white/10">
                                                        <Pencil className="mr-2 h-4 w-4 text-indigo-400" /> Edit Name
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => handleToggleStatus(form.id, form.status)} className="hover:bg-white/10">
                                                        <CheckCircle className="mr-2 h-4 w-4 text-green-400" />
                                                        {form.status === 'active' ? 'Mark as Completed' : 'Mark as Active'}
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator className="bg-white/10" />
                                                    <DropdownMenuItem onClick={() => handleDeleteSingle(form.id)} className="text-red-400 hover:bg-red-900/50 hover:text-red-300 transition-colors">
                                                        <Trash2 className="mr-2 h-4 w-4" /> Delete
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {filtered.length > 0 && <div className="p-4 border-t border-white/5 bg-[#0A0A0A] flex items-center justify-center text-xs text-gray-600 shrink-0">Showing {filtered.length} active forms.</div>}
            </div>
        </>
    );
}
