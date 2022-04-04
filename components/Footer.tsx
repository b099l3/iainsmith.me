import NowPlaying from 'components/NowPlaying';
import Link from 'next/link';


const ExternalLink = ({ href, children }) => (
  <a
    className="text-gray-500 transition hover:text-gray-600"
    target="_blank"
    rel="noopener noreferrer"
    href={href}
  >
    {children}
  </a>
);

export default function Footer() {
  return (
    <footer className="flex flex-col items-start justify-center w-full max-w-2xl mx-auto mb-8">
      <hr className="w-full mb-8 border-gray-200 border-1 dark:border-gray-800" />
      <NowPlaying />
      <div className="grid w-full max-w-2xl grid-cols-1 gap-4 pb-16 sm:grid-cols-3">
        <div className="flex flex-col space-y-4">
          <Link href="/">
            <a className="text-gray-500 transition hover:text-gray-600">Home</a>
          </Link>
          <Link href="/about">
            <a className="text-gray-500 transition hover:text-gray-600">
              About
            </a>
          </Link>
          <Link href="/newsletter">
            <a className="text-gray-500 transition hover:text-gray-600">
              Newsletter
            </a>
          </Link>
        </div>
        <div className="flex flex-col space-y-4">
          <ExternalLink href="https://twitter.com/b099l3">
            Twitter
          </ExternalLink>
          <ExternalLink href="https://github.com/b099l3">GitHub</ExternalLink>
          <ExternalLink href="https://stackoverflow.com/users/1107580/iain-smith">
            StackOverflow
          </ExternalLink>
        </div>
        <div className="flex flex-col space-y-4">
          <Link href="/uses">
            <a className="text-gray-500 transition hover:text-gray-600">Setup</a>
          </Link>
          <Link href="/snippets">
            <a className="text-gray-500 transition hover:text-gray-600">
              Snippets
            </a>
          </Link>
          <Link href="/now">
            <a className="text-gray-500 transition hover:text-gray-600">
              Now
            </a>
          </Link>
        </div>
      </div>
    </footer>
  );
}
