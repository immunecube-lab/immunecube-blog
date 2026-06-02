import { NextResponse } from "next/server";
import { DOCS_INDEX, DRAFT_DOCS_INDEX } from "@/generated/content-index";
import { normalizeDocSlug } from "@/lib/docs-slug";

export const dynamic = "force-static";

export async function GET() {
  const isLocalDev = process.env.NODE_ENV === "development";
  const source = [...(DOCS_INDEX ?? []), ...(isLocalDev ? DRAFT_DOCS_INDEX ?? [] : [])];

  const items = source
    .filter((d) => (isLocalDev ? true : d?.published !== false))
    .map((d) => ({
      slug: normalizeDocSlug(Array.isArray(d.slug) ? d.slug.join("/") : String(d.slug)),
      title: d.title ?? null,
      updated: d.updated ?? d.date ?? null,
    }));

  return NextResponse.json(items);
}
