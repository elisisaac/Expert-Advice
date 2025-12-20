import { memo } from 'react';
import { Download, Eye, LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { FileType } from '../hooks/useFileActions';

interface FileActionCardProps {
    url: string | null;
    type: FileType;
    icon: LucideIcon;
    label: string;
    color: string;
    onDownload: (url: string, filename: string) => void;
    onPreview: (url: string, type: FileType) => void;
}

export const FileActionCard = memo(function FileActionCard({ url, type, icon: Icon, label, color, onDownload, onPreview }: FileActionCardProps) {
    if (!url) {
        return (
            <div className="flex flex-col items-center gap-2 p-3 rounded-lg bg-muted/30 border border-border/50 min-w-[100px]">
                <Icon className="w-5 h-5 opacity-30 text-muted-foreground" />
                <span className="text-xs text-muted-foreground/60 font-medium">{label}</span>
                <span className="text-[10px] text-muted-foreground/40">Not available</span>
            </div>
        );
    }

    const filename = `${label.toLowerCase().replace(/\s+/g, '-')}.${type === 'markdown' ? 'md' : type === 'json' ? 'json' : 'mp4'}`;

    return (
        <div className="flex flex-col items-center gap-2 p-3 rounded-lg bg-card border border-border hover:border-indigo-500/50 transition-all duration-200 hover:shadow-md hover:shadow-indigo-500/10 min-w-[100px] group">
            <Icon className={`w-5 h-5 ${color} group-hover:scale-110 transition-transform duration-200`} />
            <span className="text-xs font-semibold text-foreground">{label}</span>
            <div className="flex gap-1.5 w-full">
                <Button variant="ghost" size="sm" className="flex-1 h-8 text-xs font-medium hover:bg-indigo-500/10 hover:text-indigo-400 transition-colors" onClick={() => onPreview(url, type)}>
                    <Eye className="w-3.5 h-3.5 mr-1" />
                    View
                </Button>
                <Button variant="ghost" size="sm" className="flex-1 h-8 text-xs font-medium hover:bg-green-500/10 hover:text-green-400 transition-colors" onClick={() => onDownload(url, filename)}>
                    <Download className="w-3.5 h-3.5 mr-1" />
                    Save
                </Button>
            </div>
        </div>
    );
});
