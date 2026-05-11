---
title: Building this blog with Next.js 15
date: 2026-05-10
excerpt: A look at the App Router, static generation, and why markdown still wins.
---

## The stack

This blog is built on:

- **Next.js 15** with the App Router
- **TypeScript** for everything
- **Tailwind CSS** for styling
- Plain **markdown** files for content, parsed with `remark`

No database. No headless CMS. No client-side fetching. Every post is read from disk at build time and rendered to static HTML.

## Why static

For a personal blog, static generation is unbeatable:

1. Pages load instantly — it's just HTML.
2. Hosting is free or close to it.
3. There's nothing to break at 3am.

The App Router makes this almost too easy. A single `generateStaticParams` function tells Next.js which slugs exist, and the framework does the rest.

```tsx
export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}
```

## Markdown is enough

I keep returning to markdown because the surface area is small. Frontmatter for metadata, body for content, done. If I ever need to migrate, the files are already portable.
