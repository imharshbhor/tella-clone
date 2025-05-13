import React from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronUp, CameraOff, CameraIcon } from 'lucide-react'
import { DropdownMenuLabel } from '@radix-ui/react-dropdown-menu';
import { recordingContext } from '@/app/video/record/page';

const Camera = () => {

    const {isCamOn, setIsCamOn} = React.useContext(recordingContext)

    const [micDevices, setMicDevices] = React.useState<MediaDeviceInfo[]>([]);
    const [selectedDevice, setSelectedDevice] = React.useState(
        micDevices && micDevices.length > 0 ? micDevices[0].label : ''
    );

    React.useEffect(() => {
        const getMicDevices = async () => {
            try {
                const devices = await navigator.mediaDevices.enumerateDevices();
                const micList = devices.filter((device) => device.kind === 'videoinput');
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
        <div className={`flex flex-row justify-end w-[8vw] rounded-lg text-xs text-white/70 font-semibold hover:bg-[#45464a]`}>
            <div className='flex w-full justify-end select-none' onClick={() => { setIsCamOn(!isCamOn) }}>
                {isCamOn ? <div className='flex flex-col space-x-0.5 justify-center items-center pt-0.5'><CameraOff size={18} color='white' /><span className='pt-0.5'>Start camera</span></div>
                    : <div className='flex flex-col space-x-0.5 justify-center items-center pt-0.5'><CameraIcon size={18} color='white' /><span className='pt-0.5'>Stop camera</span></div>}
            </div>
            <DropdownMenu>
                <DropdownMenuTrigger className={`px-2 h-12 rounded-r-lg  focus:outline-1 outline-primary hover:bg-[#57585c]`}><ChevronUp size={16} /></DropdownMenuTrigger>
                <DropdownMenuContent className='max-w-80'>
                    {micDevices ? micDevices.map((device) => (
                        <DropdownMenuRadioGroup key={Math.random()}  value={selectedDevice} onValueChange={setSelectedDevice}>
                            <DropdownMenuRadioItem key={Math.random()} value={device.label}>{device.label.length > 30 ? device.label.slice(0, 30) + "..." : device.label}</DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                    )) : <DropdownMenuLabel>No cam found</DropdownMenuLabel>}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

export default Camera
