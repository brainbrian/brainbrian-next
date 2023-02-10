import { NextApiRequest, NextApiResponse } from 'next';

async function getTweets(bearerToken: string) {
    const res = await fetch(
        'https://api.twitter.com/2/tweets?user_id=brianbehrens&tweet.fields=public_metrics',
        {
            headers: {
                Authorization: `Bearer ${bearerToken}`,
            },
        },
    );

    const data = await res.json();
    return data;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {
    try {
        const tweets = await getTweets('your_bearer_token');

        res.status(200).json({ tweets });
    } catch (error: any) {
        res.status(500).json({ error: error?.message });
    }
}
