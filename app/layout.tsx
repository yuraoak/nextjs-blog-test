import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "nextjs-blog-test",
  description: "A minimal Next.js blog template",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-stone-50 text-stone-900 antialiased">
        <div className="mx-auto max-w-2xl px-6 py-12">
          <header className="mb-12 flex items-center justify-between">
            <Link href="/" className="font-serif text-xl font-semibold tracking-tight">
              Yura&rsquo;s Notes
            </Link>
            <nav className="text-sm text-stone-500">
              <Link href="/" className="hover:text-stone-900">
                All posts
              </Link>
            </nav>
          </header>
          <main>{children}</main>
          <footer className="mt-24 border-t border-stone-200 pt-6 text-sm text-stone-500">
            <p>
              Built with Next.js. Source on{" "}
              <a
                href="https://github.com/yuraoak/nextjs-blog-test"
                className="underline hover:text-stone-900"
              >
                GitHub
              </a>
              .
            </p>
          </footer>
        </div>
      </body>
    </html>
  );
}
