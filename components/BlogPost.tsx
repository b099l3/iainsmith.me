import { format } from 'date-fns';
import fetcher from 'lib/fetcher';
import { Views } from 'lib/types';
import Link from 'next/link';
import useSWR from 'swr';
import Category from './Category';

import type { Blog, Category as BlogCategory } from 'contentlayer/generated';

type BlogPostProps = Pick<
  Blog,
  'title' | 'summary' | 'slug' | 'publishedAt'
> & {
  postCategories: BlogCategory[];
};

export default function BlogPost({
  title,
  summary,
  slug,
  publishedAt,
  postCategories
}: BlogPostProps) {
  const { data } = useSWR<Views>(`/api/views/${slug}`, fetcher);
  const views = data?.total;
  const postPublishedAt = new Date(publishedAt).toISOString();
  const categoriesUI = postCategories.map((category) => (
    <Category key={category.slug} category={category} />
  ));

  return (
    <Link href={`/blog/${slug}`}>
      <a className="p-3 mb-8 bg-white rounded-md shadow-sm dark:bg-gray-900 hover:from-white hover:to-white hover:via-gray-50 hover:bg-gradient-to-tl dark:hover:bg-gradient-to-tl dark:hover:from-gray-900 dark:hover:via-gray-800 dark:hover:to-gray-900 dark:hover:ring-gray-700 hover:ring-gray-200 hover:shadow-lg group ring-2 dark:ring-gray-700 ring-gray-200">
        <div className="w-full">
          <h4 className="w-full mb-2 text-lg font-medium text-gray-900 md:text-xl dark:text-gray-100">
            {title}
          </h4>
          <p className="my-2 text-sm text-gray-800 dark:text-gray-200">
            {summary}
          </p>
          <div className="flex flex-row justify-start mx-auto space-x-2">
            {categoriesUI}
          </div>
          <div className="flex flex-col justify-between md:flex-row">
            <p className="w-64 text-sm text-left text-gray-800 dark:text-gray-200 md:text-left md:mb-0">
              {format(new Date(postPublishedAt), 'MMMM dd, yyyy')}
            </p>

            <div className="flex items-center text-gray-800 dark:text-gray-200 capsize">
              <span className="inline-flex items-center py-1 text-sm leading-none text-gray-800 dark:text-gray-200">
                <svg
                  className="w-4 h-4 mr-2"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                >
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
                {views ? Number(views).toLocaleString() : '–––'}
              </span>
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
}
