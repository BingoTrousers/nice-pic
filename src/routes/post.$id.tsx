import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getPost } from "@/data/posts";

export const Route = createFileRoute("/post/$id")({
  loader: ({ params }) => {
    const post = getPost(params.id);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.post.title} — booru` },
          { name: "description", content: loaderData.post.tags.join(", ") },
          { property: "og:title", content: loaderData.post.title },
          { property: "og:description", content: loaderData.post.tags.join(", ") },
          { property: "og:image", content: loaderData.post.src },
          { name: "twitter:image", content: loaderData.post.src },
        ]
      : [],
  }),
  component: PostPage,
  notFoundComponent: () => (
    <div className="mx-auto max-w-6xl px-4 py-16 text-center">
      <p className="text-muted-foreground">Post not found.</p>
      <Link to="/" className="mt-4 inline-block text-sm underline">
        Back home
      </Link>
    </div>
  ),
  errorComponent: () => (
    <div className="mx-auto max-w-6xl px-4 py-16 text-center text-muted-foreground">
      Something went wrong.
    </div>
  ),
});

function PostPage() {
  const { post } = Route.useLoaderData();
  return (
    <div className="mx-auto max-w-4xl px-4 py-6">
      <Link to="/" className="mb-4 inline-block text-sm text-muted-foreground hover:text-foreground">
        ← back
      </Link>
      <div className="overflow-hidden rounded-md border bg-muted">
        <img src={post.src} alt={post.title} className="w-full" />
      </div>
      <h1 className="mt-4 text-lg font-semibold">{post.title}</h1>
      <div className="mt-3 flex flex-wrap gap-2">
        {post.tags.map((tag: string) => (
          <Link
            key={tag}
            to="/"
            search={{ tags: tag }}
            className="rounded border bg-card px-2 py-1 font-mono text-xs hover:bg-accent"
          >
            {tag}
          </Link>
        ))}
      </div>
    </div>
  );
}
