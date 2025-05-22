'use client';

import React, { useEffect, useState } from 'react';

interface SpeakableHeadingProps {
    text: string;
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    className?: string;
}

export const SpeakableHeading: React.FC<SpeakableHeadingProps> = ({
    text,
    as: Component = 'h1',
    className = '',
}) => {
    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
    const [lastVoiceName, setLastVoiceName] = useState<string | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
            // Load voices
            const loadVoices = () => {
                const allVoices = window.speechSynthesis.getVoices();
                // Filter for English voices only and exclude likely female voices
                const englishMaleVoices = allVoices.filter(
                    (voice) =>
                        voice.lang.startsWith('en') &&
                        // Exclude voices that have female indicators
                        !voice.name.includes('Female') &&
                        !voice.name.includes('Woman') &&
                        !voice.name.includes('Girl') &&
                        !/\b(Samantha|Karen|Susan|Victoria|Allison|Ava|Siri|Zira|Kathy|Veena|Moira|Tessa|Fiona|Lisa)\b/i.test(
                            voice.name,
                        ) &&
                        // Include voices that have male indicators or common male names
                        (voice.name.includes('Male') ||
                            voice.name.includes('Guy') ||
                            voice.name.includes('Man') ||
                            /\b(Alex|Josh|John|Mike|David|Guy|Tom|Nathan|Reed|Daniel|Eric|George|James|Paul)\b/i.test(
                                voice.name,
                            ) ||
                            // If no gender indicators, include it anyway for more variety
                            (!voice.name.includes('Female') &&
                                !voice.name.includes('Woman'))),
                );

                // If no male voices found, fall back to all English voices
                if (englishMaleVoices.length > 0) {
                    setVoices(englishMaleVoices);
                } else {
                    const englishVoices = allVoices.filter((voice) =>
                        voice.lang.startsWith('en'),
                    );
                    setVoices(englishVoices);
                }
            };

            loadVoices();
            window.speechSynthesis.onvoiceschanged = loadVoices;

            return () => {
                window.speechSynthesis.onvoiceschanged = null;
            };
        }
    }, []);

    const handleClick = () => {
        if (
            typeof window !== 'undefined' &&
            'speechSynthesis' in window &&
            voices.length > 0
        ) {
            window.speechSynthesis.cancel();

            const utterance = new SpeechSynthesisUtterance(text);

            // Keep rate consistent with a fixed pitch
            utterance.rate = 0.92; // Consistent rate
            utterance.pitch = 0.85; // Fixed lower pitch for male voices
            utterance.volume = 1.0;

            // Select a random voice from available English voices
            const randomIndex = Math.floor(Math.random() * voices.length);
            const randomVoice = voices[randomIndex];

            if (randomVoice) {
                utterance.voice = randomVoice;
                setLastVoiceName(`${randomVoice.name} (${randomVoice.lang})`);
                window.speechSynthesis.speak(utterance);
            }
        }
    };

    return (
        <Component
            className={className}
            onClick={handleClick}
            style={{ cursor: 'pointer' }}
            title={
                lastVoiceName
                    ? `Last voice: ${lastVoiceName}. Click to hear with a random voice`
                    : 'Click to hear with a random voice'
            }
        >
            {text}
        </Component>
    );
};
