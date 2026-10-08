import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

interface ProjectProps {
    excerpt?: string;
    imageUrl: string;
    slug: string;
    title: string;
    company?: string;
    tags?: string[];
    imagePosition?: 'left' | 'right';
}

export const Project: React.FC<ProjectProps> = ({
    excerpt,
    imageUrl,
    slug,
    title,
    company,
    tags = [],
    imagePosition = 'left',
}) => {
    const isImageLeft = imagePosition === 'left';

    return (
        <article className="card card-interactive group overflow-hidden mb-8 md:mb-10">
            <div
                className={`md:flex ${!isImageLeft ? 'md:flex-row-reverse' : ''}`}
            >
                {/* Image Section */}
                <div className="md:w-1/2 relative h-64 sm:h-72 md:h-auto md:min-h-[22rem] overflow-hidden">
                    <Image
                        src={imageUrl}
                        alt={`${title} project screenshot`}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-black/30" />
                </div>

                {/* Content Section */}
                <div className="md:w-1/2 p-6 sm:p-8 lg:p-10 flex flex-col justify-center">
                    {/* Company Badge */}
                    {company && (
                        <div className="mb-3">
                            <span className="chip chip-accent uppercase tracking-wider">
                                {company}
                            </span>
                        </div>
                    )}

                    {/* Title */}
                    <h3 className="text-2xl md:text-[1.75rem] font-bold tracking-tight text-text mb-3 leading-tight">
                        <Link
                            href={slug}
                            className="text-text hover:text-primary focus-visible:text-primary focus:outline-none transition-colors duration-200 no-underline hover:no-underline"
                        >
                            {title}
                        </Link>
                    </h3>

                    {/* Description */}
                    {excerpt && (
                        <div
                            className="text-[var(--text-muted)] text-[0.975rem] md:text-base mb-5 leading-relaxed [&_p]:text-[inherit] [&_p]:text-[length:inherit] [&_p]:leading-[inherit]"
                            dangerouslySetInnerHTML={{
                                __html: excerpt
                                    .replace(
                                        /<a /g,
                                        '<a class="text-primary underline decoration-primary/40 underline-offset-2 hover:decoration-primary" ',
                                    )
                                    .replace(/<p>/g, '<p class="mb-2">'),
                            }}
                        />
                    )}

                    {/* Tags */}
                    {tags.length > 0 && (
                        <ul
                            className="flex flex-wrap gap-1.5 mb-7 list-none p-0 m-0"
                            aria-label="Technologies"
                        >
                            {tags.map((tag, index) => (
                                <li key={index} className="chip" title={tag}>
                                    {tag}
                                </li>
                            ))}
                        </ul>
                    )}

                    {/* CTA Button */}
                    <div>
                        <Link href={slug} className="btn btn-primary">
                            View Project
                            <ArrowRight
                                className="w-4 h-4"
                                aria-hidden="true"
                            />
                            <span className="sr-only">: {title}</span>
                        </Link>
                    </div>
                </div>
            </div>
        </article>
    );
};
