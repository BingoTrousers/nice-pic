import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { getAllTags, getTagCounts } from "@/data/posts";

const searchSchema = z.object({
  sort: fallback(z.enum(["alpha", "count"]), "alpha").default("alpha"),
});

export const Route = createFileRoute("/tags")({
  validateSearch: zodValidator(searchSchema),
  head: () => ({
    meta: [
      { title: "nice pic — tags" },
      { name: "description", content: "Browse all tags on nice pic." },
      { property: "og:title", content: "nice pic — tags" },
      { property: "og:description", content: "Browse all tags on nice pic." },
    ],
  }),
  component: TagsPage,
});

function TagsPage() {
  const { sort } = Route.useSearch();
  const navigate = useNavigate({ from: "/tags" });
  const counts = getTagCounts();
  const tags = [...getAllTags()].sort((a, b) =>
    sort === "count" ? counts[b] - counts[a] || a.localeCompare(b) : a.localeCompare(b)
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <div className="mb-4 flex flex-wrap items-center gap-4">
        <h1 className="font-mono text-2xl font-bold">All tags</h1>
        <div className="inline-flex rounded-md border p-0.5 text-xs">
          <button
            onClick={() => navigate({ search: { sort: "alpha" } })}
            className={`rounded px-2 py-1 font-mono transition-colors ${
              sort === "alpha"
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            A–Z
          </button>
          <button
            onClick={() => navigate({ search: { sort: "count" } })}
            className={`rounded px-2 py-1 font-mono transition-colors ${
              sort === "count"
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            most pictures
          </button>
        </div>
      </div>
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
