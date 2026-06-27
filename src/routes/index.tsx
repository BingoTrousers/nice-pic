import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { TagSidebar } from "@/components/TagSidebar";
import { PostGrid } from "@/components/PostGrid";
import { filterByTags } from "@/data/posts";
import { Badge } from "@/components/ui/badge";

const searchSchema = z.object({
  tags: fallback(z.string(), "").default(""),
});

export const Route = createFileRoute("/")({
  validateSearch: zodValidator(searchSchema),
  head: () => ({
    meta: [
      { title: "booru — home" },
      { name: "description", content: "A tiny booru-style imageboard." },
      { property: "og:title", content: "booru — home" },
      { property: "og:description", content: "A tiny booru-style imageboard." },
    ],
  }),
  component: Index,
});

function Index() {
  const { tags } = Route.useSearch();
  const navigate = useNavigate({ from: "/" });
  const selected = tags ? tags.split(",").filter(Boolean) : [];
  const filtered = filterByTags(selected);

  const update = (next: string[]) => {
    navigate({
      search: { tags: next.join(",") },
    });
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <div className="flex flex-col gap-6 md:flex-row">
        <TagSidebar
          selected={selected}
          onToggle={(t: string) =>
            update(selected.includes(t) ? selected.filter((x: string) => x !== t) : [...selected, t])
          }
          onClear={() => update([])}
        />
        <div className="flex-1">
          {selected.length > 0 && (
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <span className="text-xs text-muted-foreground">filtering by:</span>
              {selected.map((t: string) => (
                <Badge
                  key={t}
                  variant="secondary"
                  className="cursor-pointer font-mono"
                  onClick={() => update(selected.filter((x: string) => x !== t))}
                >
                  {t} ×
                </Badge>
              ))}
            </div>
          )}
          <PostGrid posts={filtered} />
        </div>
      </div>
    </div>
  );
}
