import Alert from 'components/Alert';
import Caption from 'components/Caption';
import ConsCard from 'components/ConsCard';
import ImageCenter from 'components/ImageCenter';
import ImageWithTheme from 'components/ImageWithTheme';
import Analytics from 'components/metrics/Analytics';
import YouTube from 'components/metrics/Youtube';
import ProsCard from 'components/ProsCard';
import Step from 'components/Step';
import Image from 'next/image';
import Link from 'next/link';



const CustomLink = (props) => {
  const href = props.href;
  const isInternalLink = href && (href.startsWith('/') || href.startsWith('#'));

  if (isInternalLink) {
    return (
      <Link href={href}>
        <a {...props}>{props.children}</a>
      </Link>
    );
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />;
};

function RoundedImage(props) {
  return <Image alt={props.alt} className="rounded-lg" {...props} />;
}

function Callout(props) {
  return (
    <div className="flex p-4 bg-gray-200 rounded-lg dark:bg-gray-800">
      <div className="flex items-center w-4 mr-4">{props.emoji}</div>
      <div className="w-full callout">{props.children}</div>
    </div>
  );
}


const MDXComponents = {
  Image: RoundedImage,
  ImageWithTheme,
  ImageCenter,
  Callout,
  Caption,
  a: CustomLink,
  Analytics,
  Alert,
  ConsCard,
  ProsCard,
  Step,
  YouTube
};

export default MDXComponents;
