import { NextResponse } from "next/server";
import * as V from "@/.velite";

export async function GET() {
  const docs = (V as any).docs as any[];
  const drafts = (V as any).drafts as any[] | undefined;
  const isLocalDev = process.env.NODE_ENV === "development";
  const source = [...(docs ?? []), ...(isLocalDev ? drafts ?? [] : [])];

  const items = source
    .filter((d) => (isLocalDev ? true : d?.published !== false))
    .map((d) => ({
      slug: Array.isArray(d.slug) ? d.slug.join("/") : String(d.slug),
      title: d.title ?? null,
      updated: d.updated ?? d.date ?? null,
    }));

  return NextResponse.json(items);
}
