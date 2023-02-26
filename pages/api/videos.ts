import { NextApiRequest, NextApiResponse } from 'next';

const apiKey = process.env.GOOGLE_API_KEY;
const playlistId = 'UUnphFlefYslPtGlsRuRp5Kw';

async function fetchVideosFromPlaylist(size: number) {
    const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=${size}&key=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    return data.items;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    const size = Number(req.query.size) || 20;
    const videos = await fetchVideosFromPlaylist(size);
    res.status(200).json(videos);
}
