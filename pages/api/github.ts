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

    const [userResponse, userReposResponse] = await Promise.all([
      fetch('https://api.github.com/users/b099l3'),
      fetch('https://api.github.com/users/b099l3/repos?per_page=100')
    ]);

    if (!userResponse.ok || !userReposResponse.ok) {
      return res.status(502).json({ message: 'Unable to fetch GitHub data' });
    }

    const user = await userResponse.json();
    const repositories = await userReposResponse.json();
    const repoList = Array.isArray(repositories) ? repositories : [];

    const mine = repoList.filter((repo) => !repo.fork);
    const stars = mine.reduce((accumulator, repository) => {
      return accumulator + Number(repository.stargazers_count || 0);
    }, 0);

    res.setHeader(
      'Cache-Control',
      'public, s-maxage=1200, stale-while-revalidate=600'
    );

    return res.status(200).json({
      followers: Number(user?.followers || 0),
      stars
    });
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Internal server error';
    return res.status(500).json({ message });
  }
}
