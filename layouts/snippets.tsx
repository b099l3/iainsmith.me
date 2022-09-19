import Container from 'components/Container';
import type { Snippet } from 'contentlayer/generated';
import Image from 'next/image';
import type { PropsWithChildren } from 'react';


export default function SnippetLayout({
  children,
  snippet
}: PropsWithChildren<{ snippet: Snippet }>) {
  return (
    <Container
      title={`${snippet.title} - Code Snippet`}
      description="A collection of code snippets."
    >
      <article className="flex flex-col items-start justify-center w-full max-w-2xl mx-auto mb-16">
        <div className="flex justify-between w-full mb-8">
          <div>
          <Image
              alt={snippet.title}
              height={100}
              width={100}
              src={`/logos/${snippet.logo}`}
              className="rounded-full"
            />
            <h1 className="mb-4 text-3xl font-bold tracking-tight text-black md:text-5xl dark:text-white">
              {snippet.title}
            </h1>
            <p className="text-gray-700 dark:text-gray-300">
              {snippet.description}
            </p>
          </div>
        </div>
        <div className="w-full prose dark:prose-dark">{children}</div>
      </article>
    </Container>
  );
}
