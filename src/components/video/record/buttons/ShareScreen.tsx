import React from 'react'
import ShareScreenIcon from './icons/share-screen/ShareScreenIcon'
import { mediaContext } from '@/app/video/record/page';
import ShareScreenOff from './icons/share-screen/ShareScreenOff';

const ShareScreen = () => {

    const { isSharing, setIsSharing, displayStream, displayRef, setDisplayStream } = React.useContext(mediaContext)

    const toggleShare = async () => {
        // if (!displayStream) return;

        if (isSharing) {
            displayStream?.getVideoTracks().forEach(track => {
                    console.log("stopping track", track.label)
                    track.stop();
                    displayStream.removeTrack(track);
                    setIsSharing(false);
            });
        } else {
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
                    console.log("track ended", displayTrack.label)
                    displayTrack.stop();
                    displayStream?.removeTrack(displayTrack);
                    setIsSharing(false);
                };
            } catch (err) {
                console.error("Error reacquiring camera:", err);
            }
        }
    };

    return (
        <div className={`flex flex-row justify-center w-[8.5vw] h-12 rounded-lg text-xs text-white/70 font-semibold hover:bg-[#45464a] ${isSharing && 'bg-primary/30 hover:bg-primary/40'}`}>
            <div className='flex w-full justify-center select-none' onClick={() => { toggleShare() }}>
                <div className='flex flex-col space-x-0.5 justify-center items-center'>
                    {isSharing ? <><ShareScreenOff /><span>Stop screen</span></> : <><ShareScreenIcon /><span>Share screen</span></>}
                </div>
            </div>
        </div>
    )
}

export default ShareScreen
