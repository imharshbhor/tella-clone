import React from 'react'
import NewClipButton from './NewClipButton'
import { EmptyClips } from './EmptyClips'

const NewClipsFooter = () => {
    return (
        <div className='flex flex-row pl-4 pt-0.5 justify-between items-center'>
            <NewClipButton/>
            <EmptyClips n={9}/>
        </div>
    )
}

export default NewClipsFooter
