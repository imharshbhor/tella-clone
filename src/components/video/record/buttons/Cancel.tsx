import React from 'react'
import CancelIcon from './icons/cancel/CancelIcon'
import { mediaContext } from '@/app/video/record/page'

const Cancel = () => {
    const { handleCancelRecording } = React.useContext(mediaContext)

    const handleCancel = () => {
        handleCancelRecording()
    }
    return (
        <div className="flex flex-row justify-center w-[8.5vw] h-12 rounded-lg text-xs text-white/70 font-semibold hover:bg-[#45464a]" onClick={handleCancel}>
            <div className='flex w-full justify-center select-none'>
                <div className='flex flex-col space-x-0.5 justify-center items-center'>
                    <><CancelIcon /><span>Cancel</span></>
                </div>
            </div>
        </div>
    )
}

export default Cancel
