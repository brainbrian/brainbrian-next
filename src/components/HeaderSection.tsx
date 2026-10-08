import cx from 'classnames';
import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface HeaderSectionProps {
    title: string;
    component: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
    href?: string;
    target?: string;
    rel?: string;
    className?: string;
}

/**
 * Section heading with a brand accent bar and gradient hairline.
 * When `href` is provided, the title links to the section and a
 * "View all" pill repeats that link as a visual call-to-action.
 */
export const HeaderSection: React.FC<HeaderSectionProps> = ({
    title,
    component: Component,
    href,
    target,
    rel,
    className,
}) => (
    <div className={cx('mb-6 md:mb-8', className)}>
        <div className="flex items-center justify-between gap-4 pb-4">
            <Component className="flex items-center gap-3 m-0 text-text font-headline font-bold uppercase tracking-wide text-xl sm:text-2xl">
                <span
                    className="block w-1.5 h-6 sm:h-7 rounded-full bg-gradient-to-b from-[#5cc0ff] to-primary shadow-[0_0_12px_rgba(35,161,255,0.6)]"
                    aria-hidden="true"
                />
                {href ? (
                    <Link
                        href={href}
                        target={target}
                        rel={rel}
                        className="text-text no-underline transition-colors duration-200 hover:text-primary hover:no-underline focus-visible:text-primary focus-visible:no-underline"
                    >
                        {title}
                    </Link>
                ) : (
                    title
                )}
            </Component>
            {href && (
                // Duplicate of the title link, hidden from assistive tech and tab order
                <Link
                    href={href}
                    target={target}
                    rel={rel}
                    className="btn btn-ghost btn-sm"
                    aria-hidden="true"
                    tabIndex={-1}
                >
                    View all
                    <ArrowRight className="w-3.5 h-3.5" />
                </Link>
            )}
        </div>
        <div className="divider-glow" aria-hidden="true" />
    </div>
);
