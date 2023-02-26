import useSWR from 'swr';
import { Footer, Head, Header, VideoList } from '../components';

const VideosPage = () => {
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
            <Footer />
        </>
    );
};

export default VideosPage;
