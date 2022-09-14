import { useAnalytics } from 'lib/analytics';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';
import 'styles/global.css';


export default function App({
  Component,
  pageProps: { session, ...pageProps }
}) {
  useAnalytics();

  return (
    <SessionProvider session={session}>
      <ThemeProvider attribute="class">
        <Component {...pageProps} />
      </ThemeProvider>
    </SessionProvider>
  );
}
