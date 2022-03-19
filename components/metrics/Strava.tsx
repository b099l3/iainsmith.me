import LoadingSpinner from 'components/LoadingSpinner';
import MetricCard from 'components/metrics/Card';
import fetcher from 'lib/fetcher';
import { Strava } from 'lib/types';
import useSWR from 'swr';

function getMiles(i: number) {
  return i*0.000621371192;
}

export default function StravaCard() {
  const { data } = useSWR<Strava>('/api/runs', fetcher);


  if (!data) {
    return <LoadingSpinner/>;
  }

  const recentRuns = new Number(data?.recentRuns);
  const recentDistance = new Number(getMiles(data?.recentDistance)).toFixed(2);
  const ytdRuns = new Number(data?.ytdRuns);
  const ytdDistance = new Number(getMiles(data?.ytdDistance)).toFixed(2);
  const link = 'https://www.strava.com/athletes/23360470';

  return (
    <div className="grid w-full grid-cols-1 gap-4 my-2 sm:grid-cols-2">
      <MetricCard
        header="Runs in the last 4 weeks"
        link={link}
        metric={recentRuns}
        isCurrency={false}
        isRunDistance={false}
      />
      <MetricCard
        header="Distance in the last 4 weeks"
        link={link}
        metric={recentDistance}
        isCurrency={false}
        isRunDistance={true}
      />
      <MetricCard
        header="Runs in the year"
        link={link}
        metric={ytdRuns}
        isCurrency={false}
        isRunDistance={false}
      />
      <MetricCard
        header="Distance in the year"
        link={link}
        metric={ytdDistance}
        isCurrency={false}
        isRunDistance={true}
      />
    </div>
  );
}
