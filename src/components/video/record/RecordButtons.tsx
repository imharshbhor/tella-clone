import React from 'react'
import Audio from './buttons/Audio'
import Camera from './buttons/Camera'
import Record from './buttons/Record'
import ShareScreen from './buttons/ShareScreen'
import More from './buttons/More'

const RecordButtons = () => {
  return (
    <section className='flex flex-row items-center justify-center space-x-3 ml-2'>
        <Audio/>
        <Camera/>
        <div className='px-4'><Record/></div>
        <ShareScreen/>
        <More/>
    </section>
  )
}

export default RecordButtons
