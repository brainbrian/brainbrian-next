import { GetStaticProps, NextPage } from 'next';
import useSWR from 'swr';
import { Footer, Head, Header, VideoList } from '../components';
import type { Post } from '../types';
import { getPosts } from '../utils/posts';

interface Props {
    recentPosts?: Post[];
}

const VideosPage: NextPage<Props> = ({ recentPosts }) => {
    const {
        data: videos,
        isLoading,
        error,
    } = useSWR(`/api/videos?size=20`, async (url) => {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    });

    if (error) return <>An error occurred: {error.message}</>;

    return (
        <>
            <Head
                title="Videos | Brian Behrens"
                description="A collection of 20 of the latest videos created by Brian Behrens."
            />
            <Header />
            <main className="content">
                <VideoList isLoading={isLoading} videos={videos} />
            </main>
            <Footer recentPosts={recentPosts} />
        </>
    );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
    try {
        const postData = await getPosts(1, 8, 'desc');
        const { posts } = postData;
        return {
            props: { recentPosts: posts },
        };
    } catch (error: any) {
        return {
            props: {
                recentPosts: [],
            },
        };
    }
};

export default VideosPage;
