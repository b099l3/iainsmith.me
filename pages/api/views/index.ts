import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from 'lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== 'GET') {
      res.setHeader('Allow', ['GET']);
      return res.status(405).json({ message: 'Method not allowed' });
    }

    const totalViews = await prisma.views.aggregate({
      _sum: {
        count: true
      }
    });

    return res.status(200).json({ total: (totalViews._sum.count ?? BigInt(0)).toString() });
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Internal server error';
    return res.status(500).json({ message });
  }
}
