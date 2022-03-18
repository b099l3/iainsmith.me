import MetricCard from 'components/metrics/Card';
import fetcher from 'lib/fetcher';
import { GitHub } from 'lib/types';
import useSWR from 'swr';


export default function GitHubCard() {
  const { data } = useSWR<GitHub>('/api/github', fetcher);

  const stars = new Number(data?.stars);
  const link = 'https://github.com/b099l3';

  return (
    <MetricCard
      header="GitHub Stars"
      link={link}
      metric={stars}
      isCurrency={false}
    />
  );
}
