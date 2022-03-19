import BlogPost from 'components/BlogPost';
import { allBlogs } from 'contentlayer/generated';
import fetcher from 'lib/fetcher';
import { TopPostViews } from 'lib/types';
import useSWR from 'swr';
import LoadingSpinner from './LoadingSpinner';


export default function TopblogPosts() {
  const { data } = useSWR<TopPostViews>(`/api/views/top-posts`, fetcher);

  if (!data) {
    return <LoadingSpinner/>;
  }

  const topBlogPosts = allBlogs.filter((post) =>
   data.topViews.some(
      (topPost) => 
        topPost.slug.toLowerCase() === post.slug.toLowerCase()
    )
  );

  return (
    <>
      {topBlogPosts.map((post) => (
        <BlogPost key={post.title} {...post} />
      ))}
    </>
  );
}
