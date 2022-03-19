import LoadingSpinner from 'components/LoadingSpinner';
import MetricCard from 'components/metrics/Card';
import fetcher from 'lib/fetcher';
import { GitHub } from 'lib/types';
import useSWR from 'swr';


export default function GitHubCard() {
  const { data } = useSWR<GitHub>('/api/github', fetcher);

  if (!data) {
    return <LoadingSpinner/>;
  }
  const stars = new Number(data?.stars);
  const link = 'https://github.com/b099l3';

  return (
    <MetricCard
      header="GitHub Stars"
      link={link}
      metric={stars}
      isCurrency={false}
      isRunDistance={false}
    />
  );
}
