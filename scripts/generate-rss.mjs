import { writeFileSync } from 'fs';
import RSS from 'rss';
import allBlogs from '../.contentlayer/generated/Blog/_index.json' with { type: 'json' };

async function generate() {
  const feed = new RSS({
    title: 'Iain Smith',
    site_url: 'https://iainsmith.me',
    feed_url: 'https://iainsmith.me/feed.xml'
  });

  allBlogs.map((post) => {
    feed.item({
      title: post.title,
      url: `https://iainsmith.me/blog/${post.slug}`,
      date: post.publishedAt,
      description: post.summary
    });
  });

  writeFileSync('./public/feed.xml', feed.xml({ indent: true }));
}

generate();
