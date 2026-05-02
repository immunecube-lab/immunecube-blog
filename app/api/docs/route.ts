import { NextResponse } from "next/server";
import { docs, drafts } from "@/.velite";
import { normalizeDocSlug } from "@/lib/docs-slug";

export const dynamic = "force-static";

export async function GET() {
  const isLocalDev = process.env.NODE_ENV === "development";
  const source = [...(docs ?? []), ...(isLocalDev ? drafts ?? [] : [])];

  const items = source
    .filter((d) => (isLocalDev ? true : d?.published !== false))
    .map((d) => ({
      slug: normalizeDocSlug(Array.isArray(d.slug) ? d.slug.join("/") : String(d.slug)),
      title: d.title ?? null,
      updated: d.updated ?? d.date ?? null,
    }));

  return NextResponse.json(items);
}
