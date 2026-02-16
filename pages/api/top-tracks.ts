import { getTopTracks } from 'lib/spotify';
import { type NextRequest } from 'next/server';

export const config = {
  runtime: 'experimental-edge'
};

export default async function handler(req: NextRequest) {
  if (req.method !== 'GET') {
    return new Response(JSON.stringify({ message: 'Method not allowed' }), {
      status: 405,
      headers: {
        allow: 'GET',
        'content-type': 'application/json'
      }
    });
  }

  const response = await getTopTracks();
  if (!response.ok) {
    return new Response(JSON.stringify({ tracks: [] }), {
      status: 200,
      headers: {
        'content-type': 'application/json',
        'cache-control': 'public, s-maxage=300, stale-while-revalidate=150'
      }
    });
  }

  const payload = await response.json().catch(() => ({}));
  const items = Array.isArray(payload?.items) ? payload.items : [];

  const tracks = items.slice(0, 10).map((track) => ({
    artist: Array.isArray(track?.artists)
      ? track.artists.map((_artist) => _artist.name).join(', ')
      : '',
    songUrl: track?.external_urls?.spotify ?? '',
    title: track?.name ?? ''
  }));

  return new Response(JSON.stringify({ tracks }), {
    status: 200,
    headers: {
      'content-type': 'application/json',
      'cache-control': 'public, s-maxage=86400, stale-while-revalidate=43200'
    }
  });
}
