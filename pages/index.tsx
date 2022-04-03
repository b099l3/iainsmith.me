import Link from 'next/link';
import BlogPostCard from '../components/BlogPostCard';
import Container from '../components/Container';
import ImageWithTheme from '../components/ImageWithTheme';
import Subscribe from '../components/Subscribe';


export default function Home({ videos }) {
  return (
    <Container>
      <div className="flex flex-col items-start justify-center max-w-2xl pb-16 mx-auto border-gray-200 dark:border-gray-700">
        <div className="flex flex-col-reverse items-start sm:flex-row">
          <div className="flex flex-col pr-8">
          <ImageWithTheme
            alt={`Iain Smith`}
            light={`/logo-light.svg`}
            dark={`/logo-dark.svg`}
            width={1627 / 2}
            height={700 / 2}
          />

        <h2 className="mb-12 tracking-tight text-center text-black text-l md:text-xl dark:text-white">
            Helping developers build apps efficiently. 
            </h2>
          </div>
        </div>
        <h3 className="mb-3 text-2xl font-bold tracking-tight text-black md:text-4xl dark:text-white">
          Featured Posts
        </h3>
        <h2 className="tracking-tight text-black mb-9 text-l md:text-xl dark:text-white">
            Blogging about mobile development, productivity, and Flutter.
            </h2>
        <div className="flex flex-col gap-6 md:flex-row">
          <BlogPostCard
            title="Everything I Know About Style Guides, Design Systems, and Component Libraries"
            category="Flutter"
            slug="style-guides-component-libraries-design-systems"
            gradient="from-[#D8B4FE] to-[#818CF8]"
          />
          <BlogPostCard
            title="Rust Is The Future of JavaScript Infrastructure"
            category="Flutter"
            slug="rust"
            gradient="from-[#6EE7B7] via-[#3B82F6] to-[#9333EA]"
          />
          <BlogPostCard
            title="Past, Present, and Future of React State Management"
            category="Flutter"
            slug="react-state-management"
            gradient="from-[#FDE68A] via-[#FCA5A5] to-[#FECACA]"
          />
        </div>
        <Link href="/blog">
          <a className="flex h-6 mt-8 leading-7 text-gray-600 transition-all rounded-lg dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200">
            Read all posts
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="w-6 h-6 ml-1"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.5 12h-15m11.667-4l3.333 4-3.333-4zm3.333 4l-3.333 4 3.333-4z"
              />
            </svg>
          </a>
        </Link>
        <span className="h-16" />
        <Subscribe />
      </div>
    </Container>
  );
}
