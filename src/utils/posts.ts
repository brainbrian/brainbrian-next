import { format } from 'date-fns';
import fs from 'fs';
import { orderBy, slice } from 'lodash';
import matter from 'gray-matter';
import path from 'path';
import type { Post } from '../types';
import { config } from '@/config';

export const getPostsTotalCount = () =>
    fs.readdirSync(path.join(`${config.contentDirectory}/posts`)).length;

export const getPosts = (
    page: number = 1,
    size: number = 10,
    order: 'asc' | 'desc' = 'desc',
) => {
    try {
        const files = fs.readdirSync(
            path.join(`${config.contentDirectory}/posts`),
        );

        const posts = files.map((file) => {
            const slug = file;

            const { data: frontmatter } = matter(
                fs.readFileSync(
                    path.join(
                        `${config.contentDirectory}/posts/${slug}/`,
                        'index.md',
                    ),
                    'utf-8',
                ),
            );

            return {
                ...frontmatter,
                dateFormatted: format(
                    new Date(frontmatter.date),
                    'MMMM dd, yyyy',
                ),
                slug,
            } as Post;
        });

        const totalCount = posts.length;
        const startIndex = (page - 1) * size;
        const endIndex = startIndex + size;

        const slicedPosts = slice(
            orderBy(posts, 'date', order),
            startIndex,
            endIndex,
        );

        return {
            posts: slicedPosts,
            totalCount,
        };
    } catch (error: any) {
        return {
            posts: [],
            totalCount: 0,
        };
    }
};
