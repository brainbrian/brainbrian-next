import React from 'react';
import Link from 'next/link';

interface ProjectProps {
    excerpt?: string;
    imageUrl: string;
    slug: string;
    title: string;
}

export const Project: React.FC<ProjectProps> = ({
    excerpt,
    imageUrl,
    slug,
    title,
}) => (
    <article className="mb-8">
        <Link
            href={slug}
            className="flex flex-col-reverse bg-background relative transition-colors duration-200 hover:bg-primary hover:no-underline focus-visible:bg-primary focus-visible:no-underline group"
        >
            {}
            {imageUrl && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                    src={imageUrl}
                    alt={`${title} Sample`}
                    className="w-full"
                />
            )}
            <div className="relative">
                <h2 className="text-xl font-medium m-0 p-4 uppercase sm:text-2xl sm:translate-x-8 transition-all duration-500 group-hover:text-text sm:group-hover:translate-x-12 group-focus-visible:text-text sm:group-focus-visible:translate-x-12">
                    {title}
                </h2>
                <span className="hidden sm:block absolute bottom-8 left-4 h-0.5 w-4 bg-primary transition-all duration-500 group-hover:bg-text group-hover:w-8 group-focus-visible:bg-text group-focus-visible:w-8"></span>
            </div>
        </Link>
        {excerpt && (
            <div
                className="mt-4 mx-auto max-w-[56rem] px-4 text-lg"
                dangerouslySetInnerHTML={{
                    __html: excerpt
                        .replace(
                            /<a /g,
                            '<a class="bg-primary text-text py-1 px-1.5 no-underline leading-loose hover:bg-text hover:text-primary focus-visible:bg-text focus-visible:text-primary" ',
                        )
                        .replace(/<p>/g, '<p class="m-0 break-words">'),
                }}
            />
        )}
    </article>
);
