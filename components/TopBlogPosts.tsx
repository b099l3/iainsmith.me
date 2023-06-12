import BlogPost from 'components/BlogPost';
import { allBlogs, allCategories } from 'contentlayer/generated';
import fetcher from 'lib/fetcher';
import { TopPostViews } from 'lib/types';
import { pick } from 'lib/utils';
import useSWR from 'swr';
import LoadingSpinner from './LoadingSpinner';


export default function TopblogPosts() {
  const { data } = useSWR<TopPostViews>(`/api/views/top-posts`, fetcher);

  if (!data) {
    return <LoadingSpinner/>;
  }
 
  const topBlogPosts = data.topViews.map(topView => {
    return allBlogs
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
      .find(blog => blog.slug.toLowerCase() === topView.slug.toLowerCase())
      
  });

  return (
    <>
      {topBlogPosts.map((post) => (
        <BlogPost key={post.title} {...post} />
      ))}
    </>
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
