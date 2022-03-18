import Container from 'components/Container';
import Link from 'next/link';


export default function NotFound() {
  return (
    <Container title="404 – Iain Smith">
      <div className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16">
        <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
        A RenderFlex overflowed…
        </h1>
        <p className="text-gray-300 dark:text-gray-200 mb-8">
        The following assertion was thrown during layout:<br/>
        A RenderFlex overflowed by 1146 pixels on the right.<br/>
        <br/>
        <br/>

The relevant error-causing widget was<br/>
    Row 	    lib/errors/renderflex_overflow_column.dart:23<br/>
The overflowing RenderFlex has an orientation of Axis.horizontal.<br/>
The edge of the RenderFlex that is overflowing has been marked in the rendering <br/>
with a yellow and black striped pattern. This is usually caused by the contents <br/>
being too big for the RenderFlex.<br/><br/>
(Additional lines of this message omitted)<br/>

        </p>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Lol Got you! No render overflow here but it seems
          you've found something that used to exist, or you spelled something
          wrong. I'm guessing you spelled something wrong. Can you double check
          that URL?
        </p>
        <Link href="/">
          <a className="p-1 sm:p-4 w-64 font-bold mx-auto bg-gray-200 dark:bg-gray-800 text-center rounded-md text-black dark:text-white">
            Return Home
          </a>
        </Link>
      </div>
    </Container>
  );
}
