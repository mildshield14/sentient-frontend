import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import happy from '../images/happy.png';
import angry from '../images/angry.png';
import sad from '../images/sad.png';
import neutral from '../images/neutral.png';
import confusion from '../images/confusion.png';

type Emotion = 'happy' | 'sad' | 'angry' | 'neutral' | 'confusion';

interface EmojiProps {
    emotion: Emotion;
}

const emojiMap: Record<Emotion, string> = {
    happy: happy,
    sad: sad,
    angry: angry,
    confusion: confusion,
    neutral: neutral
};

const Emoji: React.FC<EmojiProps> = ({ emotion }) => {
    // @ts-ignore
    return (
        <div style={{ width: '100px', height: '100px', position: 'relative' }}>
            <AnimatePresence mode="wait">
                <motion.img
                    key={emotion}
                    src={emojiMap[emotion]}
                    alt={`${emotion} icon`}
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    transition={{ duration: 0.3 }}
                    style={{
                        width: '35px',
                        height: '35px',
                        objectFit: 'contain',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                    }}
                />
            </AnimatePresence>
        </div>
    );
};

export default Emoji;