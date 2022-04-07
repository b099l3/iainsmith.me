import { useTheme } from 'next-themes';
import Image from 'next/image';

export default function ImageWithTheme(props) {
  const { theme } = useTheme();

  return (
    <Image
      alt={props.alt}
      src={theme === 'light' ? props.light : props.dark}
      {...props}
    />
  );
}
