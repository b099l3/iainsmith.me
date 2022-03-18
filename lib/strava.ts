const client_id = process.env.STRAVA_CLIENT_ID;
const client_secret = process.env.STRAVA_CLIENT_SECRET;
const refresh_token = process.env.STRAVA_REFRESH_TOKEN;

const TOKEN_ENDPOINT = `https://www.strava.com/oauth/token`;
const ATHLETE_ENDPOINT = `https://www.strava.com/api/v3/athlete`;
const ATHLETE_STATS_ENDPOINT = (id: string): string => {
  return `https://www.strava.com/api/v3/athletes/${ id }/stats`;
}

const getAccessToken = async () => {
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

  return response.json();
};

const getAthlete = async () => {
  const { access_token } = await getAccessToken();
  
  const response = await fetch(ATHLETE_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  });
  
  return response.json();
};

export const getAthleteStats = async () => {
  const { access_token } = await getAccessToken();
  const { id } = await getAthlete();

  const url = ATHLETE_STATS_ENDPOINT(id);
  
  return fetch(url, {
    headers: {
      Authorization: `Bearer ${access_token}`
    }
  });
};
