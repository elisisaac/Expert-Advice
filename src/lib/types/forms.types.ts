export interface FormType {
    id: number;
    name: string;
    submissions: number;
    status: 'Active' | 'Completed';
    createdAt: string;
    link: string;
}
