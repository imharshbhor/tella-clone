import React from 'react';

const icons = [
    '😎', // 3
    '🏁', // 2
    '🚀', // 1
];

const messages = [
    'You look great today',
    'Get ready...',
    'Ok here we go!',
];

const CustomOverlay = ({ count }: { count: number }) => {
    if (count < 1 || count > 3) return null;
    const index = 3 - count;
    return (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/10 bg-opacity-60 z-50 select-none">
            <span className="text-8xl font-bold text-white mb-2.5">{count}</span>
            <span className="text-lg text-black font-medium rounded-sm bg-white py-1.5 px-2">{icons[index]} {messages[index]}</span>
        </div>
    );
};

export default CustomOverlay;
