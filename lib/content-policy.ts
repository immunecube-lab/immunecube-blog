import { normalizeDocSlug } from "@/lib/docs-slug";

export type ContentCollection = "docs" | "blog" | "stories";

export type ContentMeta = {
  slug: string;
  published?: boolean;
  date?: string | Date;
  updated?: string | Date;
};

export function isPublished(item: { published?: boolean }): boolean {
  return item.published !== false;
}

export function parseContentDate(value?: string | Date): Date | null {
  if (!value) return null;
  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

export function getContentDate(item: Pick<ContentMeta, "date" | "updated">): Date | null {
  return parseContentDate(item.updated) ?? parseContentDate(item.date);
}

export function normalizeCollectionSlug(
  slug: string,
  collection: ContentCollection,
): string {
  let value = (slug ?? "").trim().replace(/^\/+|\/+$/g, "");
  if (!value) return "";

  const prefixes =
    collection === "blog"
      ? ["blog/", "posts/"]
      : collection === "stories"
        ? ["stories/"]
        : ["docs/"];

  const prefix = prefixes.find((candidate) => value.startsWith(candidate));
  if (prefix) value = value.slice(prefix.length);

  if (collection === "docs") return normalizeDocSlug(value);
  return value.split("/").filter(Boolean).join("/");
}

export function getContentPath(
  collection: ContentCollection,
  slug: string,
): string {
  const normalized = normalizeCollectionSlug(slug, collection);
  return normalized ? `/${collection}/${normalized}` : `/${collection}`;
}
