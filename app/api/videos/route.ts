import { NextRequest, NextResponse } from 'next/server';

const apiKey = process.env.GOOGLE_API_KEY;
const playlistId = 'UUnphFlefYslPtGlsRuRp5Kw';

async function fetchVideosFromPlaylist(size: number) {
    const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=${size}&key=${apiKey}`;
    const response = await fetch(url);
    const data = await response.json();
    return data.items;
}

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const size = Number(searchParams.get('size')) || 20;
    const videos = await fetchVideosFromPlaylist(size);
    console.log(videos);
    return NextResponse.json(videos);
}
