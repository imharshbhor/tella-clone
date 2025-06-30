import Image from 'next/image'
import React from 'react'
import { Button } from '../../ui/button'
import { Check, X } from 'lucide-react'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { mediaContext } from '@/app/video/record/page'

const PermissionsBanner = () => {

    const { setVideoStream, setDisplayStream } = React.useContext(mediaContext)

    const askForPermissions = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: true,
                video: true,
            });
            setVideoStream(stream)
            const videoTrack = stream.getVideoTracks()[0];
            stream.addTrack(videoTrack);
        } catch (err) {
            //  console.log("Error accessing media devices:", err);
        }
    };
    React.useEffect(() => {
        askForPermissions()
    })

    return (
        <div className='flex flex-col justify-center items-center gap-2 h-[82.5vh]'>
            <Image alt="emoji" src='/emoji/unlock.webp' width={32} height={32} />
            <h2 className='text-xl mt-2 font-medium'>Permission to record</h2>
            <span className='text-sm text-white/50 font-medium text-center'>We need access to your camera and microphone.</span>
            <Dialog>
                <DialogTrigger asChild>
                    <Button size="sm" className='mt-3 flex justify-center items-center gap-2'><Check size={16} />Enable camera & microphone</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader className='space-y-1'>
                        <DialogTitle className='text-md'>Cam & mic permissions</DialogTitle>
                        <DialogDescription className='mb-2 text-[#48566a] font-medium'>
                            Tella needs permission to use your camera and microphone.
                        </DialogDescription>
                        <div className='flex flex-row justify-between gap-2'>
                            <DialogClose asChild>
                                <Button className='w-[12.8vw] flex flex-row justify-center gap-2' type="button" variant="outline">
                                    <X size={16} className='mt-0.4 text-muted-foreground/50' /> Don't allow
                                </Button>
                            </DialogClose>
                            <Button className='w-[12.8vw] flex flex-row justify-center gap-2' type="button" variant="default" onClick={askForPermissions}>
                                <Check size={16} className='mt-0.4 text-white/70' /> Allow
                            </Button>
                        </div>
                    </DialogHeader>
                    <DialogFooter className="flex flex-row w-[16.5vw] justify-center">
                        <DialogClose asChild>
                            <Button type="button" variant="ghost">
                                Skip for now
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default PermissionsBanner
