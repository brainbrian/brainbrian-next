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
            <div className="flex items-center gap-1 bg-white dark:bg-[#262626] rounded-lg shadow-sm border border-gray-200 dark:border-[#262626] p-1">
                {/* Previous Button */}
                {!isFirst && (
                    <Link
                        href={prevPage}
                        rel="prev"
                        className="flex items-center justify-center w-10 h-10 rounded-md text-[#262626] dark:text-gray-400 hover:bg-primary hover:text-white focus-visible:bg-primary focus-visible:text-white transition-all duration-200 ease-in-out group"
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
                                className="flex items-center justify-center w-10 h-10 text-gray-400 dark:text-gray-500"
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
                                'flex items-center justify-center w-10 h-10 rounded-md font-medium text-sm transition-all duration-200 ease-in-out',
                                {
                                    'bg-primary text-white shadow-sm':
                                        isCurrentPage,
                                    'text-[#262626] dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#262626]/80 hover:text-[#262626] dark:hover:text-white':
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
                        className="flex items-center justify-center w-10 h-10 rounded-md text-[#262626] dark:text-gray-400 hover:bg-primary hover:text-white focus-visible:bg-primary focus-visible:text-white transition-all duration-200 ease-in-out group"
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
