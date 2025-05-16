"use client"

import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronUp } from 'lucide-react'
import { DropdownMenuLabel } from '@radix-ui/react-dropdown-menu';
import { mediaContext } from '@/app/video/record/page';
import AudioIcon from './icons/audio/AudioIcon';
import AudioOffIcon from './icons/audio/AudioOffIcon';

const Audio = () => {

    const { isMuted, setIsMuted, videoStream } = React.useContext(mediaContext)

    const [micDevices, setMicDevices] = React.useState<MediaDeviceInfo[]>([]);
    const [selectedDevice, setSelectedDevice] = React.useState(
        micDevices && micDevices.length > 0 ? micDevices[0].label : ''
    );

    React.useEffect(() => {
        const getMicDevices = async () => {
            try {
                const devices = await navigator.mediaDevices.enumerateDevices();
                const micList = devices.filter((device) => device.kind === 'audioinput');
                setMicDevices(micList);
                setSelectedDevice(micList[0].label)
            } catch (error) {
                console.error('Error accessing microphone devices:', error);
            }
        };

        getMicDevices();
    }, [videoStream]);

    const toggleAudio = async () => {
        if (!videoStream) return;

        if (!isMuted) {
            // Mute: stop & remove audio tracks
            videoStream.getAudioTracks().forEach(track => {
                track.stop();
                videoStream.removeTrack(track);
            });
        } else {
            // Unmute: get new audio track and add to existing videoStream
            try {
                const newAudioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
                const audioTrack = newAudioStream.getAudioTracks()[0];
                videoStream.addTrack(audioTrack);
            } catch (err) {
                console.error("Error reacquiring microphone:", err);
            }
        }
    };

    return (
        <div className={`flex flex-row justify-end w-[8vw] rounded-lg text-xs text-white/70 font-semibold ${isMuted ? 'bg-[#61393b] hover:bg-[#543a3b]' : 'hover:bg-[#45464a]'}`}>
            <div className='flex w-[6vw] justify-end mr-7 mt-0.5 select-none absolute' onClick={() => { setIsMuted(!isMuted); toggleAudio() }}>
                {isMuted ? <div className='pr-2 flex flex-col space-x-0.5 justify-center items-center'>
                    <AudioOffIcon />
                    <span className='pt-0.5'>Unmute</span></div>
                    : <div className='pr-4 flex flex-col space-x-0.5 justify-center items-center'>
                        <AudioIcon />
                        <span className='pt-0.5'>Mute</span></div>}
            </div>
            <DropdownMenu>
                <DropdownMenuTrigger className={`px-1 h-12 rounded-r-lg  focus:outline-1 outline-primary ${isMuted ? 'hover:bg-[#6f5657]' : 'hover:bg-[#57585c]'}`}><ChevronUp size={16} /></DropdownMenuTrigger>
                <DropdownMenuContent className='max-w-80'>
                    {micDevices ? micDevices.map((device) => (
                        <DropdownMenuRadioGroup key={device.deviceId} value={selectedDevice} onValueChange={setSelectedDevice}>
                            <DropdownMenuRadioItem key={device.deviceId} value={device.label}>{device.label.length > 30 ? device.label.slice(0, 30) + "..." : device.label || "Enable permissions..."}</DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                    )) : <DropdownMenuLabel>No microphones found</DropdownMenuLabel>}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

export default Audio
