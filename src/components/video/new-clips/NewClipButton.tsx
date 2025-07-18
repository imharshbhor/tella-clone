import React from 'react'
import { mediaContext } from '@/app/video/record/page'

const NewClipButton = () => {
    const { isRecording } = React.useContext(mediaContext);

    return (
        <div
            className={
                `group rounded-t-xl outline-none h-15 p-1 border-b-2 border-primary bg-primary/10 shadow-active-clip mx-1 mr-2
                ${isRecording ? 'cursor-not-allowed opacity-60 pointer-events-none' : 'cursor-pointer active:text-slate-400'}`
            }
            tabIndex={isRecording ? -1 : 0}
            aria-disabled={isRecording}
        >
            <div className="flex relative items-center px-2 h-10 bg-white rounded-lg w-36.5 border-dashed border-2 shadow-primary/20 shadow-md border-primary/50 py-1.75">
                <div className="flex flex-shrink-0 justify-center items-center rounded-sm w-11.5 h-6.5">
                    <span>
                        <svg aria-hidden="false" aria-label="" className="" height="32" width="46" fill="none" viewBox="0 0 46 32" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_243_4518)">
                                <path d="M24 12H38V20H24z" fill="url(#paint0_linear_243_4518)"></path>
                                <path d="M24 12H38V20H24z" fill="url(#paint1_linear_243_4518)"></path>
                                <path clipRule="evenodd" d="M9.18 26A2.18 2.18 0 017 23.82V8.18A2.18 2.18 0 019.18 6h27.64A2.18 2.18 0 0139 8.18v15.64A2.18 2.18 0 0136.82 26H9.18z" stroke="#B1AAFC" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                                <path d="M7 21h32M7 11h32M23.001 26V6M15.001 26v-5M31 26v-5M31 11V6M15.001 11V6" stroke="#B1AAFC" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                                <path d="M8 12H22V20H8z" fill="url(#paint2_linear_243_4518)"></path>
                                <path d="M8 8a1 1 0 011-1h5v3H8V8zM8 22h6v3H9a1 1 0 01-1-1v-2z" fill="#E0DEFE"></path>
                                <path d="M16 7H22V10H16z" fill="#E0DEFE"></path>
                                <path d="M16 22H22V25H16z" fill="#E0DEFE"></path>
                                <path d="M24 7H30V10H24z" fill="#E0DEFE"></path>
                                <path d="M24 22H30V25H24z" fill="#E0DEFE"></path>
                                <path d="M32 7h5a1 1 0 011 1v2h-6V7zM32 22h6v2a1 1 0 01-1 1h-5v-3z" fill="#E0DEFE"></path>
                                <path d="M41 1c0-.575-.278-1.067-.605-1.395C40.067-.722 39.575-1 39-1c-.575 0-1.067.278-1.395.605C37.278-.067 37 .425 37 1v4h-4c-.575 0-1.067.278-1.395.605C31.277 5.933 31 6.425 31 7c0 .575.277 1.067.605 1.395.328.327.82.605 1.395.605h4v4c0 .575.278 1.067.605 1.395.328.328.82.605 1.395.605.575 0 1.067-.277 1.395-.605.327-.328.605-.82.605-1.395V9h4c.575 0 1.067-.278 1.395-.605.327-.328.605-.82.605-1.395 0-.575-.278-1.067-.605-1.395C46.067 5.278 45.575 5 45 5h-4V1z" fill="#28B57B" stroke="#fff" strokeWidth="2"></path>
                            </g>
                            <defs>
                                <linearGradient id="paint0_linear_243_4518" gradientUnits="userSpaceOnUse" x1="24" x2="38" y1="16" y2="16">
                                    <stop stopColor="#EDECFE"></stop>
                                    <stop offset="1" stopColor="#D2CEFD"></stop>
                                </linearGradient>
                                <linearGradient id="paint1_linear_243_4518" gradientUnits="userSpaceOnUse" x1="24" x2="38" y1="16" y2="16">
                                    <stop stopColor="#F9F9FF"></stop>
                                    <stop offset="1" stopColor="#E0DEFE"></stop>
                                </linearGradient>
                                <linearGradient id="paint2_linear_243_4518" gradientUnits="userSpaceOnUse" x1="8" x2="22" y1="16" y2="16">
                                    <stop stopColor="#F9F9FF"></stop>
                                    <stop offset="1" stopColor="#E0DEFE"></stop>
                                </linearGradient>
                                <clipPath id="clip0_243_4518">
                                    <path d="M0 0H46V32H0z" fill="#fff"></path>
                                </clipPath>
                            </defs>
                        </svg>
                    </span>
                </div>
                <div className="p-2 text-xs font-medium leading-4 text-slate-900 break-words truncate select-none focus:outline-none overflow-none">
                    New clip
                </div>
            </div>
        </div>
    )
}

export default NewClipButton
