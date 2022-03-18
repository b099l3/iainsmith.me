import { useAnalytics } from 'lib/analytics';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';
import type { AppProps } from 'next/app';
import 'styles/global.css';


export default function App({ Component, pageProps }: AppProps) {
  useAnalytics();

  return (
    <SessionProvider session={pageProps.session}>
      <ThemeProvider attribute="class">
        <Component {...pageProps} />
      </ThemeProvider>
    </SessionProvider>
  );
}
