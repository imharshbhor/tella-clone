import Image from 'next/image'
import React from 'react'
import { Button } from '../../ui/button'

const RecordBanner = (props: { isMuted: boolean }) => {

    if (props.isMuted) {
        return (
            <>
                <Image alt="emoji" src='/emoji/see-no-evil.webp' width={20} height={20} />
                <h2 className='text-xl font-medium'>Nothing to record</h2>
                <span className='text-sm text-white/50 font-medium text-center'>Turn on your camera or share <br />
                    your screen to start recording.</span>
                <Button size="sm" className='mt-3'>Share screen</Button>
            </>
        )
    }
    return (
        <>
            <Image alt="emoji" src='/emoji/studio-microphone.webp' width={20} height={20} />
            <h2 className='text-xl font-medium'>This isn't a podcast</h2>
            <span className='text-sm text-white/50 font-medium text-center'>You also need to share your screen <br />
                or turn on your camera to start recording.</span>
            <Button size="sm" className='mt-3'>Share screen</Button>
        </>
    )
}

export default RecordBanner
