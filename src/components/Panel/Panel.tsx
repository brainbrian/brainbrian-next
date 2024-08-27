import * as React from 'react';

import Styles from './Panel.module.scss';

interface PanelProps {
    children?: React.ReactNode;
    videoUrl?: string;
}

export const Panel: React.FC<PanelProps> = ({ children, videoUrl }) => (
    <section className={Styles.Panel}>
        {children}
        {videoUrl && (
            <video autoPlay loop playsInline muted className={Styles.Video}>
                <source src={videoUrl} type="video/mp4" />
            </video>
        )}
    </section>
);
