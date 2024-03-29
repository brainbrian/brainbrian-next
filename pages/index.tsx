import { GetStaticProps, NextPage } from 'next';
import React from 'react';

import { Head, Header, Panel, ProjectsRecent } from '../components';
import type { Post, Project } from '../types';
import { getPosts } from '../utils/posts';
import { getProjects } from '../utils/projects';

interface Props {
    recentPosts?: Post[];
    recentProjects?: Project[];
}

const IndexPage: NextPage<Props> = ({ recentProjects }) => (
    <>
        <Head />
        <Header />
        <main>
            <Panel videoUrl="./videos/bg-hero.mp4">
                <article className="content">
                    <h1>Hello, I&apos;m Brian Behrens.</h1>
                    <h2>I am a software engineer.</h2>
                    <p>
                        I live,{' '}
                        <a href="https://www.linkedin.com/in/brianbehrens">
                            work
                        </a>
                        , and <a href="https://github.com/brainbrian">code</a>{' '}
                        in Los Angeles. I like to{' '}
                        <a href="https://www.youtube.com/watch?v=T_mYdkyN4l8&t=374s">
                            surf
                        </a>
                        ,{' '}
                        <a href="https://www.youtube.com/watch?v=ehikEw8HsbY">
                            snowboard
                        </a>
                        ,{' '}
                        <a href="https://www.twitter.com/brianbehrens">tweet</a>
                        , and ride my{' '}
                        <a href="https://www.strava.com/athletes/brianbehrens">
                            bike
                        </a>
                        . I&apos;m passionate about{' '}
                        <a href="https://open.spotify.com/user/brianbehrens">
                            music
                        </a>{' '}
                        and{' '}
                        <a href="https://www.imdb.com/user/ur37273093/">film</a>
                        . I enjoy creating my own{' '}
                        <a href="https://gallery.brainbrian.com">photos</a> and{' '}
                        <a href="https://www.youtube.com/brianbehrens">
                            videos
                        </a>
                        .
                    </p>
                </article>
            </Panel>
            <ProjectsRecent projects={recentProjects} />
        </main>
    </>
);

export const getStaticProps: GetStaticProps<Props> = async () => {
    try {
        const postData = await getPosts(1, 8, 'desc');
        const { posts } = postData;
        const projectData = await getProjects(1, 3, 'desc');
        const { projects } = projectData;
        return {
            props: { recentPosts: posts, recentProjects: projects },
        };
    } catch (error: any) {
        return {
            props: {
                recentPosts: [],
                recentProjects: [],
            },
        };
    }
};

export default IndexPage;
