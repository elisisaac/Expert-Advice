export interface DashboardStats {
    label: string;
    value: string | number;
    change?: string;
    trend?: 'up' | 'down';
    icon: React.ElementType;
}

export interface TabItem {
    id: string;
    label: string;
    content: React.ReactNode;
}

export interface SidebarItem {
    id: string;
    label: string;
    icon: React.ElementType;
    href: string;
}
