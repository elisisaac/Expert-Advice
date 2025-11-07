'use client';
import { useRef, DragEvent, useState, useEffect } from 'react';
import { Upload, Video as VideoIcon, X, CheckCircle2, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import dynamic from 'next/dynamic';
import MobileVideoCapture from './MobileVideoCapture';
import { VideoSource } from '@/lib/types/video-recorder.types';

const VideoRecorder = dynamic(() => import('./VideoRecorder'), {
    ssr: false,
    loading: () => (
        <div className="flex items-center justify-center aspect-video bg-gray-900 rounded-xl">
            <div className="text-white">Loading camera...</div>
        </div>
    ),
});

interface VideoUploaderProps {
    file: File | null;
    onChange: (f: File | null) => void;
}

export default function VideoUploader({ file, onChange }: VideoUploaderProps) {
    const uploadInputRef = useRef<HTMLInputElement | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedSource, setSelectedSource] = useState<VideoSource | null>(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
        };
        checkMobile();
    }, []);

    function handleFile(f?: FileList) {
        setError(null);
        if (!f || f.length === 0) return onChange(null);
        const ff = f[0];

        if (!ff.type.startsWith('video/')) {
            setError('Please upload a valid video file');
            return;
        }

        if (ff.size > 200 * 1024 * 1024) {
            setError('Video size must be less than 200MB');
            return;
        }

        onChange(ff);
        setSelectedSource(null);
    }

    function onDrop(e: DragEvent) {
        e.preventDefault();
        setIsDragging(false);
        handleFile(e.dataTransfer.files);
    }

    function onDragOver(e: DragEvent) {
        e.preventDefault();
        setIsDragging(true);
    }

    function onDragLeave(e: DragEvent) {
        e.preventDefault();
        setIsDragging(false);
    }

    function removeFile() {
        onChange(null);
        setError(null);
        setSelectedSource(null);
        if (uploadInputRef.current) uploadInputRef.current.value = '';
    }

    function handleRecordingComplete(recordedFile: File) {
        onChange(recordedFile);
        setSelectedSource(null);
    }

    function handleCancelRecording() {
        setSelectedSource(null);
    }

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
    };

    if (selectedSource === 'record') {
        if (isMobile) {
            return <MobileVideoCapture onVideoCapture={handleRecordingComplete} onCancel={handleCancelRecording} />;
        }
        return <VideoRecorder onRecordingComplete={handleRecordingComplete} onCancel={handleCancelRecording} />;
    }

    return (
        <div className="space-y-3">
            {!file ? (
                <>
                    <div
                        onDrop={onDrop}
                        onDragOver={onDragOver}
                        onDragLeave={onDragLeave}
                        onClick={() => uploadInputRef.current?.click()}
                        className={`relative border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all duration-200 ${
                            isDragging ? 'border-indigo-600 bg-indigo-50 scale-[1.01]' : error ? 'border-red-300 bg-red-50 hover:border-red-400' : 'border-gray-300 bg-gray-50/50 hover:border-indigo-400 hover:bg-indigo-50/50'
                        }`}
                    >
                        <div className="flex flex-col items-center gap-3">
                            <div className={`p-3 rounded-full transition-colors ${isDragging ? 'bg-indigo-600' : error ? 'bg-red-100' : 'bg-white border border-gray-200'}`}>
                                <Upload className={`w-7 h-7 ${isDragging ? 'text-white' : error ? 'text-red-600' : 'text-indigo-600'}`} />
                            </div>
                            <div>
                                <p className={`text-base font-semibold mb-1 ${error ? 'text-red-700' : 'text-gray-900'}`}>{isDragging ? 'Drop your video here' : error ? error : 'Upload Video'}</p>
                                <p className="text-sm text-gray-600">Drag and drop or click to browse</p>
                                <p className="text-xs text-gray-500 mt-1">MP4, MOV, AVI • Max 200MB</p>
                            </div>
                        </div>
                        <input ref={uploadInputRef} onChange={(e) => handleFile(e.target.files || undefined)} accept="video/*" type="file" className="hidden" />
                    </div>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">OR</span>
                        </div>
                    </div>

                    <Button type="button" onClick={() => setSelectedSource('record')} variant="outline" className="w-full h-auto py-4 border-2 hover:border-indigo-600 hover:bg-indigo-50">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-indigo-100 rounded-lg">
                                <Camera className="w-5 h-5 text-indigo-600" />
                            </div>
                            <div className="text-left">
                                <p className="font-semibold text-gray-900">Record Video</p>
                                <p className="text-xs text-gray-600">Use your camera to record</p>
                            </div>
                        </div>
                    </Button>
                </>
            ) : (
                <div className="border-2 border-indigo-200 bg-indigo-50 rounded-xl p-5 transition-all duration-200">
                    <div className="flex items-start gap-3">
                        <div className="p-2.5 bg-indigo-600 rounded-lg">
                            <VideoIcon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-3">
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-0.5">
                                        <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
                                        <p className="font-semibold text-sm text-indigo-900 truncate">{file.name}</p>
                                    </div>
                                    <p className="text-xs text-indigo-700">{formatFileSize(file.size)}</p>
                                </div>
                                <button type="button" onClick={removeFile} className="p-1.5 hover:bg-indigo-100 rounded-lg transition-colors shrink-0" aria-label="Remove video">
                                    <X className="w-4 h-4 text-indigo-900" />
                                </button>
                            </div>
                            <div className="mt-2.5 flex items-center gap-2">
                                <div className="flex-1 h-1 bg-indigo-200 rounded-full overflow-hidden">
                                    <div className="h-full bg-indigo-600 w-full transition-all duration-500" />
                                </div>
                                <span className="text-xs font-medium text-indigo-700">100%</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
