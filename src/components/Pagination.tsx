import React from 'react';
import classNames from 'classnames';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
    basePath: string;
    currentPage: number;
    numPages: number;
}

export const Pagination: React.FC<PaginationProps> = ({
    basePath,
    currentPage,
    numPages,
}) => {
    const isFirst = currentPage === 1;
    const isLast = currentPage === numPages;
    const prevPage =
        currentPage - 1 === 1
            ? basePath
            : `${basePath}?page=${currentPage - 1}`;
    const nextPage = `${basePath}?page=${currentPage + 1}`;

    // Helper function to generate page numbers with ellipsis
    const generatePageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 5;

        if (numPages <= maxVisiblePages) {
            // Show all pages if total is small
            for (let i = 1; i <= numPages; i++) {
                pages.push(i);
            }
        } else {
            // Show first page, current page range, and last page with ellipsis
            if (currentPage <= 3) {
                // Show first 4 pages + ellipsis + last page
                for (let i = 1; i <= 4; i++) {
                    pages.push(i);
                }
                if (numPages > 5) {
                    pages.push('ellipsis');
                    pages.push(numPages);
                }
            } else if (currentPage >= numPages - 2) {
                // Show first page + ellipsis + last 4 pages
                pages.push(1);
                if (numPages > 5) {
                    pages.push('ellipsis');
                }
                for (let i = numPages - 3; i <= numPages; i++) {
                    pages.push(i);
                }
            } else {
                // Show first + ellipsis + current range + ellipsis + last
                pages.push(1);
                pages.push('ellipsis');
                for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                    pages.push(i);
                }
                pages.push('ellipsis');
                pages.push(numPages);
            }
        }

        return pages;
    };

    const pageNumbers = generatePageNumbers();

    return (
        <nav
            className="flex justify-center items-center my-12"
            aria-label="Pagination Navigation"
        >
            <div className="glass flex items-center gap-1 rounded-full p-1.5">
                {/* Previous Button */}
                {!isFirst && (
                    <Link
                        href={prevPage}
                        rel="prev"
                        className="flex items-center justify-center w-10 h-10 rounded-full text-[var(--text-muted)] hover:bg-primary hover:text-white focus-visible:bg-primary focus-visible:text-white focus-visible:outline-none transition-all duration-200 ease-in-out group"
                        aria-label="Go to previous page"
                    >
                        <ChevronLeft
                            size={18}
                            className="group-hover:scale-110 transition-transform duration-200"
                        />
                    </Link>
                )}

                {/* Page Numbers */}
                {pageNumbers.map((page, index) => {
                    if (page === 'ellipsis') {
                        return (
                            <span
                                key={`ellipsis-${index}`}
                                className="flex items-center justify-center w-10 h-10 text-[var(--text-subtle)]"
                                aria-hidden="true"
                            >
                                ...
                            </span>
                        );
                    }

                    const pageNumber = page as number;
                    const isCurrentPage = currentPage === pageNumber;

                    return (
                        <Link
                            key={`page-${pageNumber}`}
                            href={
                                pageNumber === 1
                                    ? basePath
                                    : `${basePath}?page=${pageNumber}`
                            }
                            className={classNames(
                                'flex items-center justify-center w-10 h-10 rounded-full font-semibold text-sm no-underline hover:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary transition-all duration-200 ease-in-out',
                                {
                                    'bg-gradient-to-br from-[#43b2ff] to-[#0b7fe0] text-white shadow-[0_4px_14px_-4px_rgba(35,161,255,0.8)]':
                                        isCurrentPage,
                                    'text-[var(--text-muted)] hover:bg-white/10 hover:text-white':
                                        !isCurrentPage,
                                },
                            )}
                            aria-label={
                                isCurrentPage
                                    ? `Current page, page ${pageNumber}`
                                    : `Go to page ${pageNumber}`
                            }
                            aria-current={isCurrentPage ? 'page' : undefined}
                        >
                            {pageNumber}
                        </Link>
                    );
                })}

                {/* Next Button */}
                {!isLast && (
                    <Link
                        href={nextPage}
                        rel="next"
                        className="flex items-center justify-center w-10 h-10 rounded-full text-[var(--text-muted)] hover:bg-primary hover:text-white focus-visible:bg-primary focus-visible:text-white focus-visible:outline-none transition-all duration-200 ease-in-out group"
                        aria-label="Go to next page"
                    >
                        <ChevronRight
                            size={18}
                            className="group-hover:scale-110 transition-transform duration-200"
                        />
                    </Link>
                )}
            </div>
        </nav>
    );
};
