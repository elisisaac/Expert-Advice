import { create } from 'zustand';
import { SubmissionDisplayData } from '@/lib/types/submission.types';
import { toast } from 'sonner';
import { supabaseClient } from '@/supabase/client';

interface SubmissionsState {
    submissions: SubmissionDisplayData[];
    setSubmissions: (data: SubmissionDisplayData[]) => void;
    deleteSubmission: (id: string, videoUrl: string | null, jsonResultUrl: string | null, markdownUrl: string | null) => Promise<void>;
    deleteMany: (ids: string[]) => Promise<void>;
}

const extractFilePathFromUrl = (url: string): string | null => {
    try {
        const bucketName = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET!;
        const storagePattern = new RegExp(`/storage/v1/object/public/${bucketName}/(.+)$`);
        const match = url.match(storagePattern);
        return match ? match[1] : null;
    } catch (error) {
        console.error('Error extracting file path:', error);
        return null;
    }
};

const deleteFileFromStorage = async (url: string): Promise<boolean> => {
    const filePath = extractFilePathFromUrl(url);
    if (!filePath) {
        console.warn('Could not extract file path from URL:', url);
        return false;
    }

    try {
        const bucketName = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET!;
        const { error } = await supabaseClient.storage.from(bucketName).remove([filePath]);

        if (error) {
            console.error('Error deleting file from storage:', error);
            return false;
        }

        return true;
    } catch (error) {
        console.error('Exception deleting file from storage:', error);
        return false;
    }
};

export const useSubmissionsStore = create<SubmissionsState>((set) => ({
    submissions: [],
    setSubmissions: (data) => set({ submissions: data }),

    deleteSubmission: async (id, videoUrl, jsonResultUrl, markdownUrl) => {
        try {
            // Delete all associated files from storage
            const deletePromises: Promise<boolean>[] = [];

            if (videoUrl) {
                deletePromises.push(deleteFileFromStorage(videoUrl));
            }

            if (jsonResultUrl) {
                deletePromises.push(deleteFileFromStorage(jsonResultUrl));
            }

            if (markdownUrl) {
                deletePromises.push(deleteFileFromStorage(markdownUrl));
            }

            // Wait for all file deletions (don't fail if some files are missing)
            await Promise.allSettled(deletePromises);

            // Call API instead of direct database access - prevents IDOR vulnerability
            const res = await fetch(`/api/submissions?id=${id}`, { method: 'DELETE' });
            if (!res.ok) throw new Error('Failed to delete submission');

            // Update state
            set((state) => ({
                submissions: state.submissions.filter((s) => s.id !== id),
            }));

            toast.success('Submission deleted successfully!');
        } catch (error: any) {
            console.error('Error deleting submission:', error);
            toast.error(error.message || 'Failed to delete submission');
            throw error;
        }
    },

    deleteMany: async (ids) => {
        try {
            // Get all submissions that will be deleted to access their file URLs
            const submissionsToDelete = await supabaseClient.from('submissions').select('*').in('id', ids);

            if (submissionsToDelete.data) {
                // Delete all associated files from storage
                const deletePromises: Promise<boolean>[] = [];

                submissionsToDelete.data.forEach((submission) => {
                    if (submission.video_url) {
                        deletePromises.push(deleteFileFromStorage(submission.video_url));
                    }
                    if (submission.json_result_url) {
                        deletePromises.push(deleteFileFromStorage(submission.json_result_url));
                    }
                    if (submission.markdown_url) {
                        deletePromises.push(deleteFileFromStorage(submission.markdown_url));
                    }
                });

                // Wait for all file deletions
                await Promise.allSettled(deletePromises);
            }

            // Call API instead of direct database access - prevents IDOR vulnerability
            const res = await fetch('/api/submissions', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ids }),
            });
            if (!res.ok) throw new Error('Failed to delete submissions');

            // Update state
            set((state) => ({
                submissions: state.submissions.filter((s) => !ids.includes(s.id)),
            }));

            toast.success(`Deleted ${ids.length} submission${ids.length > 1 ? 's' : ''}`);
        } catch (error: any) {
            console.error('Error deleting submissions:', error);
            toast.error(error.message || 'Failed to delete submissions');
            throw error;
        }
    },
}));
