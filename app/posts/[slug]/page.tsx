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
        <header className="border-b pb-10">
          <time className="text-sm text-muted-foreground" dateTime={post.date}>
            {formatDate(post.date)}
          </time>
          <h1 className="mt-3">{post.title}</h1>
        </header>
        <div
          className="wordpress-content mt-10 text-lg"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </main>
  );
}