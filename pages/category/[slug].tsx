import BlogPost from 'components/BlogPost';
import Container from 'components/Container';
import components from 'components/MDXComponents';
import { allBlogs, allCategories } from 'contentlayer/generated';
import CategoryLayout from 'layouts/category';
import { pick } from 'lib/utils';
import { InferGetStaticPropsType } from 'next';
import { useMDXComponent } from 'next-contentlayer/hooks';
import { Suspense } from 'react';

export default function CategoryPage({
  posts,
  category
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const Component = useMDXComponent(category.body.code);

  return (
    <Suspense fallback={null}>
      <Container 
        title={`${category.title} posts by – Iain Smith`}
      >
        <div className="flex flex-col items-start justify-center max-w-2xl mx-auto mb-16">  
        <CategoryLayout category={category}>
          <Component components={components as any} />
        </CategoryLayout>
            {!posts.length && (
              <p className="mb-4 text-gray-600 dark:text-gray-400">
                No posts found.
              </p>
            )}
            {posts.map((post) => (
              <BlogPost key={post.title} {...post}/>
            ))}
        </div>
      </Container>
    </Suspense>
  )
}


export function getStaticPaths() {
  return {
    paths: allCategories.map((cat) => ({ params: { slug: cat.slug } })),
    fallback: false
  };
}

export function getStaticProps({ params }) {
  const category = allCategories.find(
    (category) => category.slug === params.slug
  );

  const isDrafts = category.slug.toLowerCase() === 'draft'

  const posts = allBlogs
  .filter((post) => {
    if (isDrafts) {
return post.categories.includes(category.slug.toLowerCase())
    }
    return !post.categories.includes('draft') 
    && post.categories.includes(category.slug.toLowerCase())}
  )
  .map((post) => {
    const postCategories = post.categories.filter((cat) => {
      if(!isDrafts){
        return cat !== 'draft'
      } 
      return true;
    })
    .map((cat) => {
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

  return { props: { posts, category } };

}
