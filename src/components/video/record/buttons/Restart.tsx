import React from 'react'
import RestartIcon from './icons/restart/RestartIcon'
import { mediaContext } from '@/app/video/record/page'

const Restart = () => {
    const { setIsRecording } = React.useContext(mediaContext)
    const handleCancel = () => {
        setIsRecording(false)
    }
    return (
        <div className="flex flex-row justify-center w-[8.5vw] h-12 rounded-lg text-xs text-white/70 font-semibold hover:bg-[#45464a]" onClick={handleCancel}>
            <div className='flex w-full justify-center select-none'>
                <div className='flex flex-col space-x-0.5 justify-center items-center'>
                    <><RestartIcon /><span>Restart</span></>
                </div>
            </div>
        </div>
    )
}

export default Restart
