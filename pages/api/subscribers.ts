import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== 'GET') {
      res.setHeader('Allow', ['GET']);
      return res.status(405).json({ error: 'Method not allowed' });
    }

    const result = await fetch('https://www.getrevue.co/api/v2/subscribers', {
      method: 'GET',
      headers: {
        Authorization: `Token ${process.env.REVUE_API_KEY}`
      }
    });

    if (!result.ok) {
      return res.status(500).json({ error: 'Error retrieving subscribers' });
    }

    const data = await result.json();

    res.setHeader(
      'Cache-Control',
      'public, s-maxage=1200, stale-while-revalidate=600'
    );

    return res.status(200).json({ count: Array.isArray(data) ? data.length : 0 });
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Internal server error';
    return res.status(500).json({ error: message });
  }
}
