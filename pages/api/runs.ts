import { getAthleteStats } from 'lib/strava';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const response = await getAthleteStats();
  const { recent_run_totals, ytd_run_totals, all_run_totals } = await response.json();
  
  const athleteStats = {
    recentRuns: recent_run_totals.count,
    recentDistance: recent_run_totals.distance,
    ytdRuns: ytd_run_totals.count,
    ytdDistance: ytd_run_totals.distance,
  };

  res.setHeader(
    'Cache-Control',
    'public, s-maxage=86400, stale-while-revalidate=43200'
  );

  return res.status(200).json( athleteStats );
}
