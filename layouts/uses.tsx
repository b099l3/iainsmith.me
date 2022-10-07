import Container from 'components/Container';

export default function UsesLayout({ children }) {
  return (
    <Container
      title="Setup – Iain Smith"
      description="Here's my coding setup."
    >
      <article className="flex flex-col items-start justify-center w-full max-w-2xl mx-auto mb-16">
        <h1 className="pb-4 mb-4 text-3xl font-bold tracking-tight text-transparent md:text-5xl bg-clip-text bg-gradient-to-r from-indigo-500 via-teal-500 to-indigo-500 animate-text">
          My Setup
        </h1>
        <p className="mt-2 mb-8 text-gray-700 dark:text-gray-300">
          Here's my coding setup.
        </p>
        <div className="w-full prose dark:prose-dark">{children}</div>
      </article>
    </Container>
  );
}
