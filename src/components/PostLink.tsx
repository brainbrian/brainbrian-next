import React from 'react';
import Link from 'next/link';

interface PostLinkProps {
    date: string;
    excerpt?: string;
    href: string;
    title: string;
    tags?: string[];
}

export const PostLink: React.FC<PostLinkProps> = ({
    excerpt,
    date,
    href,
    title,
    tags = [],
}): React.ReactElement<HTMLDivElement> => {
    return (
        <Link href={href} className="block no-underline">
            <article className="bg-[#383838] hover:bg-[#404040] rounded-xl overflow-hidden mb-8 transition-all duration-300 border border-gray-600/50 group cursor-pointer">
                <div className="p-6 md:p-8">
                    {/* Title */}
                    <h2 className="mb-4">
                        <span className="text-white font-bold text-2xl md:text-3xl leading-tight group-hover:text-[#0099ff] transition-colors duration-200">
                            {title}
                        </span>
                    </h2>

                    {/* Excerpt */}
                    {excerpt && (
                        <div className="text-gray-200 leading-relaxed mb-4">
                            <p>{excerpt}</p>
                        </div>
                    )}

                    {/* Tags */}
                    {tags.length > 0 && (
                        <div className="mb-4">
                            <div className="flex flex-wrap gap-2">
                                {tags.map((tag, index) => (
                                    <span
                                        key={index}
                                        className="inline-block bg-gray-600/80 text-gray-200 text-[0.625rem] font-medium px-2.5 py-1 rounded-full border border-gray-500/50"
                                        title={tag}
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Date */}
                    <div className="text-gray-400 text-sm">{date}</div>
                </div>
            </article>
        </Link>
    );
};
