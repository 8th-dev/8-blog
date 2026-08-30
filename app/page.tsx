import Link from "next/link";

import { getAllPosts } from "@/lib/wordpress";

export const revalidate = 300;

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

export default async function Home() {
  const posts = await getAllPosts();

  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-16 sm:py-24">
      <header className="border-b pb-10">
        <p className="text-sm font-medium uppercase tracking-[0.18em]">
          8th
        </p>
        <h1 className="mt-3">8th Blog</h1>
        <p className="mt-4 max-w-2xl text-lg">
          A place for notes, experiments, and thoughts as they take shape.
        </p>
      </header>

      <section className="divide-y">
        {posts.map((post) => (
          <article key={post.id} className="py-8 first:pt-10">
            <time className="text-sm text-muted-foreground" dateTime={post.date}>
              {formatDate(post.date)}
            </time>
            <h2 className="mt-2">
              <Link className="no-underline" href={`/posts/${post.slug}`}>
                {post.title}
              </Link>
            </h2>
            <div
              className="mt-3 max-w-2xl"
              dangerouslySetInnerHTML={{ __html: post.excerpt }}
            />
          </article>
        ))}
      </section>
    </main>
  );
}
