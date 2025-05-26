'use client';

import React, { useEffect, useState, useCallback } from 'react';

interface VoiceConfig {
    name: string;
    rate?: number;
    pitch?: number;
}

interface SpeechConfig {
    preferredVoices: VoiceConfig[];
    defaultRate?: number;
    defaultPitch?: number;
}

interface SpeakableTextProps {
    text: string;
    className?: string;
    speechConfig?: SpeechConfig;
    tabIndex?: number;
    ariaLabel?: string;
    showFocusOutline?: boolean;
}

// Default configuration
const defaultSpeechConfig: SpeechConfig = {
    preferredVoices: [
        { name: 'Aaron', rate: 0.6, pitch: 0.6 },
        { name: 'Fred', rate: 0.9, pitch: 0.7 },
        { name: 'Reed', rate: 0.7, pitch: 0.6 },
        { name: 'Zarvox', rate: 0.75, pitch: 0.62 },
    ],
    defaultRate: 0.85,
    defaultPitch: 0.4,
};

export const SpeakableText: React.FC<SpeakableTextProps> = ({
    text,
    className = '',
    speechConfig = defaultSpeechConfig,
    tabIndex = 0,
    ariaLabel,
    showFocusOutline = true,
}) => {
    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
    const [voiceConfigs, setVoiceConfigs] = useState<VoiceConfig[]>([]);
    const [lastVoiceName, setLastVoiceName] = useState<string | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
            // Load voices
            const loadVoices = () => {
                const allVoices = window.speechSynthesis.getVoices();

                // Find voices that match our preferred list and store their configs
                const selectedVoices: SpeechSynthesisVoice[] = [];
                const matchedConfigs: VoiceConfig[] = [];

                speechConfig.preferredVoices.forEach((voiceConfig) => {
                    const matchedVoice = allVoices.find(
                        (voice) =>
                            voice.name.includes(voiceConfig.name) &&
                            voice.lang === 'en-US',
                    );
                    if (matchedVoice) {
                        selectedVoices.push(matchedVoice);
                        matchedConfigs.push(voiceConfig);
                    }
                });

                if (selectedVoices.length > 0) {
                    setVoices(selectedVoices);
                    setVoiceConfigs(matchedConfigs);
                } else {
                    // Final fallback to any en-US voices with default config
                    const englishVoices = allVoices.filter(
                        (voice) => voice.lang === 'en-US',
                    );
                    setVoices(englishVoices);
                    // Create default configs for fallback voices
                    const fallbackConfigs = englishVoices.map((voice) => ({
                        name: voice.name,
                        rate: speechConfig.defaultRate,
                        pitch: speechConfig.defaultPitch,
                    }));
                    setVoiceConfigs(fallbackConfigs);
                }
            };

            loadVoices();
            window.speechSynthesis.onvoiceschanged = loadVoices;

            return () => {
                window.speechSynthesis.onvoiceschanged = null;
            };
        }
    }, [speechConfig]);

    const handleClick = useCallback(() => {
        if (
            typeof window !== 'undefined' &&
            'speechSynthesis' in window &&
            voices.length > 0
        ) {
            window.speechSynthesis.cancel();

            const utterance = new SpeechSynthesisUtterance(text);

            // Select a random voice and its corresponding config
            const randomIndex = Math.floor(Math.random() * voices.length);
            const selectedVoice = voices[randomIndex];
            const selectedConfig = voiceConfigs[randomIndex];

            // Use voice-specific settings or defaults
            utterance.rate =
                selectedConfig.rate ?? speechConfig.defaultRate ?? 0.8;
            utterance.pitch =
                selectedConfig.pitch ?? speechConfig.defaultPitch ?? 0.7;
            utterance.volume = 1.0;

            if (selectedVoice) {
                utterance.voice = selectedVoice;
                setLastVoiceName(
                    `${selectedVoice.name} (${selectedVoice.lang}) - Rate: ${utterance.rate}, Pitch: ${utterance.pitch}`,
                );
                window.speechSynthesis.speak(utterance);
            }
        }
    }, [voices, voiceConfigs, text, speechConfig]);

    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleClick();
            }
        },
        [handleClick],
    );

    const focusClasses = showFocusOutline
        ? 'hover:text-primary focus-visible:text-primary'
        : '';

    return (
        <span
            className={`${className} cursor-pointer outline-none ${focusClasses}`}
            onClick={handleClick}
            title={
                lastVoiceName
                    ? `Last voice: ${lastVoiceName}. Click to hear with a random voice`
                    : 'Click to hear with a random voice'
            }
            tabIndex={tabIndex}
            aria-label={
                ariaLabel ||
                `Speakable heading: ${text}. Press Enter or Space to hear this text spoken aloud.`
            }
            role="button"
            onKeyDown={handleKeyDown}
        >
            {text}
        </span>
    );
};
