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

export default async function BlogPage() {
    const posts = await getAllPosts();

    return (
        <main className="mx-auto w-full max-w-4xl px-6 py-16 sm:py-24">
            <header className="border-b border-zinc-200 pb-10 dark:border-zinc-800">
                <p className="text-sm font-medium uppercase tracking-[0.18em] text-zinc-500">
                    Writing
                </p>
                <h1 className="mt-3 text-4xl font-semibold text-zinc-950 sm:text-5xl dark:text-zinc-50">
                    Blog
                </h1>
            </header>

            <section className="divide-y divide-zinc-200 dark:divide-zinc-800">
                {posts.map((post) => (
                    <article key={post.id} className="py-8 first:pt-10">
                        <time className="text-sm text-zinc-500" dateTime={post.date}>
                            {formatDate(post.date)}
                        </time>
                        <h2 className="mt-2 text-2xl font-semibold text-zinc-950 sm:text-3xl dark:text-zinc-50">
                            <Link
                                className="transition-colors hover:text-zinc-500 dark:hover:text-zinc-400"
                                href={`/blog/${post.slug}`}
                            >
                                {post.title}
                            </Link>
                        </h2>
                        <div
                            className="mt-3 max-w-2xl leading-7 text-zinc-600 dark:text-zinc-400"
                            dangerouslySetInnerHTML={{ __html: post.excerpt }}
                        />
                    </article>
                ))}
            </section>
        </main>
    );
}