"use client"

import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import RecordBanner from '@/components/video/record/RecordBanner'
import RecordButtons from '@/components/video/record/RecordButtons'
import Search from '@/components/video/select/Search'
import UploadBanner from '@/components/video/upload/UploadBanner'

interface RecordingContextType {
    isMuted: boolean;
    setIsMuted: React.Dispatch<React.SetStateAction<boolean>>;
    isCamOn: boolean;
    setIsCamOn: React.Dispatch<React.SetStateAction<boolean>>;
}

export const recordingContext = React.createContext<RecordingContextType>({ isMuted: true, setIsMuted: () => { }, isCamOn: true, setIsCamOn: () => { } })

const Record = () => {

    const [isMuted, setIsMuted] = React.useState(true)
    const [isCamOn, setIsCamOn] = React.useState(true)

    return (
        <recordingContext.Provider value={{ isMuted, setIsMuted, isCamOn, setIsCamOn }}>
            <Tabs defaultValue="record" className='gap-0'>

                <div className='flex flex-col justify-between items-center bg-[#1f2023] text-white p-6 h-[82.5vh]'>
                    <div className='h-10'></div>

                    <TabsContent value="record" className='flex flex-col justify-center items-center gap-1'>
                        <RecordBanner isMuted={isMuted} />
                    </TabsContent>
                    <TabsContent value="upload" className='flex flex-col justify-center items-center gap-2'>
                        <UploadBanner />
                    </TabsContent>


                    <TabsList>
                        <TabsTrigger value="record">Record</TabsTrigger>
                        <TabsTrigger value="select">Select</TabsTrigger>
                        <TabsTrigger value="upload">Upload</TabsTrigger>
                    </TabsList>
                </div>

                <div className='flex flex-row justify-center items-center bg-[#303236] p-4 h-[9.5vh] rounded-b-4xl'>
                    <TabsContent value="record" className='flex flex-row justify-center items-center gap-4'>
                        <RecordButtons />
                    </TabsContent>
                    <TabsContent value="select" className='flex flex-row justify-center items-center'>
                        <Search />
                    </TabsContent>
                </div>

            </Tabs>

            <div>

            </div>
        </recordingContext.Provider>
    )
}

export default Record
