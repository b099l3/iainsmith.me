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
      <a className="p-3 mb-8 bg-white rounded-md shadow-sm dark:bg-slate-900 hover:from-white hover:to-white hover:via-slate-50 hover:bg-gradient-to-tl dark:hover:bg-gradient-to-tl dark:hover:from-slate-900 dark:hover:via-slate-800 dark:hover:to-slate-900 dark:hover:ring-slate-700 hover:ring-slate-200 hover:shadow-lg group ring-2 dark:ring-slate-700 ring-slate-200">
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
          <p className="mb-4 text-gray-600 dark:text-gray-400">{summary}</p>
          <div className="flex flex-col justify-between md:flex-row">
            
            <p className="w-64 text-left text-gray-500 md:text-left md:mb-0">
              {format(parseISO(postPublishedAt), 'MMMM dd, yyyy')}
            </p>

            <p className="w-64 mb-2 text-left text-gray-500 md:text-right md:mb-0">
              {`${views ? new Number(views).toLocaleString() : '–––'} views`}
            </p>
          </div>
        </div>
      </a>
    </Link>
  );
}
