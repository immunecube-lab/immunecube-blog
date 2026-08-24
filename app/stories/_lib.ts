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
  series?: {
    title: string;
    order: number;
    total?: number;
  };
};

export function normalizeStorySlug(input: string) {
  if (!input) return input;

  const value = input.replace(/^\/+|\/+$/g, "");
  const parts = value.split("/").filter(Boolean);
  return parts[parts.length - 1] ?? input;
}

export type SeriesGroup = {
  title: string;
  stories: StoryWithMeta[];
};

export function groupStoriesBySeries(stories: StoryWithMeta[]): SeriesGroup[] {
  const map = new Map<string, StoryWithMeta[]>();

  stories.forEach((story) => {
    if (story.series?.title) {
      const title = story.series.title.trim();
      if (!map.has(title)) {
        map.set(title, []);
      }
      map.get(title)!.push(story);
    }
  });

  const result: SeriesGroup[] = [];
  map.forEach((items, title) => {
    const sorted = [...items].sort((a, b) => {
      const orderA = a.series?.order ?? 999;
      const orderB = b.series?.order ?? 999;
      return orderA - orderB;
    });
    result.push({ title, stories: sorted });
  });

  return result;
}
