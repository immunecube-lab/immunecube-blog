import fs from "node:fs/promises";
import path from "node:path";

export type VeliteContent = Record<string, unknown> & {
  slug: string;
  title: string;
  published?: boolean;
};

const isLocalDev = process.env.NODE_ENV === "development";
let cachedDocs: VeliteContent[] | null = null;
let cachedStories: VeliteContent[] | null = null;
let cachedPosts: VeliteContent[] | null = null;

async function readCollection(file: string): Promise<VeliteContent[]> {
  const filePath = path.join(process.cwd(), ".velite", file);
  try {
    const parsed: unknown = JSON.parse(await fs.readFile(filePath, "utf8"));
    if (!Array.isArray(parsed)) throw new Error("collection root must be an array");
    return parsed as VeliteContent[];
  } catch (error) {
    const message = `Failed to load required Velite collection: ${filePath}`;
    if (!isLocalDev) throw new Error(message, { cause: error });
    console.error(message, error);
    return [];
  }
}

export async function getVeliteDocs(): Promise<VeliteContent[]> {
  if (!isLocalDev && cachedDocs) return cachedDocs;
  const docs = await readCollection("docs.json");
  let drafts: VeliteContent[] = [];
  if (isLocalDev) drafts = await readCollection("drafts.json");
  cachedDocs = [...docs, ...drafts];
  return cachedDocs;
}

export async function getVeliteStories(): Promise<VeliteContent[]> {
  if (!isLocalDev && cachedStories) return cachedStories;
  cachedStories = await readCollection("stories.json");
  return cachedStories;
}

export async function getVelitePosts(): Promise<VeliteContent[]> {
  if (!isLocalDev && cachedPosts) return cachedPosts;
  cachedPosts = await readCollection("posts.json");
  return cachedPosts;
}
