import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export default function Home() {
  const posts = getAllPosts();

  return (
    <div>
      <section className="mb-12">
        <h1 className="font-serif text-3xl font-semibold tracking-tight">
          Writing about building things.
        </h1>
        <p className="mt-3 text-stone-600">
          Short notes on products, code, and the occasional sharp opinion.
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-xs uppercase tracking-widest text-stone-500">
          Posts
        </h2>
        <ul className="divide-y divide-stone-200">
          {posts.map((post) => (
            <li key={post.slug} className="py-5">
              <Link href={`/posts/${post.slug}`} className="group block">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-serif text-lg font-medium group-hover:underline">
                    {post.title}
                  </h3>
                  <time className="shrink-0 text-sm text-stone-500">
                    {post.date}
                  </time>
                </div>
                {post.excerpt && (
                  <p className="mt-1 text-sm text-stone-600">{post.excerpt}</p>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
