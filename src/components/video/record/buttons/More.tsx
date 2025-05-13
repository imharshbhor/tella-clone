import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { DropdownMenuGroup } from '@radix-ui/react-dropdown-menu'
import { CircleHelp, Ellipsis, File } from 'lucide-react'
import React from 'react'

const More = () => {

    return (
        <div className={`flex flex-row justify-center w-[8vw] h-12 rounded-lg text-xs text-white/70 font-semibold hover:bg-[#45464a]`}>
            <DropdownMenu>
                <div className='flex w-full justify-center select-none focus:none'>
                    <DropdownMenuTrigger className='flex flex-col space-x-0.5 justify-center items-center pb-0.5'>
                        <Ellipsis size={25} color='white' /><span className=''>More</span>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                <File />
                                <span>Show speaker notes</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <CircleHelp />
                                <span>Support</span>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </div>
            </DropdownMenu>
        </div>
    )
}

export default More
