import * as React from 'react';

import { Footer, Head, Header, VideoList } from '../components';

const VideosPage = () => {
    const [videos, setVideos] = React.useState([]);

    const requestVideos = () => {
        if (typeof window?.gapi !== `undefined`) {
            window?.gapi.client.setApiKey(
                process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
            );
            window?.gapi.client.load('youtube', 'v3', () => {
                window?.gapi.client
                    .request({
                        path: 'https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&maxResults=20&playlistId=UUnphFlefYslPtGlsRuRp5Kw',
                    })
                    .then((response: any) =>
                        setVideos(
                            response.result.items.map((video: any) => ({
                                id: video.snippet.resourceId.videoId,
                                date: video.snippet.publishedAt,
                                image: video.snippet.thumbnails.maxres
                                    ? video.snippet.thumbnails.maxres.url
                                    : video.snippet.thumbnails.high.url,
                                title: video.snippet.title,
                                url: `https://www.youtube.com/watch?v=${video.snippet.resourceId.videoId}`,
                            })),
                        ),
                    );
            });
        } else {
            setVideos([]);
        }
    };

    React.useEffect(() => {
        if (typeof window !== `undefined`) {
            window.onGoogleLoad = () =>
                videos?.length === 0 ? requestVideos() : null;
        }
    }, [videos]);

    return (
        <>
            <Head
                title="Videos | Brian Behrens"
                description="A collection of 20 of the latest videos created by Brian Behrens."
            >
                <script
                    async
                    defer
                    src="https://apis.google.com/js/client.js?onload=onGoogleLoad"
                    type="text/javascript"
                ></script>
            </Head>
            <Header />
            <main className="content">
                <VideoList videos={videos} />
            </main>
            <Footer />
        </>
    );
};

export default VideosPage;
