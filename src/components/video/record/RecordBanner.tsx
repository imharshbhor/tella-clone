import Image from 'next/image'
import React from 'react'
import { Button } from '../../ui/button'
import { mediaContext } from '@/app/video/record/page'
import PermissionsBanner from '../permissions/PermissionsBanner'

const RecordBanner = () => {

    const { videoStream, displayStream, videoRef, displayRef, isMuted, isCamOff, isSharing, setDisplayStream, setIsSharing } = React.useContext(mediaContext)
    const [devices, setDevices] = React.useState<MediaDeviceInfo[]>([]);
    const [isMirrored, setIsMirrored] = React.useState(false)

    const screenType = displayStream?.getVideoTracks()[0]?.getSettings().deviceId

    React.useEffect(() => {
        if (videoRef?.current && videoStream) {
            videoRef.current.srcObject = videoStream;
            //  console.log("videoStream", videoStream.getVideoTracks())
        }
        if (displayRef?.current && displayStream) {
            displayRef.current.srcObject = displayStream;
            //  console.log("displayStream", displayStream.getVideoTracks())
        }
        // console.log(isCamOff, isSharing)
    })

    React.useEffect(() => {
        const checkDevices = async () => {
            const devices = await navigator.mediaDevices.enumerateDevices();
            setDevices(devices);
        }
        checkDevices()
    }, [videoStream])

    const toggleShare = async () => {
        // if (!displayStream) return;
        try {
            const newDisplayStream = await navigator.mediaDevices.getDisplayMedia({});
            const displayTrack = newDisplayStream.getVideoTracks()[0];
            displayStream?.addTrack(displayTrack);
            if (displayRef?.current && newDisplayStream) {
                displayRef.current.srcObject = newDisplayStream;
            }
            setDisplayStream(newDisplayStream)
            setIsSharing(true);
            displayTrack.onended = () => {
                displayTrack.stop();
                displayStream?.removeTrack(displayTrack);
                setIsSharing(false);
            };
        } catch (err) {
            console.error("Error reacquiring camera:", err);
        }
    };

    if (devices[0]?.label == '') {
        return <PermissionsBanner />
    }
    else if (isMuted && isCamOff && !isSharing) {
        return (
            <div className='flex flex-col justify-center items-center gap-2 h-[82.5vh]'>
                <Image alt="emoji" src='/emoji/see-no-evil.webp' width={20} height={20} />
                <h2 className='text-xl font-medium'>Nothing to record</h2>
                <span className='text-sm text-white/50 font-medium text-center'>Turn on your camera or share <br />
                    your screen to start recording.</span>
                <Button size="sm" className='mt-3' onClick={() => { toggleShare() }}>Share screen</Button>
            </div>
        )
    }
    else if (isCamOff && !isSharing) {
        return (
            <div className='flex flex-col justify-center items-center gap-2 h-[82.5vh]'>
                <Image alt="emoji" src='/emoji/studio-microphone.webp' width={20} height={20} />
                <h2 className='text-xl font-medium'>This isn't a podcast</h2>
                <span className='text-sm text-white/50 font-medium text-center'>You also need to share your screen <br />
                    or turn on your camera to start recording.</span>
                <Button size="sm" className='mt-3' onClick={() => { toggleShare() }}>Share screen</Button>
            </div>
        )
    }
    else if (!isCamOff && !isSharing) {
        return (
            <div className="w-[99vw] h-[80.3vh] m-2 overflow-hidden rounded-lg relative">
                <video
                    ref={videoRef}
                    autoPlay
                    muted
                    playsInline
                    className={`w-full h-full object-cover ${isMirrored ? 'rotate-y-180' : ''}`}
                />
                {/* Mirror button */}
                <div className='w-10 h-10 flex justify-center items-center border border-white/10 rounded-full absolute bottom-3 right-4 bg-[#303236]/50 cursor-pointer' onClick={() => { setIsMirrored(!isMirrored) }}>
                    {isMirrored ?
                        <svg aria-hidden="false" aria-label="Mirror camera" className="stroke-current w-5 h-5" height="20" width="20" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 1V19" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"></path><path d="M8 3H4C2.89543 3 2 3.89543 2 5V16C2 17.1046 2.89543 18 4 18H8" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"></path><path d="M12 3H16C17.1046 3 18 3.89543 18 5V16C18 17.1046 17.1046 18 16 18H12" stroke="currentColor" strokeDasharray="2 3" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                        :
                        <svg aria-hidden="false" aria-label="Mirror camera" className="stroke-current w-5 h-5 scale-x-[-1]" height="20" width="20" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 1V19" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"></path><path d="M8 3H4C2.89543 3 2 3.89543 2 5V16C2 17.1046 2.89543 18 4 18H8" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"></path><path d="M12 3H16C17.1046 3 18 3.89543 18 5V16C18 17.1046 17.1046 18 16 18H12" stroke="currentColor" strokeDasharray="2 3" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                    }

                </div>
            </div>
        )
    }
    else if (isCamOff && isSharing) {
        return (
            <div className={`flex flex-row h-[82.4vh] p-2 gap-2 justify-center rounded-lg`}>
                <div className='rounded-lg'>
                    <video
                        ref={displayRef}
                        autoPlay
                        muted
                        playsInline
                        className={`w-[72vw] rounded-lg ${screenType && screenType.includes('web') ? 'w-[80.3vw]' : ''}`}
                    />
                </div>
            </div>
        )
    }
    else if (!isCamOff && isSharing) {
        return (
            <>
                <div className="flex flex-row h-[81.8vh] p-2 gap-2 justify-between rounded-lg">
                    <div className='rounded-lg'>
                        <video
                            ref={displayRef}
                            autoPlay
                            muted
                            playsInline
                            className={`w-[74vw] rounded-lg ${screenType && screenType.includes('web') ? 'w-[109vw]' : ''}`}
                        />
                    </div>
                    <div className=''>
                        <video
                            ref={videoRef}
                            autoPlay
                            muted
                            playsInline
                            className={`aspect-square max-h-[55vh] rounded-lg object-cover ${isMirrored ? 'rotate-y-180' : ''}`}
                        />
                        <div className='w-10 h-10 flex justify-center items-center border border-white/10 rounded-full absolute top-60 right-4 bg-[#303236]/50 cursor-pointer' onClick={() => { setIsMirrored(!isMirrored) }}>
                            {isMirrored ?
                                <svg aria-hidden="false" aria-label="Mirror camera" className="stroke-current w-5 h-5" height="20" width="20" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 1V19" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"></path><path d="M8 3H4C2.89543 3 2 3.89543 2 5V16C2 17.1046 2.89543 18 4 18H8" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"></path><path d="M12 3H16C17.1046 3 18 3.89543 18 5V16C18 17.1046 17.1046 18 16 18H12" stroke="currentColor" strokeDasharray="2 3" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                                :
                                <svg aria-hidden="false" aria-label="Mirror camera" className="stroke-current w-5 h-5 scale-x-[-1]" height="20" width="20" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10 1V19" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"></path><path d="M8 3H4C2.89543 3 2 3.89543 2 5V16C2 17.1046 2.89543 18 4 18H8" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"></path><path d="M12 3H16C17.1046 3 18 3.89543 18 5V16C18 17.1046 17.1046 18 16 18H12" stroke="currentColor" strokeDasharray="2 3" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                            }
                        </div>
                    </div>
                </div>
            </>)
    }
}

export default RecordBanner
