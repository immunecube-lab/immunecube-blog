export type StoryWithMeta = {
  slug: string;
  title: string;
  description?: string;
  published?: boolean;
  date?: string;
  featured?: boolean;
  cover?: string;
  tags?: string[];
  category?: string;
  updated?: string;
};

export function normalizeStorySlug(input: string) {
  if (!input) return input;

  const value = input.replace(/^\/+|\/+$/g, "");
  const parts = value.split("/").filter(Boolean);
  return parts[parts.length - 1] ?? input;
}
