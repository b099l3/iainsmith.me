import components from 'components/MDXComponents';
import type { OtherPage } from 'contentlayer/generated';
import { allOtherPages } from 'contentlayer/generated';
import NowLayout from 'layouts/now';
import { useMDXComponent } from 'next-contentlayer/hooks';

export default function Now({ body: { code } }: OtherPage) {
  const Component = useMDXComponent(code);

  return (
    <NowLayout>
      <Component components={components as any} />
    </NowLayout>
  );
}

export async function getStaticProps() {
  const now = allOtherPages.find((page) => page.slug === 'now')!;

  return { props: now };
}
