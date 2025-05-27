import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

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
        <article className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl shadow-lg overflow-hidden mb-8 hover:shadow-xl transition-all duration-300 border border-slate-200/50">
            <div
                className={`md:flex ${!isImageLeft ? 'md:flex-row-reverse' : ''}`}
            >
                {/* Image Section */}
                <div className="md:w-1/2 relative h-64 md:h-auto">
                    <Image
                        src={imageUrl}
                        alt={`${title} project screenshot`}
                        fill
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                </div>

                {/* Content Section */}
                <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-center">
                    {/* Company Badge */}
                    {company && (
                        <div className="mb-3">
                            <span className="inline-block bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full uppercase tracking-wide shadow-sm">
                                {company}
                            </span>
                        </div>
                    )}

                    {/* Title */}
                    <h3 className="text-2xl font-bold text-slate-800 mb-3 leading-tight">
                        <Link
                            href={slug}
                            className="text-slate-800 hover:text-[#23a1ff] focus-visible:text-[#23a1ff] focus:outline-none transition-colors duration-200 no-underline"
                        >
                            {title}
                        </Link>
                    </h3>

                    {/* Description */}
                    {excerpt && (
                        <div
                            className="text-slate-600 mb-4 leading-relaxed"
                            dangerouslySetInnerHTML={{
                                __html: excerpt
                                    .replace(
                                        /<a /g,
                                        '<a class="text-emerald-600 hover:text-emerald-700 underline decoration-emerald-300 underline-offset-2" ',
                                    )
                                    .replace(/<p>/g, '<p class="mb-2">'),
                            }}
                        />
                    )}

                    {/* Tags */}
                    {tags.length > 0 && (
                        <div className="mb-6">
                            <div className="flex flex-wrap gap-2">
                                {tags.map((tag, index) => (
                                    <span
                                        key={index}
                                        className="inline-block bg-white/80 text-slate-700 text-[0.625rem] font-medium px-2.5 py-1 rounded-full border border-slate-300/50"
                                        title={tag}
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* CTA Button */}
                    <div>
                        <Link
                            href={slug}
                            className="inline-flex items-center gap-2 bg-[#262626] text-white px-5 py-2.5 rounded-lg hover:bg-[#23a1ff] focus-visible:bg-[#23a1ff] focus:outline-none transition-all duration-200 no-underline font-medium group"
                        >
                            View Project
                            <svg
                                className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-200"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                />
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>
        </article>
    );
};
