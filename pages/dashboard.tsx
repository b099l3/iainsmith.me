import Container from 'components/Container';
import Analytics from 'components/metrics/Analytics';
import GitHub from 'components/metrics/Github';
import Strava from 'components/metrics/Strava';
import TopTracks from 'components/TopTracks';


export default function Dashboard() {
  return (
    <Container
      title="Dashboard – Iain Smith"
      description="My personal dashboard, built with Next.js API routes deployed as serverless functions."
    >
      <div className="flex flex-col items-start justify-center max-w-2xl mx-auto mb-16">
        <h1 className="pb-4 mb-4 text-3xl font-bold tracking-tight text-transparent md:text-5xl bg-clip-text bg-gradient-to-r from-indigo-500 via-teal-500 to-indigo-500 animate-text">
          Dashboard
        </h1>
        <div className="mb-8">
          <p className="mb-4 text-gray-600 dark:text-gray-400">
            This is my personal dashboard, built with Next.js API routes
            deployed as serverless functions. I use this dashboard to track
            various metrics across platforms like GitHub, StackOverflow, Strava, and
            more.
          </p>
        </div>
        <div className="flex flex-col w-full">
          <Strava />
        </div>
        <div className="grid w-full grid-cols-1 gap-4 my-2 sm:grid-cols-2">
          <Analytics />
          <GitHub />
        </div>
        <h2 className="mt-16 mb-4 text-3xl font-bold tracking-tight text-black dark:text-white">
          Top Tracks
        </h2>
        <p className="mb-4 text-gray-600 dark:text-gray-400">
          Curious what I'm currently jimmitae jamming to? Here's my top tracks on Spotify
          updated daily.
        </p>
        <TopTracks />
      </div>
    </Container>
  );
}
