import { useAnalytics } from 'lib/analytics';
import { ThemeProvider } from 'next-themes';
import 'styles/global.css';


export default function App({
  Component,
  pageProps: { session, ...pageProps }
}) {
  useAnalytics();

  return (
      <ThemeProvider attribute="class">
        <Component {...pageProps} />
      </ThemeProvider>
  );
}
