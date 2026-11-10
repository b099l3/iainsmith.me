import { writeFileSync } from 'fs';
import RSS from 'rss';
import { getCanonicalUrl, SITE_ORIGIN } from '../lib/seo.mjs';
import allBlogs from '../.contentlayer/generated/Blog/_index.json' with { type: 'json' };

async function generate() {
  const feed = new RSS({
    title: 'Iain Smith',
    site_url: getCanonicalUrl('/'),
    feed_url: `${SITE_ORIGIN}/feed.xml`
  });

  allBlogs
    .filter((post) => !post.categories.includes('draft'))
    .forEach((post) => {
      feed.item({
        title: post.title,
        url: getCanonicalUrl(`/blog/${post.slug}`),
        // Keep existing item IDs so subscribers don't receive duplicate posts.
        guid: `https://iainsmith.me/blog/${post.slug}`,
        date: post.publishedAt,
        description: post.summary
      });
    });

  writeFileSync('./public/feed.xml', feed.xml({ indent: true }));
}

generate();
