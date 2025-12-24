'use client';

import { memo, useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogPortal, DialogOverlay } from '@/components/ui/dialog';
import { Loader2, FileText, AlertCircle } from 'lucide-react';
import Markdown from 'markdown-to-jsx';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface MarkdownModalProps {
    url: string;
    isOpen: boolean;
    onClose: () => void;
}

export const MarkdownModal = memo(function MarkdownModal({ url, isOpen, onClose }: MarkdownModalProps) {
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!isOpen || !url) {
            if (!isOpen) setContent('');
            return;
        }

        const fetchContent = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await fetch(url);
                if (!res.ok) throw new Error(`Status ${res.status}: Failed to fetch markdown`);
                setContent(await res.text());
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load content');
            } finally {
                setLoading(false);
            }
        };

        fetchContent();
    }, [url, isOpen]);

    const renderContent = () => {
        if (loading) {
            return (
                <div className="flex flex-col items-center justify-center h-full gap-4">
                    <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
                    <p className="text-sm text-muted-foreground">Loading document…</p>
                </div>
            );
        }

        if (error) {
            return (
                <div className="flex flex-col items-center justify-center h-full gap-3 text-center">
                    <AlertCircle className="w-10 h-10 text-destructive/60" />
                    <p className="text-destructive font-medium">{error}</p>
                </div>
            );
        }

        return (
            <div className="w-full max-w-none text-[15px] leading-7 text-foreground">
                <Markdown
                    options={{
                        forceBlock: true,
                        overrides: {
                            h1: {
                                component: ({ children }) => <h1 className="text-3xl font-semibold mt-6 mb-4">{children}</h1>,
                            },
                            h2: {
                                component: ({ children }) => <h2 className="text-2xl font-semibold mt-6 mb-3">{children}</h2>,
                            },
                            h3: {
                                component: ({ children }) => <h3 className="text-xl font-semibold mt-5 mb-2">{children}</h3>,
                            },
                            p: {
                                component: ({ children }) => <p className="mb-4 max-w-none">{children}</p>,
                            },
                            a: {
                                component: ({ href, children }) => (
                                    <a href={href} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline break-all">
                                        {children}
                                    </a>
                                ),
                            },
                            code: {
                                component: ({ className, children }) => {
                                    const match = /language-(\w+)/.exec(className || '');
                                    if (!match) {
                                        return <code className="px-1.5 py-0.5 rounded bg-muted font-mono text-sm">{children}</code>;
                                    }

                                    return (
                                        <div className="my-6 overflow-x-auto rounded-lg border">
                                            <SyntaxHighlighter
                                                language={match[1]}
                                                style={vscDarkPlus}
                                                customStyle={{
                                                    margin: 0,
                                                    padding: '1.25rem',
                                                    fontSize: '0.85rem',
                                                }}
                                            >
                                                {String(children).trim()}
                                            </SyntaxHighlighter>
                                        </div>
                                    );
                                },
                            },
                            table: {
                                component: ({ children }) => (
                                    <div className="my-6 overflow-x-auto">
                                        <table className="min-w-full border border-border">{children}</table>
                                    </div>
                                ),
                            },
                            th: {
                                component: ({ children }) => <th className="border px-3 py-2 text-left font-semibold bg-muted">{children}</th>,
                            },
                            td: {
                                component: ({ children }) => <td className="border px-3 py-2 align-top">{children}</td>,
                            },
                        },
                    }}
                >
                    {content}
                </Markdown>
            </div>
        );
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogPortal>
                <DialogOverlay className="bg-black/60 backdrop-blur-sm" />
                <DialogContent className="w-screen max-w-none h-[96vh] p-0 flex flex-col overflow-hidden rounded-none">
                    <DialogHeader className="px-6 py-4 border-b bg-background">
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-md bg-blue-500/10 flex items-center justify-center">
                                <FileText className="w-4 h-4 text-blue-600" />
                            </div>
                            <div className="flex-1">
                                <DialogTitle className="text-lg font-semibold">Document Preview</DialogTitle>
                                <DialogDescription className="text-sm truncate">{url.split('/').pop()}</DialogDescription>
                            </div>
                        </div>
                    </DialogHeader>

                    <div className="flex-1 overflow-y-auto px-4 py-2">{renderContent()}</div>
                </DialogContent>
            </DialogPortal>
        </Dialog>
    );
});

MarkdownModal.displayName = 'MarkdownModal';
