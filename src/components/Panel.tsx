import * as React from 'react';

interface PanelProps {
    children?: React.ReactNode;
    videoUrl?: string;
}

export const Panel: React.FC<PanelProps> = ({ children, videoUrl }) => (
    <section className="panel-container relative w-full overflow-hidden m-0 text-white flex items-center justify-center">
        {/* Content Container */}
        <div className="relative z-1 w-full max-w-7xl mx-auto px-4 py-8 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20">
            <div className="panel-text-shadow space-y-4 md:space-y-6 lg:space-y-8">
                <div className="panel-content">{children}</div>
            </div>
        </div>

        {/* Video Background */}
        {videoUrl && (
            <div className="absolute inset-0 w-full h-full -z-1 overflow-hidden [mask-image:linear-gradient(to_bottom,black_75%,transparent)]">
                <video
                    className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto -translate-x-1/2 -translate-y-1/2 object-cover panel-video-filter"
                    autoPlay
                    loop
                    playsInline
                    muted
                    preload="metadata"
                >
                    <source src={videoUrl} type="video/mp4" />
                </video>
                {/* Brand glow + gradient overlay for readability and a soft fade into the page */}
                <div className="panel-glow absolute inset-0"></div>
            </div>
        )}
    </section>
);
