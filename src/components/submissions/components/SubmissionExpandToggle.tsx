import { memo } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface SubmissionHeaderProps {
    isExpanded: boolean;
    onToggle: () => void;
}

export const SubmissionExpandToggle = memo(function SubmissionExpandToggle({ isExpanded, onToggle }: SubmissionHeaderProps) {
    return (
        <button onClick={onToggle} className="p-1.5 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors" aria-label="Toggle details">
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
    );
});
