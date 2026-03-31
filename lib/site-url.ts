const CANONICAL_SITE_URL = "https://immunecube.com";

export function getSiteUrl(): string {
  return CANONICAL_SITE_URL;
}

export function buildSiteUrl(pathname = "/"): string {
  const base = getSiteUrl();
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `${base}${path}`;
}
