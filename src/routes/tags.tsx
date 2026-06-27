import { createFileRoute, Link } from "@tanstack/react-router";
import { getAllTags, getTagCounts } from "@/data/posts";

export const Route = createFileRoute("/tags")({
  head: () => ({
    meta: [
      { title: "booru — tags" },
      { name: "description", content: "Browse all tags on this booru." },
      { property: "og:title", content: "booru — tags" },
      { property: "og:description", content: "Browse all tags on this booru." },
    ],
  }),
  component: TagsPage,
});

function TagsPage() {
  const tags = getAllTags();
  const counts = getTagCounts();

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <h1 className="mb-4 font-mono text-2xl font-bold">All tags</h1>
      <ul className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <li key={tag}>
            <Link
              to="/"
              search={{ tags: tag }}
              className="inline-flex items-center gap-2 rounded-md border bg-card px-3 py-1.5 text-sm hover:bg-accent"
            >
              <span className="font-mono">{tag}</span>
              <span className="text-xs text-muted-foreground">{counts[tag]}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
