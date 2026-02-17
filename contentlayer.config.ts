import {
  ComputedFields,
  defineDocumentType,
  defineNestedType,
  makeSource
} from 'contentlayer/source-files';
import readingTime from 'reading-time';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrism from 'rehype-prism-plus';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import remarkMdxCodeMeta from 'remark-mdx-code-meta';

const computedFields: ComputedFields = {
  readingTime: { type: 'json', resolve: (doc) => readingTime(doc.body.raw) },
  wordCount: {
    type: 'number',
    resolve: (doc) => doc.body.raw.split(/\s+/gu).length
  },
  tweetIds: {
    type: 'json',
    resolve: (doc) => {
      const tweetMatches = doc.body.raw.match(
        /<StaticTweet\sid="[0-9]+"\s\/>/g
      );
      const tweetIDs = tweetMatches?.map((tweet) => tweet.match(/[0-9]+/g)[0]);
      return tweetIDs ?? [];
    }
  },
  slug: {
    type: 'string',
    resolve: (doc) => doc._raw.sourceFileName.replace(/\.mdx$/, '')
  }
};

const Category = defineDocumentType(() => ({
  name: 'Category',
  filePathPattern: 'category/*.mdx',
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true }
  },
  computedFields
}));

const Blog = defineDocumentType(() => ({
  name: 'Blog',
  filePathPattern: 'blog/*.mdx',
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    publishedAt: { type: 'string', required: true },
    summary: { type: 'string', required: true },
    image: { type: 'string', required: true },
    categories: { type: 'list', of: { type: 'string' }, required: true }
  },
  computedFields
}));

const Newsletter = defineDocumentType(() => ({
  name: 'Newsletter',
  filePathPattern: 'newsletter/*.mdx',
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    publishedAt: { type: 'string', required: true },
    summary: { type: 'string', required: true },
    image: { type: 'string', required: true }
  },
  computedFields
}));

const Snippet = defineDocumentType(() => ({
  name: 'Snippet',
  filePathPattern: 'snippets/*.mdx',
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    description: { type: 'string', required: true },
    logo: { type: 'string', required: true }
  },
  computedFields
}));

const LinkItem = defineNestedType(() => ({
  name: 'LinkItem',
  fields: {
    label: { type: 'string', required: true },
    url: { type: 'string', required: true },
    description: { type: 'string', required: false },
    featured: { type: 'boolean', required: false },
    active: { type: 'boolean', required: false }
  }
}));

const SocialItem = defineNestedType(() => ({
  name: 'SocialItem',
  fields: {
    label: { type: 'string', required: true },
    url: { type: 'string', required: true },
    active: { type: 'boolean', required: false }
  }
}));

const LinksPage = defineDocumentType(() => ({
  name: 'LinksPage',
  filePathPattern: 'links.mdx',
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    bio: { type: 'string', required: true },
    avatar: { type: 'string', required: false },
    links: { type: 'list', of: LinkItem, required: true },
    socials: { type: 'list', of: SocialItem, required: false }
  },
  computedFields
}));

const OtherPage = defineDocumentType(() => ({
  name: 'OtherPage',
  filePathPattern: '{now,uses}.mdx',
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true }
  },
  computedFields
}));

const contentLayerConfig = makeSource({
  contentDirPath: 'data',
  documentTypes: [Blog, Newsletter, Snippet, LinksPage, OtherPage, Category],
  mdx: {
    remarkPlugins: [remarkMdxCodeMeta, remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      rehypePrism,
      [
        rehypeAutolinkHeadings,
        {
          properties: {
            className: ['anchor']
          }
        }
      ]
    ]
  }
});

export default contentLayerConfig;
