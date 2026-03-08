import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { LEGACY_DOC_BASENAME_TO_SLUG } from "@/lib/legacy-doc-slugs";
import { normalizeDocSlug } from "@/lib/docs-slug";

function getCanonicalDocPath(pathname: string): string | null {
  const parts = pathname.split("/").filter(Boolean);
  if (parts[0] !== "docs" || parts.length < 2) return null;

  const last = parts[parts.length - 1];
  const mapped = LEGACY_DOC_BASENAME_TO_SLUG[last];
  const canonicalSlug = mapped ?? normalizeDocSlug(last);
  if (!canonicalSlug) return null;

  const currentPath = `/${parts.join("/")}`;
  const canonicalPath = `/docs/${canonicalSlug}`;

  if (currentPath === canonicalPath) return null;

  if (parts.length > 2 || mapped) {
    return canonicalPath;
  }

  return null;
}

export function proxy(request: NextRequest) {
  const canonicalPath = getCanonicalDocPath(request.nextUrl.pathname);
  if (!canonicalPath) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = canonicalPath;
  return NextResponse.redirect(url, 308);
}

export const config = {
  matcher: ["/docs/:path*"],
};

