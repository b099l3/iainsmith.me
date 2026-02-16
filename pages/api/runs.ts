import { getAthleteStats } from 'lib/strava';
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

    const response = await getAthleteStats();

    if (!response.ok) {
      return res.status(502).json({ message: 'Unable to fetch Strava stats' });
    }

    const data = await response.json();
    const recentRunTotals = data?.recent_run_totals;
    const ytdRunTotals = data?.ytd_run_totals;

    const athleteStats = {
      recentRuns: Number(recentRunTotals?.count || 0),
      recentDistance: Number(recentRunTotals?.distance || 0),
      ytdRuns: Number(ytdRunTotals?.count || 0),
      ytdDistance: Number(ytdRunTotals?.distance || 0)
    };

    res.setHeader(
      'Cache-Control',
      'public, s-maxage=86400, stale-while-revalidate=43200'
    );

    return res.status(200).json(athleteStats);
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Internal server error';
    return res.status(500).json({ message });
  }
}
