import { google } from 'googleapis';
import type { NextApiRequest, NextApiResponse } from 'next';

import googleAuth from 'lib/google';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== 'GET') {
      res.setHeader('Allow', ['GET']);
      return res.status(405).json({ message: 'Method not allowed' });
    }

    const auth = await googleAuth.getClient();
    const youtube = google.youtube({
      auth,
      version: 'v3'
    });

    const response = await youtube.channels.list({
      id: 'UCZMli3czZnd1uoc1ShTouQw',
      part: 'statistics'
    });

    const channel = response.data.items?.[0];
    const statistics = channel?.statistics;

    res.setHeader(
      'Cache-Control',
      'public, s-maxage=1200, stale-while-revalidate=600'
    );

    return res.status(200).json({
      subscriberCount: Number(statistics?.subscriberCount || 0),
      viewCount: Number(statistics?.viewCount || 0)
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Internal server error';
    return res.status(500).json({ message });
  }
}
