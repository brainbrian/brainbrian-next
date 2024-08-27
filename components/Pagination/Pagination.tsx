import React from 'react';
import classNames from 'classnames';
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
            ? basePath
            : `${basePath}/${(currentPage - 1).toString()}`;
    const nextPage = `${basePath}/${(currentPage + 1).toString()}`;

    return (
        <nav className={styles.Pagination}>
            {!isFirst && (
                <Link
                    href={prevPage}
                    rel="prev"
                    className={styles.PaginationLink}
                >
                    ← <span className="sr-only">Previous Page</span>
                </Link>
            )}
            {Array.from({ length: numPages }, (_, i) => (
                <Link
                    key={`pagination-number${i + 1}`}
                    href={`${basePath}${i === 0 ? '' : `?page=${i + 1}`}`}
                    className={classNames(styles.PaginationLink, {
                        [styles.PaginationLinkActive]: currentPage === i + 1,
                    })}
                >
                    {i + 1}
                </Link>
            ))}
            {!isLast && (
                <Link
                    href={nextPage}
                    rel="next"
                    className={styles.PaginationLink}
                >
                    <span className="sr-only">Next Page</span> →
                </Link>
            )}
        </nav>
    );
};
