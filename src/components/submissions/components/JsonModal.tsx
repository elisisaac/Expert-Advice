'use client';

import { memo, useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogPortal, DialogOverlay } from '@/components/ui/dialog';
import { Loader2, FileJson, AlertCircle } from 'lucide-react';
import ReactJson from 'react-json-view';

interface JsonModalProps {
    url: string;
    isOpen: boolean;
    onClose: () => void;
}

export const JsonModal = memo(function JsonModal({ url, isOpen, onClose }: JsonModalProps) {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!isOpen || !url) {
            if (!isOpen) setData(null);
            return;
        }

        const fetchJson = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await fetch(url);
                if (!res.ok) throw new Error(`Status ${res.status}: Failed to fetch JSON`);
                const json = await res.json();
                setData(json);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load JSON');
            } finally {
                setLoading(false);
            }
        };

        fetchJson();
    }, [url, isOpen]);

    const renderContent = () => {
        if (loading) {
            return (
                <div className="flex h-full flex-col items-center justify-center gap-4">
                    <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
                    <p className="text-sm text-muted-foreground">Loading JSON…</p>
                </div>
            );
        }

        if (error) {
            return (
                <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
                    <AlertCircle className="w-10 h-10 text-destructive/60" />
                    <p className="text-destructive font-medium">{error}</p>
                </div>
            );
        }

        if (!data) return null;

        return (
            <div className="w-full h-full overflow-auto rounded-lg border bg-muted/30 p-4">
                <ReactJson
                    src={data}
                    name={null}
                    theme="rjv-default"
                    collapsed={2}
                    enableClipboard={true}
                    displayDataTypes={false}
                    displayObjectSize={false}
                    indentWidth={2}
                    style={{
                        backgroundColor: 'transparent',
                        fontSize: '14px',
                    }}
                />
            </div>
        );
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogPortal>
                <DialogOverlay className="bg-black/60 backdrop-blur-sm" />
                <DialogContent className="w-screen max-w-none h-[94vh] p-0 flex flex-col rounded-none">
                    <DialogHeader className="px-6 py-4 border-b bg-background">
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-md bg-emerald-500/10 flex items-center justify-center">
                                <FileJson className="w-4 h-4 text-emerald-600" />
                            </div>
                            <div className="flex-1">
                                <DialogTitle className="text-lg font-semibold">JSON Preview</DialogTitle>
                                <DialogDescription className="text-sm truncate">{url.split('/').pop()}</DialogDescription>
                            </div>
                        </div>
                    </DialogHeader>

                    <div className="flex-1 overflow-hidden px-4 py-2">{renderContent()}</div>
                </DialogContent>
            </DialogPortal>
        </Dialog>
    );
});

JsonModal.displayName = 'JsonModal';
