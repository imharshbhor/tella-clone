import React from 'react';

const icons = [
    '🎬', // 3
    '🎥', // 2
    '🔴', // 1
];

const messages = [
    'Get ready...',
    'Almost there...',
    'Recording starts!',
];

const CustomOverlay = ({ count }: { count: number }) => {
    if (count < 1 || count > 3) return null;
    const index = 3 - count;
    return (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-60 z-50 select-none">
            <span className="text-8xl mb-4 animate-pulse">{icons[index]}</span>
            <span className="text-7xl font-bold text-white mb-2">{count}</span>
            <span className="text-2xl text-white font-semibold animate-fadeInUp">{messages[index]}</span>
        </div>
    );
};

export default CustomOverlay;
