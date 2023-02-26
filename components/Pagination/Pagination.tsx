import React from 'react';
import Link from 'next/link';

import styles from './Pagination.module.scss';

export const Pagination = ({
    basePath,
    currentPage,
    numPages,
}: {
    basePath: string;
    currentPage: number;
    numPages: number;
}) => {
    const isFirst = currentPage === 1;
    const isLast = currentPage === numPages;
    const prevPage =
        currentPage - 1 === 1
            ? '/'
            : `${basePath}/${(currentPage - 1).toString()}`;
    const nextPage = `${basePath}/${(currentPage + 1).toString()}`;

    return (
        <nav className={styles.Pagination}>
            {!isFirst && (
                <Link
                    href={prevPage}
                    rel="prev"
                    className={styles.PaginationLink}
                    // activeClassName={styles.PaginationLinkActive}
                >
                    ← <span className="sr-only">Previous Page</span>
                </Link>
            )}
            {Array.from({ length: numPages }, (_, i) => (
                <Link
                    key={`pagination-number${i + 1}`}
                    href={`${basePath}/${i === 0 ? '' : i + 1}`}
                    className={styles.PaginationLink}
                    // activeClassName={styles.PaginationLinkActive}
                >
                    {i + 1}
                </Link>
            ))}
            {!isLast && (
                <Link
                    href={nextPage}
                    rel="next"
                    className={styles.PaginationLink}
                    // activeClassName={styles.PaginationLinkActive}
                >
                    <span className="sr-only">Next Page</span> →
                </Link>
            )}
        </nav>
    );
};
