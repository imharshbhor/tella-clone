"use client"

import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import RecordBanner from '@/components/video/record/RecordBanner'
import RecordButtons from '@/components/video/record/RecordButtons'
import Search from '@/components/video/select/Search'
import UploadBanner from '@/components/video/upload/UploadBanner'
import PermissionsBanner from '@/components/video/permissions/PermissionsBanner'
import NewClipsFooter from '@/components/video/new-clips/NewClipsFooter'
import CustomOverlay from '@/components/video/record/CustomOverlay'
import { useClipsStore } from '@/lib/clipStore'
import Confetti from '@/components/video/new-clips/Confetti'
import Preview from '@/components/video/record/Preview'
import SelectBanner from '@/components/video/select/SelectBanner'

interface MediaContextType {
    isMuted: boolean;
    setIsMuted: React.Dispatch<React.SetStateAction<boolean>>;
    isCamOff: boolean;
    setIsCamOff: React.Dispatch<React.SetStateAction<boolean>>;
    isSharing: boolean;
    setIsSharing: React.Dispatch<React.SetStateAction<boolean>>;
    videoStream: MediaStream | null;
    displayStream: MediaStream | null;
    setVideoStream: React.Dispatch<React.SetStateAction<MediaStream | null>>;
    setDisplayStream: React.Dispatch<React.SetStateAction<MediaStream | null>>;
    videoRef: React.RefObject<HTMLVideoElement | null>;
    displayRef: React.RefObject<HTMLVideoElement | null>;
    isRecording: boolean;
    setIsRecording: React.Dispatch<React.SetStateAction<boolean>>;
    handleStartRecording: any;
    handleStopRecording: () => void;
    handleCancelRecording: () => void;
    handleRestartRecording: () => void;
}

// setting context for recording page
export const mediaContext = React.createContext<MediaContextType>({
    isMuted: false, setIsMuted: () => { }, isCamOff: false, setIsCamOff: () => { },
    isSharing: false, setIsSharing: () => { },
    videoStream: (null), displayStream: (null), setVideoStream: () => { }, setDisplayStream: () => { }, videoRef: { current: null }, displayRef: { current: null }, isRecording: false, setIsRecording: () => { }, handleStartRecording: () => { }, handleStopRecording: () => { }, handleCancelRecording: () => { }, handleRestartRecording: () => { }
})

const Record = () => {

    const [isMuted, setIsMuted] = React.useState(false)
    const [isCamOff, setIsCamOff] = React.useState(false)
    const [isSharing, setIsSharing] = React.useState(false);
    const [isRecording, setIsRecording] = React.useState(false)
    const [videoStream, setVideoStream] = React.useState<MediaStream | null>(null)
    const [displayStream, setDisplayStream] = React.useState<MediaStream | null>(null)
    const videoRef = React.useRef<HTMLVideoElement | null>(null);
    const displayRef = React.useRef<HTMLVideoElement | null>(null);
    const [countdown, setCountdown] = React.useState<number | null>(null);
    const [timer, setTimer] = React.useState(0);
    const [mediaRecorder, setMediaRecorder] = React.useState<MediaRecorder | null>(null);
    const recordedChunksRef = React.useRef<Blob[]>([]);
    const [_, setRecordedChunks] = React.useState<Blob[]>([]);
    const [showConfetti, setShowConfetti] = React.useState(false);
    const [shouldSaveClip, setShouldSaveClip] = React.useState(true);
    const isCancelingRef = React.useRef(false);

    const addClip = useClipsStore((state: any) => state.addClip);
    const clips = useClipsStore((state) => state.clips);
    const initStream = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: true,
        });
        setVideoStream(stream)
        // const videoTrack = stream.getVideoTracks()[0];
        // stream.addTrack(videoTrack);
    }

    React.useEffect(() => {
        if (!videoStream) {
            initStream();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // When starting recording, trigger countdown
    const handleStartRecording = () => {
        setCountdown(3);
    };

    // Cancel recording without saving clip
    const handleCancelRecording = () => {
        isCancelingRef.current = true;
        setShouldSaveClip(false);
        if (mediaRecorder && mediaRecorder.state !== 'inactive') {
            mediaRecorder.stop();
        }
        setIsRecording(false);
        setTimer(0);
        recordedChunksRef.current = [];
        setRecordedChunks([]);
    };

    // Stop recording and save clip
    const handleStopRecording = () => {
        isCancelingRef.current = false;
        setShouldSaveClip(true);
        if (mediaRecorder && mediaRecorder.state !== 'inactive') {
            mediaRecorder.stop();
        }
        setIsRecording(false);
        setTimer(0);
    };

    // Restart recording (cancel current and start new)
    const handleRestartRecording = () => {
        isCancelingRef.current = true;
        setShouldSaveClip(false);
        if (mediaRecorder && mediaRecorder.state !== 'inactive') {
            mediaRecorder.stop();
        }
        setIsRecording(false);
        // setTimer(0);
        recordedChunksRef.current = [];
        setRecordedChunks([]);
        // Start new recording
        setCountdown(3);
    };

    React.useEffect(() => {
        if (countdown && countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
            return () => clearTimeout(timer);
        } else if (countdown === 0) {
            setCountdown(null);
            setIsRecording(true);
            setShouldSaveClip(true); // Reset flag for new recording
            isCancelingRef.current = false; // Reset cancel flag for new recording
            if (videoStream) {
                const recorder = new MediaRecorder(videoStream);
                setMediaRecorder(recorder);
                recordedChunksRef.current = [];
                setRecordedChunks([]);
                recorder.ondataavailable = (e) => {
                    if (e.data.size > 0) {
                        recordedChunksRef.current.push(e.data);
                        setRecordedChunks([...recordedChunksRef.current]);
                    }
                };
                recorder.onstop = () => {
                    if (recordedChunksRef.current.length > 0 && shouldSaveClip && !isCancelingRef.current) {
                        const blob = new Blob(recordedChunksRef.current, { type: 'video/webm' });
                        addClip({
                            id: Date.now().toString(),
                            url: URL.createObjectURL(blob),
                            createdAt: Date.now(),
                        });
                        setShowConfetti(true);
                        setTimeout(() => setShowConfetti(false), 2000);
                        recordedChunksRef.current = [];
                        setRecordedChunks([]);
                    }
                };
                recorder.start();
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [countdown]);

    React.useEffect(() => {
        let interval: NodeJS.Timeout | null = null;
        let startTimeout: NodeJS.Timeout | null = null;
        if (isRecording) {
            setTimer(0); // Reset timer at start
            startTimeout = setTimeout(() => {
                interval = setInterval(() => {
                    setTimer(prev => prev + 1);
                }, 1000);
            }, 3000);
        }
        return () => {
            if (interval) clearInterval(interval);
            if (startTimeout) clearTimeout(startTimeout);
        };
    }, [isRecording]);

    React.useEffect(() => {
        if (!isRecording && mediaRecorder && mediaRecorder.state !== 'inactive') {
            mediaRecorder.stop();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isRecording]);

    const formatTime = (seconds: number) => {
        const m = String(Math.floor(seconds / 60)).padStart(2, '0');
        const s = String(seconds % 60).padStart(2, '0');
        return (
            <span className="flex flex-row justify-center items-center">
                <p>{m}</p>
                <p className="mb-[3px] flex items-center justify-center">:</p>
                <p>{s}</p>
            </span>
        );
    };

    return (
        <mediaContext.Provider value={{ isMuted, setIsMuted, isCamOff, setIsCamOff, isSharing, setIsSharing, videoStream, setVideoStream, videoRef, displayRef, displayStream, setDisplayStream, isRecording, setIsRecording, handleStartRecording, handleStopRecording, handleCancelRecording, handleRestartRecording }}>
            {countdown !== null && countdown > 0 && <CustomOverlay count={countdown} />}
            <Tabs defaultValue="record" className='gap-0'>

                <div className='flex flex-col justify-between items-center bg-[#1f2023] text-white'>

                    <TabsContent value="record" className='flex flex-col justify-center items-center gap-1'>
                        <RecordBanner />
                    </TabsContent>

                    <TabsContent value="select">
                        <SelectBanner />
                    </TabsContent>

                    <TabsContent value="upload" className='flex flex-col justify-center items-center gap-2'>
                        <UploadBanner />
                    </TabsContent>

                    {!isRecording ?
                        <TabsList className='z-10 bg-[#2c2e32]/80 absolute bottom-40 select-none'>
                            <TabsTrigger value="record">Record</TabsTrigger>
                            <TabsTrigger value="select">Select</TabsTrigger>
                            <TabsTrigger value="upload">Upload</TabsTrigger>
                        </TabsList>
                        :
                        <div className='z-10 font-semibold px-3 py-1 rounded-full bg-[#2c2e32]/80 absolute bottom-[9.5rem] select-none'>
                            {formatTime(timer)}
                        </div>
                    }
                </div>

                <div className='flex flex-row justify-center items-center bg-[#303236] p-4 h-[9.5vh] rounded-b-4xl shadow-b shadow-xl z-10'>
                    <TabsContent value="record" className='flex flex-row justify-between items-center'>
                        <div></div>
                        <RecordButtons />
                        <Preview />
                    </TabsContent>
                    <TabsContent value="select" className='flex flex-row justify-center items-center'>
                        <Search />
                    </TabsContent>
                </div>

            </Tabs>

            <NewClipsFooter />
            {/* <Confetti trigger={showConfetti} /> */}
        </mediaContext.Provider>
    )
}

export default Record
