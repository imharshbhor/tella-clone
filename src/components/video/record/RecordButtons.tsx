import React from 'react'
import Audio from './buttons/Audio'
import Camera from './buttons/Camera'
import Record from './buttons/Record'
import ShareScreen from './buttons/ShareScreen'
import More from './buttons/More'
import Cancel from './buttons/Cancel'
import Restart from './buttons/Restart'
import { mediaContext } from '@/app/video/record/page'

const RecordButtons = () => {

    const { isRecording, setIsRecording, handleStartRecording } = React.useContext(mediaContext)

    return (
        <section className='flex flex-row items-center justify-center space-x-3 ml-2'>
            {!isRecording ?
                <>
                    <Audio />
                    <Camera />
                    <div className='px-4'><Record isRecording={isRecording} setIsRecording={setIsRecording} /></div>
                    <ShareScreen />
                    <More />
                </>
                : <div className='flex flex-row justify-center mr-2'>
                    <Cancel />
                    <div className='px-4'><Record isRecording={isRecording} setIsRecording={setIsRecording} /></div>
                    <Restart />
                </div>
            }
        </section>
    )
}

export default RecordButtons
