import {
  FiActivity,
  FiBookOpen,
  FiGithub,
  FiGlobe,
  FiInstagram,
  FiLinkedin,
  FiTwitter,
  FiYoutube
} from 'react-icons/fi';

type SocialIconLinkProps = {
  label: string;
  url: string;
  onClick: (label: string, url: string) => void;
};

const metaFontStyle = {
  fontFamily: "'Victor Mono', ui-monospace, SFMono-Regular, Menlo, monospace"
};

function isExternalUrl(url: string): boolean {
  return /^https?:\/\//i.test(url);
}

function getSocialIcon(label: string) {
  const normalized = label.toLowerCase();

  if (normalized.includes('github')) return FiGithub;
  if (normalized.includes('strava')) return FiActivity;
  if (normalized.includes('linkedin')) return FiLinkedin;
  if (normalized.includes('youtube')) return FiYoutube;
  if (normalized.includes('instagram')) return FiInstagram;
  if (normalized.includes('substack')) return FiBookOpen;
  if (normalized.includes('x') || normalized.includes('twitter')) return FiTwitter;

  return FiGlobe;
}

export default function SocialIconLink({
  label,
  url,
  onClick
}: SocialIconLinkProps) {
  const Icon = getSocialIcon(label);
  const isExternal = isExternalUrl(url);

  return (
    <a
      href={url}
      aria-label={label}
      title={label}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      onClick={() => onClick(label, url)}
      className="inline-flex h-10 items-center gap-2 border border-zinc-900/20 bg-white px-3 text-[11px] font-[560] uppercase tracking-[0.12em] text-zinc-900 shadow-[0_4px_10px_rgba(0,0,0,0.04)] transition-colors duration-200 hover:border-zinc-900/35 hover:bg-zinc-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900"
      style={metaFontStyle}
    >
      <Icon className="h-3.5 w-3.5" />
      <span>[{label}]</span>
    </a>
  );
}
