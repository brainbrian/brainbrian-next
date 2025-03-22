import * as React from 'react';

interface PanelProps {
    children?: React.ReactNode;
    videoUrl?: string;
}

export const Panel: React.FC<PanelProps> = ({ children, videoUrl }) => (
    <section className="relative w-full overflow-hidden text-[var(--color-light)] m-0 min-h-[calc(100vh-14rem)] [text-shadow:1px_1px_2px_rgba(0,0,0,0.5)] aspect-[1/2] xxs:aspect-[1/1] xs:aspect-[16/9] xl:aspect-[16/6] xxl:aspect-[16/5] md:p-16 xs:max-h-[calc(100vh-200px)] [&_h1]:text-[var(--color-light)] [&_h1]:text-[2.6rem] [&_h1]:m-0 md:[&_h1]:text-[4rem] [&_h2]:text-[var(--color-light)] [&_h2]:text-[2rem] [&_h2]:font-medium [&_h2]:m-0 md:[&_h2]:text-[3rem] [&_p]:text-[1.4rem] md:[&_p]:text-[2rem] [&_p_a]:bg-[var(--color-main)] [&_p_a]:text-[var(--color-light)] [&_p_a]:leading-[1.8] [&_p_a]:py-[0.15rem] [&_p_a]:px-[0.3rem] md:[&_p_a]:py-[0.25rem] md:[&_p_a]:px-[0.4rem] [&_p_a]:no-underline [&_p_a]:transition-[background-color_200ms_ease-in-out,color_300ms_ease-in-out] [&_p_a:hover]:bg-[var(--color-light)] [&_p_a:hover]:text-[var(--color-main)] [&_p_a:focus-visible]:bg-[var(--color-light)] [&_p_a:focus-visible]:text-[var(--color-main)]">
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
