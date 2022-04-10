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

  const topBlogPosts = data.topViews.map(topView => {
    return allBlogs.find(blog => blog.slug.toLowerCase() === topView.slug.toLowerCase())
  });

  return (
    <>
      {topBlogPosts.map((post) => (
        <BlogPost key={post.title} {...post} />
      ))}
    </>
  );
}
