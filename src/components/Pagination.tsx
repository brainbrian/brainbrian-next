import React from 'react';
import classNames from 'classnames';
import Link from 'next/link';

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

    return (
        <nav className="flex justify-center my-8">
            {!isFirst && (
                <Link
                    href={prevPage}
                    rel="prev"
                    className="text-xl font-bold mx-0.5 p-2 hover:bg-main hover:text-light hover:no-underline focus-visible:bg-main focus-visible:text-light focus-visible:no-underline"
                >
                    ← <span className="sr-only">Previous Page</span>
                </Link>
            )}
            {Array.from({ length: numPages }, (_, i) => (
                <Link
                    key={`pagination-number${i + 1}`}
                    href={i === 0 ? basePath : `${basePath}?page=${i + 1}`}
                    className={classNames(
                        'text-xl font-bold mx-0.5 p-2 hover:bg-main hover:text-light hover:no-underline focus-visible:bg-main focus-visible:text-light focus-visible:no-underline',
                        {
                            'bg-main text-light no-underline':
                                currentPage === i + 1,
                        },
                    )}
                >
                    {i + 1}
                </Link>
            ))}
            {!isLast && (
                <Link
                    href={nextPage}
                    rel="next"
                    className="text-xl font-bold mx-0.5 p-2 hover:bg-main hover:text-light hover:no-underline focus-visible:bg-main focus-visible:text-light focus-visible:no-underline"
                >
                    <span className="sr-only">Next Page</span> →
                </Link>
            )}
        </nav>
    );
};
