import React, { useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';

const Confetti = ({ trigger }: { trigger: boolean }) => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (trigger && ref.current) {
            const rect = ref.current.getBoundingClientRect();
            confetti({
                particleCount: 80,
                spread: 70,
                origin: {
                    x: (rect.left + rect.width / 2) / window.innerWidth,
                    y: (rect.top + rect.height / 2) / window.innerHeight,
                }
            });
        }
    }, [trigger]);

    return <div ref={ref} style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} />;
};

export default Confetti;
