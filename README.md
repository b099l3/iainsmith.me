[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https%3A%2F%2Fgithub.com%2Fb099l3%2Fiainsmith.me)

# iainsmith.me

- **Framework**: [Next.js](https://nextjs.org/)
- **Database**: [Vercel Storage](https://vercel.com/storage/postgres)
- **Deployment**: [Vercel](https://vercel.com)
- **Content**: [MDX](https://github.com/mdx-js/mdx)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)

## Learn More

I was highly inspired by [Lee Rob's blog](https://github.com/leerob/leerob.io) and used it as a starting point. I would recommend having a look at his [site](https://leerob.io/) and [YouTube channel](https://www.youtube.com/channel/UCZMli3czZnd1uoc1ShTouQw)

### Differences from lee's blog

- Added categories, e.g., Flutter, How to
- Added Strava integration to dashboard
- Added spinners to dashboard
- Added categories, title, and summary to search
- Added center image component
- Added caption image component
- Added info/warning/success/failure components
- Added Google Analytics
- Added a [now page](https://nownownow.com/about) - https://dawchihliou.github.io/now
- Changed Cons component to have a cross icon
- Changed font to Outfit
- Changed "Most Popular" to come from data
- Changed all Assets to webp

## Overview

- `data/*` - MDX data that is used for blogs, newsletters, and code snippets.
- `layouts/*` - The different page layouts each MDX category (blog, newsletter, snippets) uses.
- `lib/*` - Short for "library", a collection of helpful utilities or code for external services.
- `pages/api/*` - [API routes](https://nextjs.org/docs/api-routes/introduction) powering [`/dashboard`](https://iainsmith.me/dashboard), newsletter subscription, and post views.
- `pages/blog/*` - Static pre-rendered blog pages using MDX.
- `pages/dashboard` - [Personal dashboard](https://iainsmith.me/dashboard) tracking metrics.
- `pages/*` - All other static pages.
- `prisma/*` - My Prisma schema, which uses a PlanetScale MySQL database.
- `public/*` - Static assets including fonts and images.
- `scripts/*` - Two useful scripts to generate an RSS feed and a sitemap.
- `styles/*` - A small amount of global styles. I'm mostly using vanilla Tailwind CSS.

## Running Locally

```bash
$ git clone https://github.com/b099l3/iainsmith.me.git
$ cd iainsmith.me
$ yarn
$ yarn dev
```

Create a `.env` file similar to [`.env.example`](https://github.com/b099l3/iainsmith.me/blob/main/.env.example).

## Cloning / Forking

Please review the [license](https://github.com/b099l3/iainsmith.me/blob/main/LICENSE.txt) and remove all of my personal information (resume, blog posts, images, etc.).

## Making a new post?

- create mdx file in /data/blog/<slug>
- add the meta data, can use the snippet `newpost`:

```
  ---
  title: 'The future-proof solution to manage your Flutter versions: global, FVM, or asdf-vm?'
  publishedAt: '2022-01-26'
  summary: 'Want to try the latest Flutter version but don't want your existing projects to break? Want to have a consistent environment across the dev team? Want to future-proof your dev environment? Let me show you how...'
  image: '/static/images/future-proof-your-flutter-env/banner.webp'
  category: 'Flutter'
  ---
```

- add banner image to /static/images/<slug>/banner.webp
  - If gif, png, jpg - use the [convert script](scripts/convert2webp.sh)
