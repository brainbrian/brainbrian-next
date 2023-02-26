import { NextApiRequest, NextApiResponse } from 'next';
import { format } from 'date-fns';
import fs from 'fs';
import { orderBy, slice } from 'lodash';
import matter from 'gray-matter';
import path from 'path';
import type { Post } from '../../types';

interface PostsResponse {
    posts: Post[];
    totalCount: number;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<PostsResponse | { error: string }>,
) {
    const page = Number(req.query.page) || 1;
    const size = Number(req.query.size) || 10;
    const order = req.query.order === 'asc' ? 'asc' : 'desc';

    try {
        const files = fs.readdirSync(path.join('content/posts'));

        const posts = files.map((file) => {
            const slug = file;

            const { data: frontmatter } = matter(
                fs.readFileSync(
                    path.join(`content/posts/${slug}/`, 'index.md'),
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

        const response: PostsResponse = {
            posts: slicedPosts,
            totalCount,
        };

        res.status(200).json(response);
    } catch (error: any) {
        res.status(500).json({ error: error?.message });
    }
}
