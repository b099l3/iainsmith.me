import { useTheme } from 'next-themes';
import Image from 'next/image';

export default function ImageWithTheme(props) {
  const { resolvedTheme } = useTheme();

  return (
    <Image
      alt={props.alt}
      src={resolvedTheme === 'light' ? props.light : props.dark}
      {...props}
    />
  );
}
