import { useCallback, useState } from 'react';

export type FileType = 'video' | 'markdown' | 'json';

export interface OpenModal {
    type: FileType;
    url: string;
}

export function useFileActions() {
    const [openModal, setOpenModal] = useState<OpenModal | null>(null);

    const handleDownload = useCallback(async (url: string, filename: string) => {
        try {
            const response = await fetch(url);
            const blob = await response.blob();
            const blobUrl = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(blobUrl);
        } catch (error) {
            console.error('Download failed:', error);
        }
    }, []);

    const handlePreview = useCallback((url: string, type: FileType) => {
        setOpenModal({ type, url });
    }, []);

    const closeModal = useCallback(() => {
        setOpenModal(null);
    }, []);

    return {
        openModal,
        handleDownload,
        handlePreview,
        closeModal,
    };
}
