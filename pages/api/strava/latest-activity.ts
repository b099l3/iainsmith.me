import { getLatestActivity } from 'lib/strava';
import type { StravaLatestActivity } from 'lib/types';
import type { NextApiRequest, NextApiResponse } from 'next';

type LatestActivityResponse = {
  activity: StravaLatestActivity | null;
  message?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<LatestActivityResponse>
) {
  try {
    if (req.method !== 'GET') {
      res.setHeader('Allow', ['GET']);
      return res
        .status(405)
        .json({ activity: null, message: 'Method not allowed' });
    }

    const activity = await getLatestActivity();

    if (!activity) {
      return res.status(200).json({ activity: null });
    }

    const result: StravaLatestActivity = {
      id: activity.id,
      name: activity.name,
      type: activity.type,
      distance: Number(activity.distance || 0),
      movingTime: Number(activity.moving_time || 0),
      elapsedTime: Number(activity.elapsed_time || 0),
      totalElevationGain: Number(activity.total_elevation_gain || 0),
      averageSpeed: Number(activity.average_speed || 0),
      averageHeartRate: activity.average_heartrate
        ? Number(activity.average_heartrate)
        : null,
      sufferScore: activity.suffer_score ? Number(activity.suffer_score) : null,
      startDate: activity.start_date,
      startDateLocal: activity.start_date_local,
      url: `https://www.strava.com/activities/${activity.id}`
    };

    res.setHeader(
      'Cache-Control',
      'public, s-maxage=900, stale-while-revalidate=3600'
    );

    return res.status(200).json({ activity: result });
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Internal server error';
    return res.status(200).json({ activity: null, message });
  }
}
