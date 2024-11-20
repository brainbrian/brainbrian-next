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
            <div className={Styles.Video}>
                <video autoPlay loop playsInline muted>
                    <source src={videoUrl} type="video/mp4" />
                </video>
            </div>
        )}
    </section>
);
