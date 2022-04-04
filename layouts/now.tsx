import Container from 'components/Container';

export default function NowLayout({ children }) {
  return (
    <Container
      title="Now – Iain Smith"
      description="What I am doing now."
    >
      <article className="flex flex-col items-start justify-center w-full max-w-2xl mx-auto mb-16">
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-black md:text-5xl dark:text-white">
          Now
        </h1>
        <div className="w-full prose dark:prose-dark">{children}</div>
      </article>
    </Container>
  );
}
