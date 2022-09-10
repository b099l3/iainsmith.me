import Alert from 'components/Alert';
import Caption from 'components/Caption';
import CodeBlock from 'components/CodeBlock';
import ConsCard from 'components/ConsCard';
import ImageCenter from 'components/ImageCenter';
import ImageWithTheme from 'components/ImageWithTheme';
import Analytics from 'components/metrics/Analytics';
import YouTubeCard from 'components/metrics/Youtube';
import ProsCard from 'components/ProsCard';
import Step from 'components/Step';
import YouTube from 'components/YouTube';
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

function RoundedImageWithTheme(props) {
  return <ImageWithTheme alt={props.alt} className="rounded-lg" {...props} />;
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
  ImageWithTheme: RoundedImageWithTheme,
  ImageCenter,
  Callout,
  Caption,
  a: CustomLink,
  Analytics,
  Alert,
  ConsCard,
  ProsCard,
  Step,
  YouTubeCard,
  YouTube,
  pre:CodeBlock
};

export default MDXComponents;
