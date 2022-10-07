import Container from 'components/Container';

export default function NowLayout({ children }) {
  return (
    <Container
      title="Now – Iain Smith"
      description="What I am doing now."
    >
      <article className="flex flex-col items-start justify-center w-full max-w-2xl mx-auto mb-16">
        <h1 className="pb-4 mb-4 text-3xl font-bold tracking-tight text-transparent md:text-5xl bg-clip-text bg-gradient-to-r from-indigo-500 via-teal-500 to-indigo-500 animate-text">
          Now
        </h1>
        <div className="w-full prose dark:prose-dark">{children}</div>
      </article>
    </Container>
  );
}
