import MetricCard from 'components/metrics/Card';
import fetcher from 'lib/fetcher';
import { Views } from 'lib/types';
import useSWR from 'swr';
import SkeletonCard from './SkeletonCard';


export default function AnalyticsCard() {
  const { data } = useSWR<Views>('/api/views', fetcher);

  if (!data) {
    return <SkeletonCard 
    header="All-Time Views"/>;
  }
  
  const pageViews = new Number(data?.total);
  const link = 'https://iainsmith.me';

  return (
    <MetricCard
      header="All-Time Views"
      link={link}
      metric={pageViews}
      isCurrency={false}
      isRunDistance={false}
    />
  );
}
