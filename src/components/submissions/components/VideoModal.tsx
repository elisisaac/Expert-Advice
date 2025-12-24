'use client';

import { memo } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogPortal, DialogOverlay } from '@/components/ui/dialog';
import { Video as VideoIcon } from 'lucide-react';

interface VideoModalProps {
    url: string;
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    description?: string;
}

export const VideoModal = memo(function VideoModal({ url, isOpen, onClose, title = 'Video Preview', description = 'High-quality video playback' }: VideoModalProps) {
    if (!url) return null;

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogPortal>
                <DialogOverlay className="bg-black/60 backdrop-blur-sm" />

                <DialogContent className="w-screen h-[94vh] max-w-none p-0 flex flex-col bg-background rounded-none">
                    {/* Header */}
                    <DialogHeader className="px-6 py-4 border-b bg-background">
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-md bg-indigo-500/10 flex items-center justify-center">
                                <VideoIcon className="w-4 h-4 text-indigo-600" />
                            </div>
                            <div className="flex-1">
                                <DialogTitle className="text-lg font-semibold">{title}</DialogTitle>
                                <DialogDescription className="text-sm truncate">{description}</DialogDescription>
                            </div>
                        </div>
                    </DialogHeader>

                    {/* Video Area */}
                    <div className="flex-1 flex items-center justify-center bg-muted/40 p-6">
                        <div className="w-full h-full max-w-[1200px] max-h-[75vh] bg-black rounded-lg overflow-hidden shadow-xl">
                            <video controls autoPlay playsInline className="w-full h-full object-contain" src={url}>
                                <source src={url} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    </div>
                </DialogContent>
            </DialogPortal>
        </Dialog>
    );
});

VideoModal.displayName = 'VideoModal';
