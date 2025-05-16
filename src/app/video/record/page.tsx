"use client"

import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import RecordBanner from '@/components/video/record/RecordBanner'
import RecordButtons from '@/components/video/record/RecordButtons'
import Search from '@/components/video/select/Search'
import UploadBanner from '@/components/video/upload/UploadBanner'
import PermissionsBanner from '@/components/video/permissions/PermissionsBanner'
import NewClipsFooter from '@/components/video/new-clips/NewClipsFooter'

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
}

// setting context for recording page
export const mediaContext = React.createContext<MediaContextType>({
    isMuted: false, setIsMuted: () => { }, isCamOff: false, setIsCamOff: () => { },
    isSharing: false, setIsSharing: () => { },
    videoStream: (null), displayStream: (null), setVideoStream: () => { }, setDisplayStream: () => { }, videoRef: { current: null }, displayRef: { current: null }
})

const Record = () => {

    const [isMuted, setIsMuted] = React.useState(false)
    const [isCamOff, setIsCamOff] = React.useState(false)
    const [isSharing, setIsSharing] = React.useState(false);
    const [videoStream, setVideoStream] = React.useState<MediaStream | null>(null)
    const [displayStream, setDisplayStream] = React.useState<MediaStream | null>(null)
    const videoRef = React.useRef<HTMLVideoElement | null>(null);
    const displayRef = React.useRef<HTMLVideoElement | null>(null);

    const initStream = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: true,
        });
        setVideoStream(stream)
        const videoTrack = stream.getVideoTracks()[0];
        stream.addTrack(videoTrack);
    }

    React.useEffect(() => {
        initStream()
    }, []);

    return (
        <mediaContext.Provider value={{ isMuted, setIsMuted, isCamOff, setIsCamOff, isSharing, setIsSharing, videoStream, setVideoStream, videoRef, displayRef, displayStream, setDisplayStream }}>
            <Tabs defaultValue="record" className='gap-0'>

                <div className='flex flex-col justify-between items-center bg-[#1f2023] text-white p-6 h-[82.5vh]'>
                    <div className='h-10'></div>

                    <TabsContent value="record" className='flex flex-col justify-center items-center gap-1'>
                        <RecordBanner />
                    </TabsContent>

                    <TabsContent value="upload" className='flex flex-col justify-center items-center gap-2'>
                        <UploadBanner />
                    </TabsContent>

                    <TabsList className='z-10 absolute bottom-40 select-none'>
                        <TabsTrigger value="record">Record</TabsTrigger>
                        <TabsTrigger value="select">Select</TabsTrigger>
                        <TabsTrigger value="upload">Upload</TabsTrigger>
                    </TabsList>
                </div>

                <div className='flex flex-row justify-center items-center bg-[#303236] p-4 h-[9.5vh] rounded-b-4xl shadow-b shadow-xl z-10'>
                    <TabsContent value="record" className='flex flex-row justify-center items-center'>
                        <RecordButtons />
                    </TabsContent>
                    <TabsContent value="select" className='flex flex-row justify-center items-center'>
                        <Search />
                    </TabsContent>
                </div>

            </Tabs>

            <NewClipsFooter />
        </mediaContext.Provider>
    )
}

export default Record
