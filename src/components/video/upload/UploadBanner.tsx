import Image from 'next/image'
import React from 'react'
import { Button } from '../../ui/button'

const UploadBanner = () => {
    return (
        <div className='flex flex-col justify-center items-center gap-2 h-[82.5vh]'>
            <span className="absolute right-[47.7vw] top-[30.5vh] px-2 text-xs font-semibold text-white rounded-full p-0.75 bg-gradient-to-r from-primary to-purple-500 space-x-0.5">Pro</span>
            <Image alt="emoji" src='/emoji/folder.webp' width={32} height={32} />
            <h2 className='text-xl font-medium'>Upload video</h2>
            <span className='text-sm text-white text-center'>To upload video files you need to upgrade to a paid plan.</span>
            <Button size="sm" className='mt-2'>Upgrade</Button>
        </div>
    )
}

export default UploadBanner
