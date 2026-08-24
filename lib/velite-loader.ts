import fs from "node:fs/promises";
import path from "node:path";

const isLocalDev = process.env.NODE_ENV === "development";

let cachedDocs: any[] | null = null;
let cachedStories: any[] | null = null;
let cachedPosts: any[] | null = null;

export async function getVeliteDocs() {
  if (cachedDocs) return cachedDocs;
  try {
    const docsPath = path.join(process.cwd(), ".velite", "docs.json");
    const raw = await fs.readFile(docsPath, "utf8");
    const docs = JSON.parse(raw);

    let drafts: any[] = [];
    if (isLocalDev) {
      try {
        const draftsPath = path.join(process.cwd(), ".velite", "drafts.json");
        const draftsRaw = await fs.readFile(draftsPath, "utf8");
        drafts = JSON.parse(draftsRaw);
      } catch {}
    }
    cachedDocs = [...docs, ...drafts];
    return cachedDocs;
  } catch (err) {
    console.error("Failed to load velite docs from disk:", err);
    return [];
  }
}

export async function getVeliteStories() {
  if (cachedStories) return cachedStories;
  try {
    const storiesPath = path.join(process.cwd(), ".velite", "stories.json");
    const raw = await fs.readFile(storiesPath, "utf8");
    cachedStories = JSON.parse(raw);
    return cachedStories;
  } catch (err) {
    console.error("Failed to load velite stories from disk:", err);
    return [];
  }
}

export async function getVelitePosts() {
  if (cachedPosts) return cachedPosts;
  try {
    const postsPath = path.join(process.cwd(), ".velite", "posts.json");
    const raw = await fs.readFile(postsPath, "utf8");
    cachedPosts = JSON.parse(raw);
    return cachedPosts;
  } catch (err) {
    console.error("Failed to load velite posts from disk:", err);
    return [];
  }
}
