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
import CameraIcon from './icons/camera/CameraIcon';
import CameraOffIcon from './icons/camera/CameraOffIcon';

const Camera = () => {

    const { isCamOff, setIsCamOff, videoStream, videoRef } = React.useContext(mediaContext)

    const [camDevices, setCamDevices] = React.useState<MediaDeviceInfo[]>([]);
    const [selectedDevice, setSelectedDevice] = React.useState(
        camDevices && camDevices.length > 0 ? camDevices[0].label : ''
    );

    React.useEffect(() => {
        const getCamDevices = async () => {
            try {
                const devices = await navigator.mediaDevices.enumerateDevices();
                const camList = devices.filter((device) => device.kind === 'videoinput');
                setCamDevices(camList);
                setSelectedDevice(camList[0].label)
            } catch (error) {
                console.error('Error accessing microphone devices:', error);
            }
        };

        getCamDevices();
    }, [videoStream]);

    const toggleCamera = async () => {
        if (!videoStream) return;

        if (!isCamOff) {
            videoStream.getVideoTracks().forEach(track => {
                if (!track.label.startsWith("web") && !track.label.startsWith("screen") && !track.label.startsWith("window")) {
                    track.stop();
                    videoStream.removeTrack(track);
                }
            });
        } else {
            try {
                const newCameraStream = await navigator.mediaDevices.getUserMedia({ video: true });
                const videoTrack = newCameraStream.getVideoTracks()[0];
                videoStream.addTrack(videoTrack);
                if (videoRef?.current && newCameraStream) {
                    videoRef.current.srcObject = newCameraStream;
                }
            } catch (err) {
                console.error("Error reacquiring camera:", err);
            }
        }
    };

    return (
        <div className={`flex flex-row justify-end w-[8vw] rounded-lg text-xs text-white/70 font-semibold hover:bg-[#45464a]`}>
            <div className='flex w-[6vw] justify-end mr-7 select-none absolute' onClick={() => { setIsCamOff(!isCamOff); toggleCamera() }}>
                {isCamOff ? <div className='flex flex-col space-x-0.5 justify-center items-center pt-0.5'>
                    <CameraOffIcon />
                    <span className='pt-0.5'>Start camera</span></div>
                    : <div className='flex flex-col space-x-0.5 justify-center items-center pt-0.5'><CameraIcon /><span className='pt-0.5'>Stop camera</span></div>}
            </div>
            <DropdownMenu>
                <DropdownMenuTrigger className={`px-1 h-12 rounded-r-lg  focus:outline-1 outline-primary hover:bg-[#57585c]`}><ChevronUp strokeWidth={3} size={14} /></DropdownMenuTrigger>
                <DropdownMenuContent className='max-w-80'>
                    {camDevices ? camDevices.map((device) => (
                        <DropdownMenuRadioGroup key={device.deviceId} value={selectedDevice} onValueChange={setSelectedDevice}>
                            <DropdownMenuRadioItem key={device.deviceId} value={device.label}>{device.label.length > 30 ? device.label.slice(0, 30) + "..." : device.label || "Enable permissions..."}</DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                    )) : <DropdownMenuLabel>No cam found</DropdownMenuLabel>}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

export default Camera
