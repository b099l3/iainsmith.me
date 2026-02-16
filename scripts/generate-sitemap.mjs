import { writeFileSync } from 'fs';
import { globby } from 'globby';
import prettier from 'prettier';
import allBlogs from '../.contentlayer/generated/Blog/_index.json' with { type: 'json' };

async function generate() {
  const prettierConfig = await prettier.resolveConfig('./.prettierrc.js');
  const pages = await globby([
    'pages/*.tsx',
    'data/**/*.mdx',
    '!data/*.mdx',
    '!pages/_*.tsx',
    '!pages/api',
    '!pages/404.tsx'
  ]);
  const draftBlogRoutes = new Set(
    allBlogs
      .filter((post) => post.categories.includes('draft'))
      .map((post) => `/blog/${post.slug}`)
  );

  const sitemap = `
    <?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${pages
          .map((page) => {
            const path = page
              .replace('pages', '')
              .replace('data', '')
              .replace('.tsx', '')
              .replace('.mdx', '');
            const route = path === '/index' ? '' : path;

            return route;
          })
          .filter((route) => route !== '/category/draft')
          .filter((route) => !draftBlogRoutes.has(route))
          .map((route) => {
            return `
                <url>
                    <loc>${`https://iainsmith.me${route}`}</loc>
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
