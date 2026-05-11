import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/posts";

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug, { withContent: true });
  if (!post) notFound();

  return (
    <article>
      <Link
        href="/"
        className="mb-8 inline-block text-sm text-stone-500 hover:text-stone-900"
      >
        ← Back to all posts
      </Link>
      <header className="mb-8">
        <h1 className="font-serif text-3xl font-semibold tracking-tight">
          {post.title}
        </h1>
        <time className="mt-2 block text-sm text-stone-500">{post.date}</time>
      </header>
      <div
        className="prose-post"
        dangerouslySetInnerHTML={{ __html: post.html ?? "" }}
      />
    </article>
  );
}
