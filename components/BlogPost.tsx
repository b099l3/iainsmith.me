import type { Blog } from 'contentlayer/generated';
import { format, parseISO } from 'date-fns';
import fetcher from 'lib/fetcher';
import { Views } from 'lib/types';
import Link from 'next/link';
import useSWR from 'swr';
import ImageWithTheme from '../components/ImageWithTheme';
import Category from './Category';




export default function BlogPost({
  title,
  category,
  summary,
  slug,
  publishedAt,
}: Pick<Blog, 'title' | 'category' | 'summary' | 'slug' | 'publishedAt' >) {
  const { data } = useSWR<Views>(`/api/views/${slug}`, fetcher);
  const views = data?.total;
  const postPublishedAt = new Date(publishedAt).toISOString()

  return (
    <Link href={`/blog/${slug}`}>
      <a className="p-3 mb-8 bg-white rounded-md shadow-sm dark:bg-gray-900 hover:from-white hover:to-white hover:via-gray-50 hover:bg-gradient-to-tl dark:hover:bg-gradient-to-tl dark:hover:from-gray-900 dark:hover:via-gray-800 dark:hover:to-gray-900 dark:hover:ring-gray-700 hover:ring-gray-200 hover:shadow-lg group ring-2 dark:ring-gray-700 ring-gray-200">
        <div className="w-full">

        <ImageWithTheme className="rounded-lg"
            alt={`Iain Smith`}
            light={`/static/images/${slug}/banner.webp`}
            dark={`/static/images/${slug}/banner.webp`}
            width={1000}
            height={563}
          />
          <Category category={category}/>
          <h4 className="w-full mb-2 text-lg font-medium text-gray-900 md:text-xl dark:text-gray-100">
              {title}
            </h4>
          <p className="mb-4 text-gray-800 dark:text-gray-200">{summary}</p>
          <div className="flex flex-col justify-between md:flex-row">
            
            <p className="w-64 text-left text-gray-800 dark:text-gray-200 md:text-left md:mb-0">
              {format(parseISO(postPublishedAt), 'MMMM dd, yyyy')}
            </p>

            <div className="flex items-center text-gray-800 dark:text-gray-200 capsize">
            
            <span className="inline-flex items-center py-1 text-sm leading-none text-gray-800 dark:text-gray-200">
            <svg className="w-4 h-4 mr-2" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
              <circle cx="12" cy="12" r="3"></circle>
            </svg>
            {views ? new Number(views).toLocaleString() : '–––'}
          </span>
          </div>
          </div>
        </div>
      </a>
    </Link>
  );
}
