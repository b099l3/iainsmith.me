import { getNowPlaying } from 'lib/spotify';
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

  const response = await getNowPlaying();

  if (response.status === 204 || !response.ok) {
    return new Response(JSON.stringify({ isPlaying: false }), {
      status: 200,
      headers: {
        'content-type': 'application/json'
      }
    });
  }

  const song = await response.json().catch(() => null);

  if (!song?.item) {
    return new Response(JSON.stringify({ isPlaying: false }), {
      status: 200,
      headers: {
        'content-type': 'application/json'
      }
    });
  }

  const isPlaying = Boolean(song.is_playing);
  const title = song.item.name ?? '';
  const artist = Array.isArray(song.item.artists)
    ? song.item.artists.map((_artist) => _artist.name).join(', ')
    : '';
  const album = song.item.album?.name ?? '';
  const albumImageUrl = song.item.album?.images?.[0]?.url ?? '';
  const songUrl = song.item.external_urls?.spotify ?? '';

  return new Response(
    JSON.stringify({
      album,
      albumImageUrl,
      artist,
      isPlaying,
      songUrl,
      title
    }),
    {
      status: 200,
      headers: {
        'content-type': 'application/json',
        'cache-control': 'public, s-maxage=60, stale-while-revalidate=30'
      }
    }
  );
}
