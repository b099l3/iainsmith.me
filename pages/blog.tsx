import BlogPost from 'components/BlogPost';
import Container from 'components/Container';
import type { Blog, Category as BlogCategory } from 'contentlayer/generated';
import { allBlogs, allCategories } from 'contentlayer/generated';
import { pick } from 'lib/utils';
import { InferGetStaticPropsType } from 'next';
import { Suspense, useState } from 'react';

export interface BlogWithCategories extends Blog {
  postCategories: BlogCategory[];
}

export default function Blog({
  posts
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [searchValue, setSearchValue] = useState('');
  const filteredBlogPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchValue.toLowerCase()) ||
    post.summary.toLowerCase().includes(searchValue.toLowerCase()) ||
    post.categories.includes(searchValue.toLowerCase())
  );

  return (
    <Suspense fallback={null}>
      <Container
        title="Blog – Iain Smith"
        description="Thoughts on the software industry, programming, tech, videography, music, and my personal life."
      >
        <div className="flex flex-col items-start justify-center max-w-2xl mx-auto mb-16">
          <h1 className="pb-4 mb-4 text-3xl font-bold tracking-tight text-transparent md:text-5xl bg-clip-text bg-gradient-to-r from-indigo-500 via-teal-500 to-indigo-500 animate-text">
            Blog
          </h1>
          <p className="mb-4 text-gray-600 dark:text-gray-400">
            {`Hey! I'm Iain. Welcome to my blog. Here's every post I've ever written, mostly about mobile development.
              In total, I've written ${posts.length} articles on my blog. I write to share what I learned.
              Use the search below to filter by title, category or sub text.`}
          </p>
          <div className="relative w-full mb-16">
            <input
              aria-label="Search articles"
              type="text"
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search articles"
              className="block w-full px-4 py-2 text-gray-900 bg-white border border-gray-200 rounded-md dark:border-gray-900 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-gray-100"
            />
            <svg
              className="absolute w-5 h-5 text-gray-400 right-3 top-3 dark:text-gray-300"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          {/* {!searchValue && (
            <>
              <h3 className="mt-8 mb-4 text-2xl font-bold text-transparent md:text-4xl bg-clip-text bg-gradient-to-r from-indigo-500 via-teal-500 to-indigo-500 animate-text">
                Most Popular
              </h3>
              <TopBlogPosts />
            </>
          )} */}
          {/* <h3 className="mt-8 mb-4 text-2xl font-bold tracking-tight text-black md:text-4xl dark:text-white"> */}
          {/* <h3 className="mt-8 mb-4 text-2xl font-bold text-transparent md:text-4xl bg-clip-text bg-gradient-to-r from-indigo-500 via-teal-500 to-indigo-500 animate-text">
            All Posts
          </h3> */}
          {!filteredBlogPosts.length && (
            <p className="mb-4 text-gray-600 dark:text-gray-400">
              No posts found.
            </p>
          )}
          {filteredBlogPosts.map((post) => (
            <BlogPost key={post.title} {...post}/>
          ))}
        </div>
      </Container>
      </Suspense>
  );
}

export function getStaticProps() {
  const posts = allBlogs
  .filter((post) => !post.categories.includes('draft'))
  .map((post) => {
    const postCategories = post.categories.map((cat) => {
      return allCategories.find((category) => category.slug === cat);
    });
    return {
      ...post,
      postCategories: postCategories || [],
    };
  })
    .map((post) => pick(post, ['slug', 'title', 'categories', 'summary', 'publishedAt', 'postCategories']))
    .sort(
      (a, b) =>
        Number(new Date(b.publishedAt)) - Number(new Date(a.publishedAt))
    );
  return { props: { posts } };
}
