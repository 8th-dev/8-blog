import { notFound } from "next/navigation";

import { getPostBySlug, getPostSlugs } from "@/lib/wordpress";

export const revalidate = 300;

type PostPageProps = {
    params: Promise<{ slug: string }>;
};

function formatDate(date: string) {
    return new Intl.DateTimeFormat("en", {
        day: "numeric",
        month: "long",
        year: "numeric",
    }).format(new Date(date));
}

export async function generateStaticParams() {
    const posts = await getPostSlugs();
    return posts.map((post) => ({ slug: post.slug }));
}

export default async function PostPage({ params }: PostPageProps) {
    const { slug } = await params;
    const post = await getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    return (
        <main className="mx-auto w-full max-w-3xl px-6 py-16 sm:py-24">
            <article>
                <header className="border-b border-zinc-200 pb-10 dark:border-zinc-800">
                    <time className="text-sm text-zinc-500" dateTime={post.date}>
                        {formatDate(post.date)}
                    </time>
                    <h1 className="mt-3 text-4xl font-semibold leading-tight text-zinc-950 sm:text-5xl dark:text-zinc-50">
                        {post.title}
                    </h1>
                </header>
                <div
                    className="wordpress-content mt-10 text-lg leading-8 text-zinc-700 dark:text-zinc-300"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />
            </article>
        </main>
    );
}