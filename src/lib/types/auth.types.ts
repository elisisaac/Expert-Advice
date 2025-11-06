export interface AuthLayoutProps {
    children: React.ReactNode;
    stats: StatsData;
}

export interface StatsData {
    inbox: string;
    engagement: string;
}

export interface AuthHeaderProps {
    title: string;
    subtitle: string;
    linkText: string;
    linkHref: string;
    onLinkClick?: () => void;
}

export interface InputFieldProps {
    type?: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    icon: React.ElementType;
    validated?: boolean;
    error?: boolean;
    showPasswordToggle?: boolean;
    onTogglePassword?: () => void;
    showPassword?: boolean;
    name?: string;
}

export interface PasswordRequirementsProps {
    password: string;
}

export interface StatsCardProps {
    value: string;
    label: string;
}

export interface EngagementChartProps {
    count: string;
}
