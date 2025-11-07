'use client';
import { useState, useEffect } from 'react';
import { Video, Square, Pause, Play, RotateCcw, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useReactMediaRecorder } from 'react-media-recorder';

interface VideoRecorderProps {
    onRecordingComplete: (file: File) => void;
    onCancel: () => void;
}

export default function VideoRecorder({ onRecordingComplete, onCancel }: VideoRecorderProps) {
    const [timer, setTimer] = useState({ minutes: 0, seconds: 0 });
    const [isTimerRunning, setIsTimerRunning] = useState(false);

    const { status, startRecording, stopRecording, pauseRecording, resumeRecording, mediaBlobUrl, previewStream, clearBlobUrl, error } = useReactMediaRecorder({
        video: true,
        audio: true,
        askPermissionOnMount: true,
        blobPropertyBag: { type: 'video/webm' },
    });

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isTimerRunning) {
            interval = setInterval(() => {
                setTimer((prev) => {
                    const newSeconds = prev.seconds + 1;
                    if (newSeconds === 60) {
                        return { seconds: 0, minutes: prev.minutes + 1 };
                    }
                    return { ...prev, seconds: newSeconds };
                });
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isTimerRunning]);

    const handleStartRecording = () => {
        setTimer({ minutes: 0, seconds: 0 });
        setIsTimerRunning(true);
        startRecording();
    };

    const handleStopRecording = () => {
        setIsTimerRunning(false);
        stopRecording();
    };

    const handlePauseRecording = () => {
        setIsTimerRunning(false);
        pauseRecording();
    };

    const handleResumeRecording = () => {
        setIsTimerRunning(true);
        resumeRecording();
    };

    const handleRetake = () => {
        clearBlobUrl();
        setTimer({ minutes: 0, seconds: 0 });
        setIsTimerRunning(false);
    };

    const handleComplete = async () => {
        if (mediaBlobUrl) {
            const response = await fetch(mediaBlobUrl);
            const blob = await response.blob();
            const file = new File([blob], `recorded-video-${Date.now()}.webm`, {
                type: 'video/webm',
            });
            onRecordingComplete(file);
        }
    };

    const formatTime = (mins: number, secs: number) => {
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    if (error) {
        return (
            <div className="border-2 border-red-300 bg-red-50 rounded-xl p-8 text-center">
                <div className="text-red-700 mb-4">Unable to access camera. Please check permissions.</div>
                <Button onClick={onCancel} variant="outline">
                    Cancel
                </Button>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="relative aspect-video bg-gray-900 rounded-xl overflow-hidden">
                {mediaBlobUrl ? (
                    <video key={mediaBlobUrl} src={mediaBlobUrl} controls className="w-full h-full object-contain" />
                ) : (
                    <video
                        ref={(video) => {
                            if (video && previewStream) {
                                video.srcObject = previewStream;
                            }
                        }}
                        autoPlay
                        muted
                        playsInline
                        className="w-full h-full object-contain"
                    />
                )}

                {status === 'recording' && (
                    <div className="absolute top-4 left-4 flex items-center gap-2 bg-red-600 text-white px-3 py-1.5 rounded-full">
                        <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
                        <span className="text-sm font-semibold">{formatTime(timer.minutes, timer.seconds)}</span>
                    </div>
                )}
            </div>

            <div className="flex gap-3">
                {!mediaBlobUrl ? (
                    <>
                        {status === 'idle' || status === 'acquiring_media' ? (
                            <>
                                <Button onClick={onCancel} variant="outline" className="flex-1" disabled={status === 'acquiring_media'}>
                                    <X className="mr-2 w-4 h-4" />
                                    Cancel
                                </Button>
                                <Button onClick={handleStartRecording} disabled={status === 'acquiring_media'} className="flex-1 bg-red-600 hover:bg-red-700">
                                    <Video className="mr-2 w-4 h-4" />
                                    {status === 'acquiring_media' ? 'Loading Camera...' : 'Start Recording'}
                                </Button>
                            </>
                        ) : status === 'recording' ? (
                            <>
                                <Button onClick={handlePauseRecording} variant="outline" className="flex-1">
                                    <Pause className="mr-2 w-4 h-4" />
                                    Pause
                                </Button>
                                <Button onClick={handleStopRecording} className="flex-1 bg-red-600 hover:bg-red-700">
                                    <Square className="mr-2 w-4 h-4" />
                                    Stop
                                </Button>
                            </>
                        ) : status === 'paused' ? (
                            <>
                                <Button onClick={handleResumeRecording} className="flex-1 bg-green-600 hover:bg-green-700">
                                    <Play className="mr-2 w-4 h-4" />
                                    Resume
                                </Button>
                                <Button onClick={handleStopRecording} className="flex-1 bg-red-600 hover:bg-red-700">
                                    <Square className="mr-2 w-4 h-4" />
                                    Stop
                                </Button>
                            </>
                        ) : null}
                    </>
                ) : (
                    <>
                        <Button onClick={handleRetake} variant="outline" className="flex-1">
                            <RotateCcw className="mr-2 w-4 h-4" />
                            Retake
                        </Button>
                        <Button onClick={handleComplete} className="flex-1 bg-indigo-600 hover:bg-indigo-700">
                            <Check className="mr-2 w-4 h-4" />
                            Use This Video
                        </Button>
                    </>
                )}
            </div>
        </div>
    );
}
