import { writeFileSync } from 'fs';
import { globby } from 'globby';
import prettier from 'prettier';
import { getCanonicalUrl } from '../lib/seo.mjs';
import allBlogs from '../.contentlayer/generated/Blog/_index.json' with { type: 'json' };

async function generate() {
  const prettierConfig = await prettier.resolveConfig('./.prettierrc.js');
  const pages = await globby([
    'pages/**/*.tsx',
    'data/**/*.mdx',
    '!data/*.mdx',
    '!pages/**/_*.tsx',
    '!pages/api/**',
    '!pages/404.tsx',
    '!pages/500.tsx'
  ]);
  const publishedBlogs = allBlogs.filter(
    (post) => !post.categories.includes('draft')
  );
  const publishedBlogRoutes = new Set(
    publishedBlogs.map((post) => `/blog/${post.slug}`)
  );
  const populatedCategoryRoutes = new Set(
    publishedBlogs.flatMap((post) =>
      post.categories.map((category) => `/category/${category}`)
    )
  );

  const routes = [
    ...new Set(
      pages
        // Dynamic templates are represented by their concrete MDX routes below.
        .filter((page) => !page.includes('['))
        .map(
          (page) =>
            page
              .replace(/^(pages|data)/, '')
              .replace(/\.(tsx|mdx)$/, '')
              .replace(/\/index$/, '') || '/'
        )
        .filter(
          (route) =>
            !route.startsWith('/blog/') || publishedBlogRoutes.has(route)
        )
        .filter(
          (route) =>
            !route.startsWith('/category/') ||
            populatedCategoryRoutes.has(route)
        )
    )
  ].sort();

  const sitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${routes
          .map((route) => {
            return `
                <url>
                    <loc>${getCanonicalUrl(route)}</loc>
                </url>
              `;
          })
          .join('')}
    </urlset>
    `;

  const formatted = prettier.format(sitemap, {
    ...prettierConfig,
    parser: 'html'
  });

  // eslint-disable-next-line no-sync
  writeFileSync('public/sitemap.xml', formatted);
}

generate();
