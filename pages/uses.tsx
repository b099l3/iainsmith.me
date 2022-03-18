import components from 'components/MDXComponents';
import type { OtherPage } from 'contentlayer/generated';
import { allOtherPages } from 'contentlayer/generated';
import UsesLayout from 'layouts/uses';
import { useMDXComponent } from 'next-contentlayer/hooks';

export default function Uses({ body: { code } }: OtherPage) {
  const Component = useMDXComponent(code);

  return (
    <UsesLayout>
      <Component components={components as any} />
    </UsesLayout>
  );
}

export async function getStaticProps() {
  const uses = allOtherPages.find((page) => page.slug === 'uses')!;

  return { props: uses };
}
