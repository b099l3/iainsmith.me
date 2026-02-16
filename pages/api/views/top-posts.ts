import prisma from 'lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== 'GET') {
      res.setHeader('Allow', ['GET']);
      return res.status(405).json({ message: 'Method not allowed' });
    }

    const topViews = await prisma.views.findMany({
      take: 3,
      orderBy: { count: 'desc' }
    });

    return res.status(200).json({
      topViews: topViews.map((v) => ({
        slug: v.slug,
        views: v.count.toString()
      }))
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Internal server error';
    return res.status(500).json({ message });
  }
}
