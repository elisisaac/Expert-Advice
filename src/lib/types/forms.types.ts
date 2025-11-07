export interface FormType {
    id: string;
    user_id: string;
    name: string;
    submissions: number;
    status: 'Active' | 'Completed';
    created_at: string;
}
