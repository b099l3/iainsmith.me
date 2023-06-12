import type { Category } from 'contentlayer/generated';
import type { PropsWithChildren } from 'react';

export default function CategoryLayout({
  children,
  category
}: PropsWithChildren<{ category: Category }>) {
  return (
      <article className="flex flex-col items-start justify-center w-full max-w-2xl mx-auto mb-16">
        <div className="flex justify-between w-full mb-8">
          <div>
            <h1 className="mb-4 text-3xl font-bold tracking-tight text-black md:text-5xl dark:text-white">
              {category.title}
            </h1>
          </div>
        </div>
        <div className="w-full prose dark:prose-dark">{children}</div>
      </article>
  );
}
