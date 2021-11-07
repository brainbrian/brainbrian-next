import * as React from 'react';

import * as Styles from './Panel.module.scss';

interface PanelProps {
    children?: React.ReactNode;
    videoUrl?: string;
}

export const Panel = ({ children, videoUrl }: PanelProps) => (
    <section className={Styles.Panel}>
        {children}
        {videoUrl && (
            <video autoPlay loop playsInline muted className={Styles.Video}>
                <source src={videoUrl} type="video/mp4" />
            </video>
        )}
    </section>
);
