import { gql, request } from "graphql-request";

type WordPressImage = {
    sourceUrl: string;
} | null;

export type WordPressPostSummary = {
    id: string;
    title: string;
    slug: string;
    date: string;
    excerpt: string;
    featuredImage: {
        node: WordPressImage;
    } | null;
};

export type WordPressPost = Omit<WordPressPostSummary, "excerpt"> & {
    content: string;
};

function getApiUrl() {
    const apiUrl = process.env.WORDPRESS_API_URL;

    if (!apiUrl) {
        throw new Error("WORDPRESS_API_URL is not defined");
    }

    return apiUrl;
}

const postFields = gql`
  id
  title
  slug
  date
  featuredImage {
    node {
      sourceUrl
    }
  }
`;

export async function getAllPosts(): Promise<WordPressPostSummary[]> {
    const query = gql`
    query GetAllPosts {
      posts(first: 10, where: { status: PUBLISH }) {
        nodes {
          ${postFields}
          excerpt
        }
      }
    }
  `;
    const data = await request<{ posts: { nodes: WordPressPostSummary[] } }>(
        getApiUrl(),
        query,
    );

    return data.posts.nodes;
}

export async function getPostBySlug(
    slug: string,
): Promise<WordPressPost | null> {
    const query = gql`
    query GetPostBySlug($slug: String!) {
      postBy(slug: $slug) {
        ${postFields}
        content
      }
    }
  `;
    const data = await request<{ postBy: WordPressPost | null }>(
        getApiUrl(),
        query,
        { slug },
    );

    return data.postBy;
}

export async function getPostSlugs(): Promise<{ slug: string }[]> {
    const query = gql`
    query GetPostSlugs {
      posts(first: 100, where: { status: PUBLISH }) {
        nodes {
          slug
        }
      }
    }
  `;
    const data = await request<{ posts: { nodes: { slug: string }[] } }>(
        getApiUrl(),
        query,
    );

    return data.posts.nodes;
}