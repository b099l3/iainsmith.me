import { FiArrowUpRight } from 'react-icons/fi';

type LinkCardProps = {
  index: number;
  label: string;
  url: string;
  description?: string;
  featured?: boolean;
  onClick: (label: string, url: string) => void;
};

function isExternalUrl(url: string): boolean {
  return /^https?:\/\//i.test(url);
}

export default function LinkCard({
  index,
  label,
  url,
  description,
  featured = false,
  onClick
}: LinkCardProps) {
  const isExternal = isExternalUrl(url);
  const indexLabel = String(index + 1).padStart(2, '0');
  const cardStyles = featured
    ? 'border-zinc-900 bg-zinc-950 text-zinc-100'
    : 'border-zinc-900/20 bg-white text-zinc-900 hover:border-zinc-900/30';

  return (
    <a
      href={url}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      onClick={() => onClick(label, url)}
      className={`group flex min-h-[76px] w-full items-center justify-between border px-4 py-3.5 text-left shadow-[0_5px_12px_rgba(0,0,0,0.04)] transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 ${cardStyles}`}
    >
      <div className="pr-4">
        <p
          className={`font-mono text-[11px] uppercase tracking-[0.16em] ${
            featured ? 'text-zinc-400' : 'text-zinc-500'
          }`}
        >
          [{indexLabel}]
        </p>
        <p className="mt-1 text-[0.98rem] font-[650] uppercase tracking-[0.06em] leading-tight">
          {label}
        </p>
        {description ? (
          <p
            className={`mt-1.5 text-sm leading-snug ${
              featured ? 'text-zinc-300 font-[440]' : 'text-zinc-600 font-[440]'
            }`}
          >
            {description}
          </p>
        ) : null}
      </div>

      <FiArrowUpRight
        className={`h-5 w-5 shrink-0 ${
          featured ? 'text-zinc-300' : 'text-zinc-500'
        }`}
      />
    </a>
  );
}
