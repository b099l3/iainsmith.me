import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== 'POST') {
      res.setHeader('Allow', ['POST']);
      return res.status(405).json({ error: 'Method not allowed' });
    }

    const { email } = req.body || {};

    if (!email || typeof email !== 'string') {
      return res.status(400).json({ error: 'Email is required' });
    }

    const result = await fetch('https://www.getrevue.co/api/v2/subscribers', {
      method: 'POST',
      headers: {
        Authorization: `Token ${process.env.REVUE_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email })
    });
    const data = await result.json().catch(() => ({}));

    if (!result.ok) {
      const errorMessage =
        data?.error?.email?.[0] || data?.error || 'Unable to subscribe';
      return res.status(500).json({ error: errorMessage });
    }

    return res.status(201).json({ error: '' });
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Unexpected error';
    return res.status(500).json({ error: message });
  }
}
