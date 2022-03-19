import LoadingSpinner from 'components/LoadingSpinner';
import MetricCard from 'components/metrics/Card';
import fetcher from 'lib/fetcher';
import { Views } from 'lib/types';
import useSWR from 'swr';


export default function AnalyticsCard() {
  const { data } = useSWR<Views>('/api/views', fetcher);

  if (!data) {
    return <LoadingSpinner/>;
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
