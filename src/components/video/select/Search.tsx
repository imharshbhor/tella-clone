import { SearchIcon } from 'lucide-react'
import React from 'react'

const Search = () => {

    const [isFocused, setIsFocused] = React.useState(false)

    return (
        <div className="relative w-[32.8vw] text-white">

            <div className={`absolute inset-y-0 left-[7.2vw] flex items-center pointer-events-none transition-opacity duration-150 ${!isFocused ? 'opacity-100' : 'opacity-0'}`}>
                <SearchIcon size={16} strokeWidth={2} className="text-white mb-0.4 mr-2" />
                <span className='font-medium text-white/80 mt-0.3'>Search videos and clips to reuse...</span>
            </div>

            <input
                type="text"
                className="w-full h-9 pl-6 font-medium rounded-4xl focus:ring-primary focus:outline-1 outline-primary bg-[#1f2023] text-white/80"
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
            />
        </div>
    )
}

export default Search
