# nextjs-blog-test

Minimal blog template built with **Next.js 15 (App Router)**, **TypeScript**, **Tailwind CSS**, and markdown posts.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Structure

- `app/` — App Router pages and layouts
- `app/posts/[slug]/page.tsx` — dynamic post page
- `content/posts/*.md` — markdown blog posts with frontmatter
- `lib/posts.ts` — helpers to read and render posts

## Adding a post

Create a new `.md` file in `content/posts/` with frontmatter:

```markdown
---
title: My new post
date: 2026-05-11
excerpt: A short summary of the post.
---

Your markdown content here.
```

The file name becomes the URL slug.
