import Container from 'components/Container';

export default function UsesLayout({ children }) {
  return (
    <Container
      title="Setup – Iain Smith"
      description="Here's my coding setup."
    >
      <article className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16 w-full">
        <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
          My Setup
        </h1>
        <p className="text-gray-700 dark:text-gray-300 mt-2 mb-8">
          Here's my coding setup.
        </p>
        <div className="prose dark:prose-dark w-full">{children}</div>
      </article>
    </Container>
  );
}
