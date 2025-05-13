import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronUp, Mic, MicOff } from 'lucide-react'
import { DropdownMenuLabel } from '@radix-ui/react-dropdown-menu';
import { recordingContext } from '@/app/video/record/page';

const Audio = () => {

    const {isMuted, setIsMuted} = React.useContext(recordingContext)

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
                console.log(micList);
            } catch (error) {
                console.error('Error accessing microphone devices:', error);
            }
        };

        getMicDevices();
    }, []);

    return (
        <div className={`flex flex-row justify-end w-[8vw] rounded-lg text-xs text-white/70 font-semibold ${isMuted ? 'bg-[#61393b] hover:bg-[#543a3b]' : 'hover:bg-[#45464a]'}`}>
            <div className='flex w-full justify-end select-none' onClick={() => { setIsMuted(!isMuted) }}>
                {isMuted ? <div className='pr-2 flex flex-col space-x-0.5 justify-center items-center pt-0.5'><MicOff size={18} color='white' /><span className='pt-0.5'>Unmute</span></div>
                    : <div className='pr-4 flex flex-col space-x-0.5 justify-center items-center pt-0.5'><Mic size={18} color='white' /><span className='pt-0.5'>Mute</span></div>}
            </div>
            <DropdownMenu>
                <DropdownMenuTrigger className={`px-2 h-12 rounded-r-lg  focus:outline-1 outline-primary ${isMuted ? 'hover:bg-[#6f5657]' : 'hover:bg-[#57585c]'}`}><ChevronUp size={16} /></DropdownMenuTrigger>
                <DropdownMenuContent className='max-w-80'>
                    {micDevices ? micDevices.map((device) => (
                        <DropdownMenuRadioGroup key={Math.random()}  value={selectedDevice} onValueChange={setSelectedDevice}>
                            <DropdownMenuRadioItem key={Math.random()} value={device.label}>{device.label.length > 30 ? device.label.slice(0, 30) + "..." : device.label}</DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                    )) : <DropdownMenuLabel>No microphones found</DropdownMenuLabel>}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

export default Audio
