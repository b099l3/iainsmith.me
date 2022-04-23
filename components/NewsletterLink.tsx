import type { Newsletter } from 'contentlayer/generated';
import { format, parseISO } from 'date-fns';
import Link from 'next/link';

export default function NewsletterLink({
  title,
  slug,
  publishedAt
}: Pick<Newsletter, 'title' | 'publishedAt' | 'slug'>) {
  return (
    <li>
      <Link href={`/newsletter/${slug}`}>
        <a>{title} - {format(parseISO(publishedAt), 'MMMM dd, yyyy')}</a>
      </Link>
    </li>
  );
}
