import React, { useEffect, useState } from 'react';
import type { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';

import {
    Footer,
    Head,
    Header,
    Loader,
    Pagination,
    Project,
} from '../../components';
import type { Project as ProjectType } from '../../types';

interface ProjectResponse {
    projects: ProjectType[];
    totalCount: number;
    error?: string;
}

interface Props {
    projects: ProjectType[];
    totalCount: number;
    error?: string;
}

const Projects: NextPage<Props> = ({ projects, totalCount, error }) => {
    const router = useRouter();
    const { page = '1', size = '10', order = 'desc' } = router.query;
    const [isLoading, setIsLoading] = useState(true);
    const [fetchedData, setFetchedData] = useState({
        projects,
        totalCount,
        error,
    });

    useEffect(() => {
        async function fetchData() {
            const fetchURL = `${window?.location?.protocol}//${window?.location?.host}/api/projects?page=${page}&size=${size}&order=${order}`;

            try {
                const response = await fetch(fetchURL);
                const { projects, totalCount }: ProjectResponse =
                    await response.json();
                setFetchedData({ projects, totalCount });
            } catch (error: any) {
                setFetchedData({
                    projects: [],
                    totalCount: 0,
                    error: error?.message,
                });
            } finally {
                setIsLoading(false);
            }
        }

        fetchData();
    }, [page, size, order]);

    const totalPages = Math.ceil(fetchedData.totalCount / Number(size));

    const projectsComponents = fetchedData.projects.map(
        ({ excerpt, slug, title, image }) => (
            <Project
                key={slug}
                excerpt={excerpt}
                imageUrl={`/images/projects/${slug}/${image}`}
                slug={`/projects/${slug}`}
                title={title}
            />
        ),
    );

    return (
        <>
            <Head
                title="Projects | Brian Behrens | Los Angeles Software Engineer"
                description="Projects (blogs) from Brian Behrens of my adventures and journey in coding."
            />
            <Header />
            <main className="content">
                {isLoading ? (
                    <Loader />
                ) : (
                    <>
                        {error ? (
                            <p>An error occurred: {error}</p>
                        ) : (
                            <>
                                {projectsComponents}
                                <Pagination
                                    basePath={'/projects'}
                                    currentPage={Number(page)}
                                    numPages={totalPages}
                                />
                            </>
                        )}
                    </>
                )}
            </main>
            <Footer />
        </>
    );
};

export const getServerSideProps: GetServerSideProps<Props> = async (
    context,
) => {
    const page = Number(context.query.page) || 1;
    const size = Number(context.query.size) || 10;
    const order = context.query.order === 'asc' ? 'asc' : 'desc';
    const fetchURL = `${context.req.headers['x-forwarded-proto'] || 'http'}://${
        context.req.headers.host
    }/api/projects?page=${page}&size=${size}&order=${order}`;

    try {
        const response = await fetch(fetchURL);
        const { projects, totalCount }: ProjectResponse = await response.json();
        return {
            props: { projects, totalCount },
        };
    } catch (error: any) {
        return {
            props: { projects: [], totalCount: 0, error: error?.message },
        };
    }
};

export default Projects;
