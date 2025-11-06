import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function SubmissionsPage() {
    const submissions = [
        { id: 1, form: 'Contact Form', name: 'John Doe', email: 'john@example.com', date: '2 hours ago', status: 'New' },
        { id: 2, form: 'Newsletter', name: 'Jane Smith', email: 'jane@example.com', date: '5 hours ago', status: 'Read' },
        { id: 3, form: 'Feedback', name: 'Bob Johnson', email: 'bob@example.com', date: '1 day ago', status: 'Archived' },
        { id: 4, form: 'Support Request', name: 'Alice Williams', email: 'alice@example.com', date: '2 days ago', status: 'New' },
        { id: 5, form: 'Contact Form', name: 'Charlie Brown', email: 'charlie@example.com', date: '3 days ago', status: 'Read' },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Submissions</h1>
                <p className="text-gray-500 mt-1">View and manage form submissions</p>
            </div>

            <Card className="border-2">
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b-2 border-gray-200">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Form</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Name</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Email</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Date</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {submissions.map((submission) => (
                                    <tr key={submission.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 text-sm font-medium text-gray-900">{submission.form}</td>
                                        <td className="px-6 py-4 text-sm text-gray-600">{submission.name}</td>
                                        <td className="px-6 py-4 text-sm text-gray-600">{submission.email}</td>
                                        <td className="px-6 py-4 text-sm text-gray-500">{submission.date}</td>
                                        <td className="px-6 py-4">
                                            <Badge variant={submission.status === 'New' ? 'default' : 'secondary'} className={submission.status === 'New' ? 'bg-indigo-600' : ''}>
                                                {submission.status}
                                            </Badge>
                                        </td>
                                        <td className="px-6 py-4">
                                            <Button variant="ghost" size="icon">
                                                <MoreVertical className="w-4 h-4" />
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
