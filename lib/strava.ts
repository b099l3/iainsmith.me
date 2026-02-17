const client_id = process.env.STRAVA_CLIENT_ID;
const client_secret = process.env.STRAVA_CLIENT_SECRET;
const refresh_token = process.env.STRAVA_REFRESH_TOKEN;

const TOKEN_ENDPOINT = `https://www.strava.com/oauth/token`;
const ATHLETE_ENDPOINT = `https://www.strava.com/api/v3/athlete`;
const ATHLETE_ACTIVITIES_ENDPOINT = `https://www.strava.com/api/v3/athlete/activities`;
const ATHLETE_STATS_ENDPOINT = (id: string): string => {
  return `https://www.strava.com/api/v3/athletes/${id}/stats`;
};

async function formatStravaError(
  response: Response,
  fallback: string
): Promise<string> {
  try {
    const data = await response.json();
    const message = data?.message ? String(data.message) : fallback;
    const errors = Array.isArray(data?.errors)
      ? data.errors
          .map((error: { field?: string; code?: string }) =>
            [error.field, error.code].filter(Boolean).join(':')
          )
          .filter(Boolean)
      : [];

    return errors.length > 0 ? `${message} (${errors.join(', ')})` : message;
  } catch {
    return fallback;
  }
}

function assertStravaConfig() {
  if (!client_id || !client_secret || !refresh_token) {
    throw new Error('Missing Strava credentials');
  }
}

const getAccessToken = async () => {
  assertStravaConfig();

  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({
      client_id: client_id,
      client_secret: client_secret,
      grant_type: 'refresh_token',
      refresh_token: refresh_token
    })
  });

  if (!response.ok) {
    throw new Error('Unable to refresh Strava token');
  }

  const data = await response.json();
  if (!data?.access_token) {
    throw new Error('Invalid Strava token response');
  }

  return data.access_token as string;
};

const getAthlete = async (accessToken: string) => {
  const response = await fetch(ATHLETE_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });

  if (!response.ok) {
    throw new Error('Unable to fetch Strava athlete');
  }

  return response.json();
};

export const getAthleteStats = async () => {
  const accessToken = await getAccessToken();
  const athlete = await getAthlete(accessToken);

  const url = ATHLETE_STATS_ENDPOINT(String(athlete.id));

  return fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
};

export type StravaActivity = {
  id: number;
  name: string;
  type: string;
  distance: number;
  moving_time: number;
  elapsed_time: number;
  total_elevation_gain: number;
  average_speed: number;
  average_heartrate?: number;
  suffer_score?: number;
  start_date: string;
  start_date_local: string;
};

export const getLatestActivity = async (): Promise<StravaActivity | null> => {
  const accessToken = await getAccessToken();
  const url = `${ATHLETE_ACTIVITIES_ENDPOINT}?per_page=1&page=1`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });

  if (!response.ok) {
    const message = await formatStravaError(
      response,
      'Unable to fetch Strava activities'
    );
    throw new Error(message);
  }

  const data = await response.json();
  if (!Array.isArray(data)) {
    throw new Error('Invalid Strava activities response');
  }

  if (data.length === 0) {
    return null;
  }

  return data[0] as StravaActivity;
};
