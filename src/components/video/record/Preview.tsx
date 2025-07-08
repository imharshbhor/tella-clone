import { Check } from 'lucide-react'
import React from 'react'

const Preview = () => {
  return (
    <div className='bg-primary rounded-full text-white px-3 py-1 flex justify-center items-center gap-2 flex-row shadow-md shadow-primary/30 cursor-pointer'>
        <Check className='w-4 h-4' />
        <p className='text-sm font-medium select-none'>Preview</p>
    </div>
  )
}

export default Preview
