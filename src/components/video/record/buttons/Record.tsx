import { recordingContext } from '@/app/video/record/page'
import React from 'react'

const Record = () => {

    const {isCamOn} = React.useContext(recordingContext)

    return (
        <div className="shadow-lg w-12 h-12 rounded-full flex items-center justify-center border-[#943e38]  border-4 duration-300 transition">
            <div className={` ${!isCamOn? 'bg-red-700' : 'bg-[#943e38]'} transition duration-500 group-enabled:hover:!bg-red-700 w-8 h-8 rounded-full`}></div>
        </div>
    )
}

export default Record
