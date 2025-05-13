import { CameraOff, Presentation } from 'lucide-react'
import React from 'react'

const ShareScreen = () => {

    return (
        <div className={`flex flex-row justify-center w-[8vw] h-12 rounded-lg text-xs text-white/70 font-semibold hover:bg-[#45464a]`}>
            <div className='flex w-full justify-center select-none'>
                <div className='flex flex-col space-x-0.5 justify-center items-center pt-0.5'><Presentation size={18} color='white' /><span className='pt-0.5'>Share screen</span></div>
            </div>
        </div>
    )
}

export default ShareScreen
