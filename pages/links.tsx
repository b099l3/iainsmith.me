import components from 'components/MDXComponents';
import type { LinksPage as LinksDocument } from 'contentlayer/generated';
import { allLinksPages } from 'contentlayer/generated';
import * as gtag from 'lib/gtag';
import LinksLayout from 'layouts/links';
import { useMDXComponent } from 'next-contentlayer/hooks';

type LinksProps = {
  linksPage: LinksDocument;
};

export default function Links({ linksPage }: LinksProps) {
  const Component = useMDXComponent(linksPage.body.code);

  const trackLinkClick = (
    kind: 'profile' | 'link' | 'social',
    label: string,
    url: string
  ) => {
    try {
      gtag.event({
        action: 'click_link',
        category: 'links_page',
        label: `${kind}:${label}:${url}`,
        value: 1
      });
    } catch {
      // noop
    }
  };

  return (
    <LinksLayout linksPage={linksPage} onTrackLinkClick={trackLinkClick}>
      <Component components={components as any} />
    </LinksLayout>
  );
}

export async function getStaticProps() {
  const linksPage = allLinksPages.find((page) => page.slug === 'links');
  if (!linksPage) {
    return { notFound: true };
  }

  return { props: { linksPage } };
}
