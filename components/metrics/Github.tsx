import MetricCard from 'components/metrics/Card';
import fetcher from 'lib/fetcher';
import { GitHub } from 'lib/types';
import useSWR from 'swr';
import SkeletonCard from './SkeletonCard';


export default function GitHubCard() {
  const { data } = useSWR<GitHub>('/api/github', fetcher);

  if (!data) {
    return <SkeletonCard 
    header="GitHub Stars"/>;
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
