import { NextResponse } from "next/server";
import * as V from "@/.velite";

export async function GET() {
  const docs = (V as any).docs as any[];

  const items = docs
    .filter((d) => d?.published !== false)
    .map((d) => ({
      slug: Array.isArray(d.slug) ? d.slug.join("/") : String(d.slug),
      title: d.title ?? null,
      updated: d.updated ?? d.date ?? null,
    }));

  return NextResponse.json(items);
}
