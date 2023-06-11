import cn from 'classnames';
import fetcher from 'lib/fetcher';
import { Views } from 'lib/types';
import Link from 'next/link';
import useSWR from 'swr';



export default function BlogPostCard({ title, categories, slug, gradient }) {
  const { data } = useSWR<Views>(`/api/views/${slug}`, fetcher);
  const views = data?.total;
 // const categoriesUI = categories.map((category) => <Category category={category}/>);

  return (
    <Link href={`/blog/${slug}`}>
      <a
        className={cn(
          'transform hover:scale-[1.01] transition-all',
          'rounded-xl w-full md:w-1/3 bg-gradient-to-r p-1',
          gradient
        )}
      >
        <div className="flex flex-col justify-between h-full p-4 bg-white rounded-lg dark:bg-gray-900">
          <div className="flex flex-col justify-between md:flex-row">
            <h4 className="w-full mb-6 text-lg font-medium tracking-tight text-gray-900 md:text-lg sm:mb-10 dark:text-gray-100">
              {title}
            </h4>
          </div>
          <div className="flex flex-col justify-between">
          <div className="flex items-center text-gray-800 dark:text-gray-200 capsize">
          {/* {categoriesUI} */}
          </div>
          <div className="flex items-center text-gray-800 dark:text-gray-200 capsize">
            <span className="inline-flex items-center py-1 text-sm leading-none text-gray-800 dark:text-gray-200">
            <svg className="w-4 h-4 mr-2" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
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
