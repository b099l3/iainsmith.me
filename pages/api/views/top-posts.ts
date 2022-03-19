import prisma from 'lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';

(BigInt.prototype as any).toJSON = function () {
  return this.toString();
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const topViews = await prisma.views.findMany({ take: 3, orderBy: {count: 'desc'}, });

    return res.status(200).json({ topViews: topViews.map((v) => ({slug: v.slug, views: v.count})) });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
}
