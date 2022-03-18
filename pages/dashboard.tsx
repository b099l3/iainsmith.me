import Container from 'components/Container';
import Analytics from 'components/metrics/Analytics';
import GitHub from 'components/metrics/Github';
import Newsletter from 'components/metrics/Newsletter';
import Strava from 'components/metrics/Strava';
import TopTracks from 'components/TopTracks';


export default function Dashboard() {
  return (
    <Container
      title="Dashboard – Iain Smith"
      description="My personal dashboard, built with Next.js API routes deployed as serverless functions."
    >
      <div className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16">
        <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
          Dashboard
        </h1>
        <div className="mb-8">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            This is my personal dashboard, built with Next.js API routes
            deployed as serverless functions. I use this dashboard to track
            various metrics across platforms like GitHub, StackOverflow, Strava, and
            more.
          </p>
        </div>
        <div className="flex flex-col w-full">
          <Strava />
        </div>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 my-2 w-full">
          <Analytics />
          <GitHub />
        </div>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 my-2 w-full">
          <Newsletter />
        </div>
        <h2 className="font-bold text-3xl tracking-tight mb-4 mt-16 text-black dark:text-white">
          Top Tracks
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Curious what I'm currently jimmitae jamming to? Here's my top tracks on Spotify
          updated daily.
        </p>
        <TopTracks />
      </div>
    </Container>
  );
}
