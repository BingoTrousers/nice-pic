import { Link } from "@tanstack/react-router";
import type { Post } from "@/data/posts";

export function PostGrid({ posts }: { posts: Post[] }) {
  if (posts.length === 0) {
    return (
      <div className="rounded-md border border-dashed py-16 text-center text-sm text-muted-foreground">
        No posts match these tags.
      </div>
    );
  }
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
      {posts.map((post) => (
        <Link
          key={post.id}
          to="/post/$id"
          params={{ id: post.id }}
          className="group block overflow-hidden rounded-md border bg-muted"
        >
          <div className="aspect-square overflow-hidden">
            <img
              src={post.src}
              alt={post.title}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </Link>
      ))}
    </div>
  );
}
