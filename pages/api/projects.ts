import { NextApiRequest, NextApiResponse } from 'next';
import { format } from 'date-fns';
import fs from 'fs';
import { orderBy, slice } from 'lodash';
import matter from 'gray-matter';
import path from 'path';
import { Project } from '../../types';

interface ProjectsResponse {
    projects: Project[];
    totalCount: number;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ProjectsResponse | { error: string }>,
) {
    const page = Number(req.query.page) || 1;
    const size = Number(req.query.size) || 10;
    const order = req.query.order === 'asc' ? 'asc' : 'desc';

    try {
        const files = fs.readdirSync(path.join('content/projects'));

        const projects = files.map((file) => {
            const slug = file;

            const { data: frontmatter } = matter(
                fs.readFileSync(
                    path.join(`content/projects/${slug}/`, 'index.md'),
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
            } as Project;
        });

        const totalCount = projects.length;
        const startIndex = (page - 1) * size;
        const endIndex = startIndex + size;

        const slicedProjects = slice(
            orderBy(projects, 'date', order),
            startIndex,
            endIndex,
        );

        const response: ProjectsResponse = {
            projects: slicedProjects,
            totalCount,
        };

        res.status(200).json(response);
    } catch (error: any) {
        res.status(500).json({ error: error?.message });
    }
}
