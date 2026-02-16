import components from 'components/MDXComponents';
import Tweet from 'components/Tweet';
import type { Blog } from 'contentlayer/generated';
import { allBlogs, allCategories } from 'contentlayer/generated';
import BlogLayout from 'layouts/blog';
import { getTweets } from 'lib/twitter';
import { useMDXComponent } from 'next-contentlayer/hooks';

export default function Post({ post, tweets, categories }: { post: Blog; tweets: any[]; categories:any[] }) {
  const Component = useMDXComponent(post.body.code);
  const StaticTweet = ({ id }) => {
    const tweet = tweets.find((tweet) => tweet.id === id);
    if (!tweet) {
      return null;
    }

    return <Tweet {...tweet} />;
  };

  return (
    <BlogLayout post={post} categories={categories}>
      <Component
        components={
          {
            ...components,
            StaticTweet
          } as any
        }
      />
    </BlogLayout>
  );
}

export async function getStaticPaths() {
  return {
    paths: allBlogs.map((post) => ({ params: { slug: post.slug } })),
    fallback: false
  };
}

export async function getStaticProps({ params }) {
  const post = allBlogs.find((post) => post.slug === params.slug);
  if (!post) {
    return { notFound: true };
  }

  const categories = allCategories.filter((cat) => post.categories.includes(cat.slug));
  const tweets = await getTweets(post.tweetIds).catch(() => []);
  return { props: { post, tweets, categories } };
}
