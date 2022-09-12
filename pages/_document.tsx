// import * as gtag from 'lib/gtag';
import { Head, Html, Main, NextScript } from 'next/document';

export default function Document(props) {
  // let gaTagManagerScript;
  // let gaStartScript;
  // if (process.env.NODE_ENV === 'production') {
  //   gaTagManagerScript = 
  //   <script
  //     async
  //     src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
  //   />
    
  //   gaStartScript = 
  //   <script
  //     dangerouslySetInnerHTML={{
  //       __html: `
  //         window.dataLayer = window.dataLayer || [];
  //         function gtag(){dataLayer.push(arguments);}
  //         gtag('js', new Date());
  //         gtag('config', '${gtag.GA_TRACKING_ID}', {
  //         page_path: window.location.pathname,
  //         });
  //       `
  //     }}
  //   />
  // }

  return (
    <Html lang="en">
      <Head>
        <link
          rel="preload"
          href="/fonts/Outfit-VariableFont_wght.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
        <link href="/static/favicons/favicon.ico" rel="shortcut icon" />
        <link href="/static/favicons/site.webmanifest" rel="manifest" />
        <link
          href="/static/favicons/apple-touch-icon.png"
          rel="apple-touch-icon"
          sizes="180x180"
        />
        <link
          href="/static/favicons/favicon-32x32.png"
          rel="icon"
          sizes="32x32"
          type="image/png"
        />
        <link
          href="/static/favicons/favicon-16x16.png"
          rel="icon"
          sizes="16x16"
          type="image/png"
        />
        <link
          color="#4a9885"
          href="/static/favicons/safari-pinned-tab.svg"
          rel="mask-icon"
        />
        <meta content="#ffffff" name="theme-color" />
        <meta content="#ffffff" name="msapplication-TileColor" />
        <meta
          content="/static/favicons/browserconfig.xml"
          name="msapplication-config"
        />
        <meta content="7081e8ebb22b592f" name="yandex-verification" />
        {/* {gaTagManagerScript}
        {gaStartScript} */}
      </Head>
      <body className="antialiased bg-white text-slate-500 dark:text-slate-400 dark:bg-slate-900">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
