import { mediaContext } from '@/app/video/record/page'
import React from 'react'

const Record = (props: { isRecording: boolean, setIsRecording: (isRecording: boolean) => void }) => {

    const { isCamOff, isSharing, handleStartRecording, handleStopRecording, isRecording } = React.useContext(mediaContext)

    const handleRecord = () => {
        if (isCamOff && !isSharing) return
        if (props.isRecording) {
            handleStopRecording()
        } else {
            handleStartRecording()
            props.setIsRecording(true)
        }
    }

    if (!isRecording) {
        return (
            <div
                className={`shadow-lg w-12 h-12 rounded-full flex items-center justify-center border-[#943e38] border-4 duration-300 transition ${(!isCamOff || isSharing) ? 'hover:border-red-700' : ''}`}
                style={{
                    boxShadow: '0px 0px 10px #943e38'
                }}
                onClick={handleRecord}>
                <div className={` ${!isCamOff || isSharing ? 'bg-red-700' : 'bg-[#943e38]'} transition duration-500 group-enabled:hover:!bg-red-700 w-8 h-8 rounded-full`}></div>
            </div>
        )
    }
    return (
        <div
            className="shadow-lg w-12 h-12 rounded-full flex items-center justify-center border-[#943e38] border-4 duration-300 transition hover:border-red-700"
            style={{
                boxShadow: '0px 0px 10px #943e38'
            }}
            onClick={handleRecord}
        >
            <div
                className="bg-[#943e38] w-4 h-4 rounded-[4px] duration-400 transition hover:bg-red-700"
            ></div>
        </div>
    )
}

export default Record
