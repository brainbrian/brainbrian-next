const playlistId = 'UUnphFlefYslPtGlsRuRp5Kw';

// Revalidate the cached YouTube response hourly so new uploads appear without a redeploy
const REVALIDATE_SECONDS = 3600;

export async function fetchVideosFromPlaylist(size: number) {
    const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=${size}&key=${process.env.GOOGLE_API_KEY}`;
    const response = await fetch(url, {
        next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!response.ok) {
        throw new Error(`Failed to fetch videos: ${response.statusText}`);
    }
    const data = await response.json();
    return data.items ?? [];
}
