import MetricCard from 'components/metrics/Card';
import fetcher from 'lib/fetcher';
import { Subscribers } from 'lib/types';
import useSWR from 'swr';


export default function NewsletterCard() {
  const { data } = useSWR<Subscribers>('/api/subscribers', fetcher);

  const subscriberCount = new Number(data?.count);
  const link = 'https://www.getrevue.co/profile/b099l3';

  return (
    <MetricCard
      header="Newsletter Subscribers"
      link={link}
      metric={subscriberCount}
      isCurrency={false}
    />
  );
}
