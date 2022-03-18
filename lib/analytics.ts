import * as gtag from 'lib/gtag';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export const useAnalytics = () => {
  const router = useRouter();

  useEffect(() => {

    const onRouteChangeComplete = (url: URL) => {
      gtag.pageview(url);
    };

    router.events.on('routeChangeComplete', onRouteChangeComplete);

    return () => {
      router.events.off('routeChangeComplete', onRouteChangeComplete);
    };
  }, [router.events]);
};
