import Image from 'next/image';
import Link from 'next/link';

export default function FunctionCard({
  title,
  description,
  slug,
  logo,
  ...rest
}) {
  return (
    <Link href={`/snippets/${slug}`}>
      <a
        className="w-full p-4 bg-white border rounded border-grey-200 dark:border-gray-800 dark:bg-gray-900"
        {...rest}
      >
        <Image
          alt={title}
          height={50}
          width={50}
          src={`/logos/${logo}`}
          className="rounded-full"
        />
        <h3 className="mt-2 text-lg font-bold text-left text-gray-900 dark:text-gray-100">
          {title}
        </h3>
        <p className="mt-1 text-gray-700 dark:text-gray-400">{description}</p>
      </a>
    </Link>
  );
}
