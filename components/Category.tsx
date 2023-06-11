
import type { Category as BlogCategory } from 'contentlayer/generated';
import Link from 'next/link';
interface CategoryProps {
  category: BlogCategory;
}

export default function Category({ category }: CategoryProps) {
  // This is pish but i cant think of a better way I wanted to capture it in the mdx files but this will do
  // choose from here https://tailwindcss.com/docs/customizing-colors
  const colorVariants = {
    flutter: 'from-flutter-blue-500 to-sky-500 bg-gradient-to-tr text-white',
    testing: 'from-pink-500 to-rose-500 bg-gradient-to-tr text-white',
    review: 'from-yellow-500 to-yellow-600 bg-gradient-to-tr text-black',
    event: 'from-amber-500 to-orange-600 bg-gradient-to-tr text-white',
    draft: 'bg-yellow-500 bg-gradient-stripes text-white',
    thoughts: 'from-[#6EE7B7] via-[#3B82F6] to-[#9333EA] bg-gradient-to-tr  text-white'
  }
  const color = colorVariants[category.slug];
  return (
    <Link href={`/category/${category.slug}`}>
      <span className= {`${color} flex px-3 py-1 text-xs font-semibold cursor-pointer rounded-2xl align-center w-max `}>
        {category.title}
      </span>
    </Link>
  );
}
