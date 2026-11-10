export const SITE_ORIGIN = 'https://www.iainsmith.me';

// The site's pages use path-based content; queries and fragments are UI/tracking state.
export function getCanonicalUrl(asPath = '/') {
  const path = asPath.split(/[?#]/, 1)[0].replace(/\/+$/, '') || '/';
  return `${SITE_ORIGIN}${path}`;
}
