import LatestActivityCard from 'components/links/LatestActivityCard';
import LinkCard from 'components/links/LinkCard';
import SocialIconLink from 'components/links/SocialIconLink';
import type { LinksPage } from 'contentlayer/generated';
import Head from 'next/head';
import Image from 'next/image';
import {
  Fragment,
  useEffect,
  useState,
  type CSSProperties,
  type PropsWithChildren
} from 'react';
import styles from 'styles/links-page.module.css';

type LinksLayoutProps = {
  linksPage: LinksPage;
  onTrackLinkClick: (
    kind: 'profile' | 'link' | 'social',
    label: string,
    url: string
  ) => void;
};

function getSocialAnimationDelay(index: number): CSSProperties {
  return { animationDelay: `${90 + index * 60}ms` };
}

function getLinkAnimationDelay(index: number): CSSProperties {
  return { animationDelay: `${140 + index * 80}ms` };
}

function renderBioWithRunThreadLink(
  bio: string,
  onTrackLinkClick: (
    kind: 'profile' | 'link' | 'social',
    label: string,
    url: string
  ) => void
) {
  const runThreadUrl = 'https://runthread.app';
  const parts = bio.split(/(runthread)/gi);

  if (parts.length === 1) {
    return bio;
  }

  return parts.map((part, index) => {
    if (part.toLowerCase() !== 'runthread') {
      return <Fragment key={`${part}-${index}`}>{part}</Fragment>;
    }

    return (
      <a
        key={`runthread-${index}`}
        href={runThreadUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => onTrackLinkClick('link', 'runthread-bio', runThreadUrl)}
        className="underline decoration-zinc-500/70 decoration-[0.08em] underline-offset-2"
      >
        RunThread
      </a>
    );
  });
}

export default function LinksLayout({
  children,
  linksPage,
  onTrackLinkClick
}: PropsWithChildren<LinksLayoutProps>) {
  const canonicalUrl = 'https://iainsmith.me/links';
  const heroImage = '/static/images/links/hero-portrait.jpg';
  const bottomImageWebp = '/static/images/links/bottom-editorial.webp';
  const bottomImageJpg = '/static/images/links/bottom-editorial.jpg';
  const [bottomImageSrc, setBottomImageSrc] = useState(bottomImageWebp);
  const [updatedAt, setUpdatedAt] = useState('--:--');
  const [updatedCity, setUpdatedCity] = useState('LOCAL');
  const openGraphImage = `https://iainsmith.me${heroImage}`;
  const activeLinks = linksPage.links.filter((link) => link.active !== false);
  const activeSocials = (linksPage.socials || []).filter(
    (social) => social.active !== false
  );
  const stravaProfileUrl =
    activeSocials.find((social) => social.label.toLowerCase().includes('strava'))
      ?.url || 'https://www.strava.com/athletes/23360470';

  useEffect(() => {
    const updateMeta = () => {
      const now = new Date();
      const nextTime = now.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      });
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';
      const nextCity =
        timezone
          .split('/')
          .pop()
          ?.replace(/_/g, ' ')
          .toUpperCase() || 'LOCAL';

      setUpdatedAt(nextTime);
      setUpdatedCity(nextCity);
    };

    updateMeta();
    const timer = window.setInterval(updateMeta, 60 * 1000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <>
      <Head>
        <title>{`${linksPage.title} - Links`}</title>
        <meta name="robots" content="follow, index" />
        <meta name="description" content={linksPage.bio} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={`${linksPage.title} - Links`} />
        <meta property="og:description" content={linksPage.bio} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={openGraphImage} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${linksPage.title} - Links`} />
        <meta name="twitter:description" content={linksPage.bio} />
        <meta name="twitter:image" content={openGraphImage} />
        <link rel="canonical" href={canonicalUrl} />
      </Head>

      <main className={styles.page}>
        <div className={`${styles.surface} mx-auto w-full max-w-md px-3 py-6 sm:px-4 sm:py-8`}>
          <section className={`${styles.heroPanel} ${styles.cardEnter}`}>
            <div className={styles.heroMedia}>
              <div className={styles.heroImageLink}>
                <Image
                  src={heroImage}
                  alt={`${linksPage.title} running portrait`}
                  width={1536}
                  height={2304}
                  priority
                  sizes="(max-width: 640px) 96vw, 420px"
                  className={styles.heroImage}
                />
                <span className={styles.heroTag}>[RUN // BUILD // SHARE]</span>
                <span className={styles.sectionKicker}>[(IAIN SMITH)]</span>
              </div>
            </div>

            <div className={styles.heroInfo}>
              <p className={styles.metaRow}>
                <span>[UPDATED {updatedAt}]</span> <span>[{updatedCity}]</span>
              </p>
              <p className={styles.profileBio}>
                {renderBioWithRunThreadLink(linksPage.bio, onTrackLinkClick)}
              </p>

              {activeSocials.length > 0 ? (
                <div className={styles.socialRow}>
                  {activeSocials.map((social, index) => (
                    <div
                      key={`${social.label}-${social.url}`}
                      className={styles.socialEnter}
                      style={getSocialAnimationDelay(index)}
                    >
                      <SocialIconLink
                        label={social.label}
                        url={social.url}
                        onClick={(label, url) =>
                          onTrackLinkClick('social', label, url)
                        }
                      />
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </section>

          <div className={styles.cardEnter} style={{ animationDelay: '180ms' }}>
            <LatestActivityCard
              athleteUrl={stravaProfileUrl}
              onClick={(label, url) => onTrackLinkClick('link', label, url)}
            />
          </div>

          <section className={styles.linksSection}>
            {activeLinks.map((link, index) => (
              <div
                key={`${link.label}-${link.url}`}
                className={styles.cardEnter}
                style={getLinkAnimationDelay(index)}
              >
                <LinkCard
                  index={index}
                  label={link.label}
                  url={link.url}
                  description={link.description}
                  featured={link.featured}
                  onClick={(label, url) => onTrackLinkClick('link', label, url)}
                />
              </div>
            ))}
          </section>

          <section className={styles.notesCard}>
            <div className="prose prose-sm max-w-none text-zinc-600 prose-p:my-2 prose-p:text-zinc-600 prose-li:text-zinc-600 prose-headings:text-zinc-900 prose-a:text-zinc-900 prose-a:decoration-zinc-500/60 prose-strong:text-zinc-800">
              {children}
            </div>
          </section>

          <section className={`${styles.bottomImagePanel} ${styles.cardEnter}`}>
            <div className={styles.bottomImageLink}>
              <Image
                src={bottomImageSrc}
                alt="Editorial running image"
                width={1536}
                height={2304}
                sizes="(max-width: 640px) 96vw, 420px"
                className={styles.bottomImage}
                onError={() => {
                  if (bottomImageSrc !== bottomImageJpg) {
                    setBottomImageSrc(bottomImageJpg);
                  }
                }}
              />
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
