import { format } from 'date-fns';
import fs from 'fs';
import { orderBy, slice } from 'lodash';
import matter from 'gray-matter';
import path from 'path';
import { config } from '@/config';
import type { Post } from '@/types';

export const getProjectsTotalCount = () =>
    fs.readdirSync(path.join(`${config.contentDirectory}/projects`)).length;

export const getProjects = (
    page: number = 1,
    size: number = 10,
    order: 'asc' | 'desc' = 'desc',
) => {
    try {
        const files = fs.readdirSync(
            path.join(`${config.contentDirectory}/projects`),
        );

        const projects = files.map((file) => {
            const slug = file;

            const { data: frontmatter } = matter(
                fs.readFileSync(
                    path.join(
                        `${config.contentDirectory}/projects/${slug}/`,
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

        const totalCount = projects.length;
        const startIndex = (page - 1) * size;
        const endIndex = startIndex + size;

        const slicedPosts = slice(
            orderBy(projects, 'date', order),
            startIndex,
            endIndex,
        );

        return {
            projects: slicedPosts,
            totalCount,
        };
    } catch (error: any) {
        return {
            projects: [],
            totalCount: 0,
        };
    }
};
