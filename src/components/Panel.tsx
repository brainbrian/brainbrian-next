import * as React from 'react';

interface PanelProps {
    children?: React.ReactNode;
    videoUrl?: string;
}

export const Panel: React.FC<PanelProps> = ({ children, videoUrl }) => (
    <section
        className="relative w-full overflow-hidden text-text m-0 min-h-[calc(100vh-14rem)] [text-shadow:1px_1px_2px_rgba(0,0,0,0.5)] aspect-1/2 xxs:aspect-1/1 xs:aspect-16/9 xl:aspect-16/6 xxl:aspect-[16/5] md:p-16 xs:max-h-[calc(100vh-200px)] [&_h1]:text-text [&_h1]:text-[2.6rem] [&_h1]:leading-[1.1] [&_h1]:m-0 md:[&_h1]:text-[3.2rem] md:[&_h1]:leading-[1.2] lg:[&_h1]:text-[4rem] lg:[&_h1]:leading-[1.3]
    [&_h2]:text-text [&_h2]:text-[2rem] [&_h2]:leading-[1.4] [&_h2]:font-medium [&_h2]:m-0 [&_h2]:mb-6 md:[&_h2]:text-[2.4rem] md:[&_h2]:leading-[1.3] md:[&_h2]:mb-6 lg:[&_h2]:text-[3rem] lg:[&_h2]:leading-[1.3] lg:[&_h2]:mb-8
    [&_p]:text-[1.4rem] [&_p]:leading-[1.4] [&_p]:my-4 md:[&_p]:text-[1.8rem] md:[&_p]:leading-[1.4] lg:[&_p]:text-[2rem] lg:[&_p]:leading-[1.4] md:[&_p]:my-6 [&_p_a]:bg-primary [&_p_a]:text-text [&_p_a]:leading-[1.4] [&_p_a]:py-[0.1em] [&_p_a]:px-[0.3rem] [&_p_a]:inline-block [&_p_a]:no-underline [&_p_a]:transition-[background-color_200ms_ease-in-out,color_300ms_ease-in-out] [&_p_a:hover]:bg-text [&_p_a:hover]:text-primary [&_p_a:focus-visible]:bg-text [&_p_a:focus-visible]:text-primary"
    >
        {children}
        {videoUrl && (
            <div className="absolute w-full h-full top-0 left-0 -z-10">
                <video
                    className="absolute min-w-full min-h-full -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 object-cover w-auto h-auto"
                    autoPlay
                    loop
                    playsInline
                    muted
                >
                    <source src={videoUrl} type="video/mp4" />
                </video>
            </div>
        )}
    </section>
);
