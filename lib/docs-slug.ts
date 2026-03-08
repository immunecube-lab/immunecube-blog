export function normalizeDocSlug(slug: string): string {
  let s = (slug ?? "").trim();
  if (!s) return "";

  if (s.startsWith("/")) s = s.slice(1);
  if (s.startsWith("docs/")) s = s.slice("docs/".length);

  const parts = s.split("/").filter(Boolean);
  return parts.length ? parts[parts.length - 1] : "";
}

