import prisma from 'lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== 'GET' && req.method !== 'POST') {
      res.setHeader('Allow', ['GET', 'POST']);
      return res.status(405).json({ message: 'Method not allowed' });
    }

    const rawSlug = req.query.slug;
    const slug = Array.isArray(rawSlug) ? rawSlug[0] : rawSlug;

    if (!slug) {
      return res.status(400).json({ message: 'Slug is required' });
    }

    if (req.method === 'POST') {
      const newOrUpdatedViews = await prisma.views.upsert({
        where: { slug },
        create: { slug },
        update: {
          count: {
            increment: 1
          }
        }
      });

      return res.status(200).json({
        total: newOrUpdatedViews.count.toString()
      });
    }

    if (req.method === 'GET') {
      const views = await prisma.views.findUnique({
        where: {
          slug
        }
      });

      return res.status(200).json({ total: (views?.count ?? BigInt(0)).toString() });
    }
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Internal server error';
    return res.status(500).json({ message });
  }
}
