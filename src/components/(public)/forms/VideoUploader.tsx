'use client';
import { useRef, DragEvent, useState, useEffect } from 'react';
import { Upload, Video as VideoIcon, X, CheckCircle2, Camera, Loader2, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import dynamic from 'next/dynamic';
import MobileVideoCapture from './MobileVideoCapture';
import { VideoSource } from '@/lib/types/video-recorder.types';
import { supabaseClient } from '@/supabase/client';
import { toast } from 'sonner';

const VideoRecorder = dynamic(() => import('./VideoRecorder'), {
    ssr: false,
    loading: () => (
        <div className="flex items-center justify-center aspect-video bg-[#1A1A1A] rounded-xl border border-white/10">
            <div className="text-gray-400 flex items-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin" />
                Loading camera...
            </div>
        </div>
    ),
});

interface VideoUploaderProps {
    videoUrl: string;
    isUploading: boolean;
    onUploadStart: () => void;
    onUploadComplete: (url: string) => void;
    onUploadError: (error: string) => void;
    formId: string;
}

export default function VideoUploader({ videoUrl, isUploading, onUploadStart, onUploadComplete, onUploadError, formId }: VideoUploaderProps) {
    const uploadInputRef = useRef<HTMLInputElement | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedSource, setSelectedSource] = useState<VideoSource | null>(null);
    const [isMobile, setIsMobile] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [currentFileName, setCurrentFileName] = useState<string>('');

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
        };
        checkMobile();
    }, []);

    async function uploadToSupabase(file: File) {
        try {
            onUploadStart();
            setError(null);
            setUploadProgress(0);
            setCurrentFileName(file.name);

            const fileExt = file.name.split('.').pop();
            const fileName = `${formId}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
            const bucketName = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET!;

            await uploadWithProgress(bucketName, fileName, file);

            const {
                data: { publicUrl },
            } = supabaseClient.storage.from(bucketName).getPublicUrl(fileName);

            setUploadProgress(100);
            onUploadComplete(publicUrl);
            toast.success('Video uploaded successfully!');
        } catch (err: any) {
            console.error('Upload error:', err);
            const errorMsg = err.message || 'Failed to upload video';
            setError(errorMsg);
            onUploadError(errorMsg);
            toast.error(errorMsg);
        }
    }

    function uploadWithProgress(bucketName: string, fileName: string, file: File): Promise<void> {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();

            xhr.upload.addEventListener('progress', (e) => {
                if (e.lengthComputable) {
                    const percentComplete = Math.round((e.loaded / e.total) * 100);
                    setUploadProgress(percentComplete);
                }
            });

            xhr.addEventListener('load', () => {
                if (xhr.status === 200) {
                    resolve();
                } else {
                    reject(new Error(`Upload failed with status ${xhr.status}`));
                }
            });

            xhr.addEventListener('error', () => {
                reject(new Error('Network error during upload'));
            });

            xhr.addEventListener('abort', () => {
                reject(new Error('Upload cancelled'));
            });

            const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
            const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

            xhr.open('POST', `${supabaseUrl}/storage/v1/object/${bucketName}/${fileName}`);
            xhr.setRequestHeader('Authorization', `Bearer ${supabaseKey}`);
            xhr.setRequestHeader('apikey', supabaseKey);
            xhr.setRequestHeader('Content-Type', file.type || 'application/octet-stream');

            xhr.send(file);
        });
    }

    function handleFile(f?: FileList) {
        setError(null);
        if (!f || f.length === 0) return;
        const file = f[0];

        if (!file.type.startsWith('video/')) {
            const errorMsg = 'Please upload a valid video file';
            setError(errorMsg);
            toast.error(errorMsg);
            return;
        }

        const maxSizeMB = parseInt(process.env.NEXT_PUBLIC_MAX_VIDEO_SIZE_MB || '50', 10);
        const maxSizeBytes = maxSizeMB * 1024 * 1024;

        if (file.size > maxSizeBytes) {
            const errorMsg = `Video size must be less than ${maxSizeMB}MB`;
            setError(errorMsg);
            toast.error(errorMsg);
            return;
        }

        uploadToSupabase(file);
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

    function removeVideo() {
        onUploadComplete('');
        setError(null);
        setCurrentFileName('');
        setUploadProgress(0);
        setSelectedSource(null);
        if (uploadInputRef.current) uploadInputRef.current.value = '';
    }

    function handleRecordingComplete(recordedFile: File) {
        uploadToSupabase(recordedFile);
        setSelectedSource(null);
    }

    function handleCancelRecording() {
        setSelectedSource(null);
    }

    if (selectedSource === 'record') {
        if (isMobile) {
            return <MobileVideoCapture onVideoCapture={handleRecordingComplete} onCancel={handleCancelRecording} />;
        }
        return <VideoRecorder onRecordingComplete={handleRecordingComplete} onCancel={handleCancelRecording} />;
    }

    return (
        <div className="space-y-4">
            {!videoUrl ? (
                <>
                    <div
                        onDrop={onDrop}
                        onDragOver={onDragOver}
                        onDragLeave={onDragLeave}
                        onClick={() => !isUploading && uploadInputRef.current?.click()}
                        className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 
                            ${
                                isUploading
                                    ? 'border-indigo-600 bg-indigo-950/20 cursor-not-allowed'
                                    : isDragging
                                      ? 'border-indigo-600 bg-indigo-950/30 scale-[1.01] cursor-pointer shadow-lg shadow-indigo-500/20'
                                      : error
                                        ? 'border-red-600/50 bg-red-950/10 hover:border-red-500/50 cursor-pointer'
                                        : 'border-white/10 bg-white/5 hover:border-indigo-500/50 hover:bg-white/10 cursor-pointer'
                            }`}
                    >
                        {isUploading && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-[#0A0A0A]/90 backdrop-blur-sm rounded-xl">
                                <Loader2 className="w-10 h-10 text-indigo-400 animate-spin mb-3" />
                                <p className="text-lg font-semibold text-white mb-2">Uploading...</p>
                                <p className="text-sm text-gray-400 mb-4 truncate w-full px-2">{currentFileName}</p>
                                <div className="w-3/4 h-2 bg-white/10 rounded-full overflow-hidden">
                                    <div className="h-full bg-indigo-500 transition-all duration-300" style={{ width: `${uploadProgress}%` }} />
                                </div>
                                <span className="text-sm font-semibold text-indigo-400 mt-2">{uploadProgress}% Complete</span>
                            </div>
                        )}

                        <div className="flex flex-col items-center gap-4 opacity-100">
                            <div
                                className={`p-4 rounded-full transition-colors border border-white/20 
                                ${isDragging ? 'bg-indigo-600' : error ? 'bg-red-900/40' : 'bg-white/10'}`}
                            >
                                <Upload className={`w-8 h-8 ${isDragging ? 'text-white' : error ? 'text-red-400' : 'text-indigo-400'}`} />
                            </div>

                            <div>
                                <p className={`text-lg font-semibold mb-1 ${error ? 'text-red-400' : isDragging ? 'text-indigo-300' : 'text-white'}`}>{error ? 'Error: Click to Retry' : isDragging ? 'Drop video here to upload' : 'Drag & Drop or Click to Upload'}</p>

                                <p className="text-sm text-gray-400">MP4, MOV, WEBM formats supported.</p>
                                <p className="text-xs text-gray-500 mt-1">Max video size: {process.env.NEXT_PUBLIC_MAX_VIDEO_SIZE_MB || '50'}MB</p>
                            </div>
                        </div>
                        <input ref={uploadInputRef} onChange={(e) => handleFile(e.target.files || undefined)} accept="video/*" type="file" className="hidden" disabled={isUploading} />
                    </div>

                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-white/10" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-3 bg-[#0A0A0A] text-gray-500 font-medium">OR</span>
                        </div>
                    </div>

                    <Button type="button" onClick={() => setSelectedSource('record')} className="w-full h-auto py-3 border border-indigo-500/20 bg-indigo-600/10 hover:bg-indigo-600/20 transition-all text-white rounded-xl shadow-md shadow-indigo-900/30">
                        <div className="flex items-center gap-4">
                            <div className="p-2 bg-indigo-500/30 rounded-lg">
                                <Camera className="w-5 h-5 text-indigo-300" />
                            </div>
                            <div className="text-left flex-1">
                                <p className="font-semibold text-white">Record Video Directly</p>
                                <p className="text-xs text-gray-400">Capture footage using your device camera for instant upload.</p>
                            </div>
                            <Zap className="w-5 h-5 text-indigo-400 shrink-0" />
                        </div>
                    </Button>
                </>
            ) : (
                <div className="border border-green-500/30 bg-green-950/20 rounded-xl p-5 transition-all duration-200 shadow-lg shadow-green-900/20">
                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-green-600/30 rounded-lg">
                            <VideoIcon className="w-6 h-6 text-green-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-3">
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
                                        <p className="font-semibold text-base text-white">Video Ready</p>
                                    </div>
                                    <p className="text-xs text-gray-400 truncate">{currentFileName || 'Video uploaded successfully'}</p>
                                </div>
                                <button type="button" onClick={removeVideo} disabled={isUploading} className="p-1.5 hover:bg-white/10 rounded-lg transition-colors shrink-0 text-gray-500 hover:text-red-400" aria-label="Remove video">
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                            <div className="mt-2.5 flex items-center gap-2">
                                <div className="flex-1 h-1 bg-green-200/20 rounded-full overflow-hidden">
                                    <div className="h-full bg-green-600 w-full transition-all duration-500" />
                                </div>
                                <span className="text-xs font-medium text-green-400">100%</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
