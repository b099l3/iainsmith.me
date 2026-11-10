import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';
import { globby } from 'globby';
import { getCanonicalUrl } from '../lib/seo.mjs';

const origin = 'https://www.iainsmith.me';
const read = (file) => readFile(file, 'utf8');
const htmlFiles = await globby('.next/server/pages/**/*.html');
assert.ok(htmlFiles.length, 'Run yarn build before yarn test:seo');
const pages = await Promise.all(
  htmlFiles.map(async (file) => ({
    route: file
      .replace('.next/server/pages', '')
      .replace(/\.html$/, '')
      .replace(/^\/index$/, '/'),
    html: await read(file)
  }))
);
const sitemap = await read('public/sitemap.xml');
const sitemapUrls = [...sitemap.matchAll(/<loc\s*>([^<]+)<\/loc\s*>/g)].map(
  (match) => match[1].trim()
);

function tags(html, tagName) {
  return [...html.matchAll(new RegExp(`<${tagName}\\b[^>]*>`, 'g'))].map(
    (match) =>
      Object.fromEntries(
        [...match[0].matchAll(/([\w:-]+)="([^"]*)"/g)].map((attr) => [
          attr[1],
          attr[2]
        ])
      )
  );
}

function meta(html, key) {
  return tags(html.split('</head>')[0], 'meta').find(
    (tag) => tag.name === key || tag.property === key
  )?.content;
}

test('tracking queries, fragments and trailing slashes preserve the page canonical', () => {
  for (const input of ['', '/', '/?utm_source=test', '/#skip']) {
    assert.equal(getCanonicalUrl(input), `${origin}/`);
  }
  for (const input of [
    '/blog',
    '/blog/',
    '/blog?utm_source=test',
    '/blog/?utm_source=test#skip'
  ]) {
    assert.equal(getCanonicalUrl(input), `${origin}/blog`);
  }
  assert.equal(
    getCanonicalUrl(
      '/blog/future-proof-your-flutter-env?utm_source=test#-working-with-one-tool-version'
    ),
    `${origin}/blog/future-proof-your-flutter-env`
  );
});

test('every generated content page has one self-canonical and matching Open Graph URL', () => {
  for (const { route, html } of pages.filter(
    (page) => !['/404', '/500'].includes(page.route)
  )) {
    const canonicals = tags(html.split('</head>')[0], 'link').filter(
      (tag) => tag.rel === 'canonical'
    );
    assert.deepEqual(
      canonicals.map((tag) => tag.href),
      [`${origin}${route}`],
      route
    );
    assert.equal(meta(html, 'og:url'), `${origin}${route}`, route);
  }
});

test('the sitemap contains exactly the indexable generated pages, including the snippets index', () => {
  const expected = pages
    .filter(
      ({ route, html }) =>
        !['/404', '/500'].includes(route) &&
        !meta(html, 'robots')?.includes('noindex')
    )
    .map(({ route }) => `${origin}${route}`);
  assert.equal(
    new Set(sitemapUrls).size,
    sitemapUrls.length,
    'duplicate sitemap URLs'
  );
  assert.ok(sitemapUrls.includes(`${origin}/snippets`));
  assert.deepEqual([...sitemapUrls].sort(), expected.sort());
});

test('draft previews and empty categories stay accessible but out of search and feeds', async () => {
  const blogs = JSON.parse(
    await read('.contentlayer/generated/Blog/_index.json')
  );
  const categories = JSON.parse(
    await read('.contentlayer/generated/Category/_index.json')
  );
  const feed = await read('public/feed.xml');
  const excluded = [
    ...categories
      .filter(
        (category) =>
          category.slug === 'draft' ||
          !blogs.some(
            (post) =>
              !post.categories.includes('draft') &&
              post.categories.includes(category.slug)
          )
      )
      .map((category) => `/category/${category.slug}`),
    ...blogs
      .filter((post) => post.categories.includes('draft'))
      .map((post) => `/blog/${post.slug}`)
  ];
  for (const route of excluded) {
    const page = pages.find((page) => page.route === route);
    assert.ok(page, `preview route still exists: ${route}`);
    assert.ok(meta(page.html, 'robots').includes('noindex'), route);
    assert.ok(!sitemapUrls.includes(`${origin}${route}`), route);
    assert.ok(!feed.includes(`${origin}${route}`), route);
  }
  assert.ok(
    !meta(
      pages.find((page) => page.route === '/category/flutter').html,
      'robots'
    ).includes('noindex')
  );
});

test('rendered internal links resolve to a generated page or public file without redirects', async () => {
  const routes = new Set(pages.map((page) => page.route));
  for (const { route, html } of pages) {
    for (const { href } of tags(html, 'a')) {
      if (!href || href.startsWith('#')) continue;
      const url = new URL(href.replaceAll('&amp;', '&'), `${origin}${route}`);
      if (!['www.iainsmith.me', 'iainsmith.me'].includes(url.hostname))
        continue;
      assert.equal(url.origin, origin, `${route}: ${href}`);
      assert.ok(
        url.pathname === '/' || !url.pathname.endsWith('/'),
        `${route}: ${href}`
      );
      if (routes.has(url.pathname)) continue;
      await assert.doesNotReject(
        access(path.join('public', decodeURIComponent(url.pathname))),
        `${route}: ${href}`
      );
    }
  }
});

test('RSS and robots.txt use the same preferred hostname', async () => {
  const feed = await read('public/feed.xml');
  assert.ok(feed.includes(`${origin}/feed.xml`));
  for (const [, link] of feed.matchAll(/<link>([^<]+)<\/link>/g)) {
    assert.equal(new URL(link).origin, origin);
  }
  for (const item of feed.match(/<item>[\s\S]*?<\/item>/g) || []) {
    const link = item.match(/<link>([^<]+)<\/link>/)[1];
    const guid = item.match(/<guid[^>]*>([^<]+)<\/guid>/)[1];
    assert.equal(guid, link.replace(origin, 'https://iainsmith.me'));
  }
  assert.ok(
    (await read('public/robots.txt')).includes(`Sitemap: ${origin}/sitemap.xml`)
  );
});
