import Category from 'components/Category';
import Container from 'components/Container';
import ViewCounter from 'components/ViewCounter';
import type { Blog, Category as BlogCategory } from 'contentlayer/generated';
import { format, parseISO } from 'date-fns';
import Image from 'next/image';
import type { PropsWithChildren } from 'react';
import { BsArrowUpCircle } from "react-icons/bs";

const editUrl = (slug) =>
  `https://github.com/b099l3/iainsmith.me/edit/main/data/blog/${slug}.mdx`;
const discussUrl = (slug) =>
  `https://mobile.twitter.com/search?q=${encodeURIComponent(
    `https://iainsmith.me/blog/${slug}`
  )}`;

export default function BlogLayout({
  children,
  post,
  categories
}: PropsWithChildren<{ post: Blog, categories: BlogCategory[] }>) {
  
  const categoriesUI = categories.map((category) => <Category key={category.slug} category={category}/>);

  return (
    <Container
      title={`${post.title} – Iain Smith`}
      description={post.summary}
      image={`https://iainsmith.me${post.image}`}
      date={new Date(post.publishedAt).toISOString()}
      type="article"
    >
      <article className="flex flex-col items-start justify-center w-full max-w-2xl mx-auto mb-16">
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-black md:text-5xl dark:text-white">
          {post.title}
        </h1>
        <div className="flex flex-col items-start justify-between w-full mt-2 md:flex-row md:items-center">
          <div className="flex items-center">
            <Image
              alt="Iain Smith"
              height={24}
              width={24}
              src="/avatar.jpg"
              className="rounded-full"
            />
            <p className="ml-2 text-sm text-gray-700 dark:text-gray-300">
              {'Iain Smith / '}
              {format(parseISO(post.publishedAt), 'MMMM dd, yyyy')}
            </p>
          </div>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 min-w-32 md:mt-0">
            {post.readingTime.text}
            {` • `}
            <ViewCounter slug={post.slug} />
          </p>
        </div>
        <div className="flex flex-row items-start justify-start w-full mt-2 space-x-2">
          {categoriesUI}
        </div>
        <div className="w-full mt-4 prose dark:prose-dark max-w-none">
          {children}
        </div>
        <div className="flex flex-row justify-between w-full my-16 text-sm text-gray-700 dark:text-gray-300">
        <div><a
            className="flex flex-row space-x-8"
            href={discussUrl(post.slug)}
            target="_blank"
            rel="noopener noreferrer"
          >
            {'Discuss on Twitter'}
          </a>
          </div>
          <div>
          <BsArrowUpCircle color="gray" fontSize="1.5em"
            onClick={() => {
              window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
            }}
          /></div>
          <div>
          <a className="flex flex-row space-x-8"
            href={editUrl(post.slug)}
            target="_blank"
            rel="noopener noreferrer"
            >
            {'Edit on GitHub'}
          </a>
            </div>
        </div>
      </article>
    </Container>
  );
}
