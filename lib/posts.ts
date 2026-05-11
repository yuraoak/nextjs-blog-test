import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  excerpt?: string;
};

export type Post = PostMeta & { html?: string };

const postsDir = path.join(process.cwd(), "content", "posts");

function readPostFile(slug: string) {
  const filePath = path.join(postsDir, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf8");
  return matter(raw);
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(postsDir)) return [];
  return fs
    .readdirSync(postsDir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => {
      const slug = f.replace(/\.md$/, "");
      const parsed = readPostFile(slug)!;
      return {
        slug,
        title: String(parsed.data.title ?? slug),
        date: String(parsed.data.date ?? ""),
        excerpt: parsed.data.excerpt ? String(parsed.data.excerpt) : undefined,
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPostBySlug(
  slug: string,
  opts: { withContent?: boolean } = {},
): Promise<Post | null> {
  const parsed = readPostFile(slug);
  if (!parsed) return null;
  const meta: PostMeta = {
    slug,
    title: String(parsed.data.title ?? slug),
    date: String(parsed.data.date ?? ""),
    excerpt: parsed.data.excerpt ? String(parsed.data.excerpt) : undefined,
  };
  if (!opts.withContent) return meta;
  const processed = await remark().use(html).process(parsed.content);
  return { ...meta, html: processed.toString() };
}
