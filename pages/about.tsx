import Container from 'components/Container';
import Image from 'next/image';
import Link from 'next/link';
import avatarBW from 'public/avatar-bw.jpg';
import avatar from 'public/avatar.jpg';


export default function About() {
  return (
    <Container title="About – Iain Smith">
      <div className="flex flex-col items-start justify-center w-full max-w-2xl mx-auto mb-16">
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-black md:text-5xl dark:text-white">
          About Me
        </h1>
        <div className="mb-8 leading-6 prose dark:prose-dark">
          <h2>Links</h2>
          <ul>
            <li>
              Twitter: <a href="https://twitter.com/b099l3">@b099l3</a>
            </li>
            <li>
              GitHub: <a href="https://github.com/b099l3">@b099l3</a>
            </li>
            <li>
              Website:{' '}
              <Link href="https://iainsmith.me">
                <a>https://iainsmith.me</a>
              </Link>
            </li>
            <li>
              LinkedIn:{' '}
              <a href="https://www.linkedin.com/in/iainsmithmobile/">
                https://www.linkedin.com/in/iainsmithmobile
              </a>
            </li>
          </ul>
          <h2>Bio</h2>
          <p>
            Hi, I'm Iain Smith, a Senior Mobile Developer specialising in Flutter.
          </p>
          <p>
            With over ten years of professional experience, working in a range of sectors. Helping teams deliver robust, maintainable apps. 
          </p>
          <p>
            Being so passionate about Flutter and its community has led me to be the main organiser for Flutter Scotland. This has allowed me to help others and share knowledge on all things Flutter. You will find blog posts about my learnings, open-source projects, and many others tips on my blog.
          </p>
          <h3>
            <a href="https://www.linkedin.com/in/iainsmithmobile/">
              CV
            </a>
          </h3>
          <h2>Headshots</h2>
          <div className="flex space-x-8">
            <a href="/avatar.jpg">
              <Image
                alt="Iain Smith headshot"
                width={400}
                quality={100}
                src={avatar}
                className="rounded-md"
              />
            </a>
            <a href="/avatar-bw.jpg">
              <Image
                alt="Iain Smith headshot"
                width={400}
                quality={100}
                src={avatarBW}
                className="rounded-md"
              />
            </a>
          </div>
        </div>
      </div>
    </Container>
  );
}
