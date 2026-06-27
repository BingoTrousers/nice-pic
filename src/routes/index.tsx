import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { TagSidebar } from "@/components/TagSidebar";
import { PostGrid } from "@/components/PostGrid";
import { filterByTags, searchPosts } from "@/data/posts";
import { Badge } from "@/components/ui/badge";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const PAGE_SIZE = 4;

const searchSchema = z.object({
  tags: fallback(z.string(), "").default(""),
  mode: fallback(z.enum(["all", "any"]), "all").default("all"),
  page: fallback(z.number().int().min(1), 1).default(1),
  q: fallback(z.string(), "").default(""),
});

export const Route = createFileRoute("/")({
  validateSearch: zodValidator(searchSchema),
  head: () => ({
    meta: [
      { title: "nice pic — home" },
      { name: "description", content: "A tiny booru-style imageboard." },
      { property: "og:title", content: "nice pic — home" },
      { property: "og:description", content: "A tiny booru-style imageboard." },
    ],
  }),
  component: Index,
});

function Index() {
  const { tags, mode, page, q } = Route.useSearch();
  const navigate = useNavigate({ from: "/" });
  const selected = tags ? tags.split(",").filter(Boolean) : [];
  const filtered = searchPosts(filterByTags(selected, mode), q);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * PAGE_SIZE;
  const pagePosts = filtered.slice(start, start + PAGE_SIZE);

  const update = (next: string[]) => {
    navigate({ search: { tags: next.join(","), mode, page: 1, q } });
  };
  const setMode = (m: "all" | "any") => {
    navigate({ search: { tags, mode: m, page: 1, q } });
  };
  const setPage = (p: number) => {
    navigate({ search: { tags, mode, page: p, q } });
  };
  const clearSearch = () => {
    navigate({ search: { tags, mode, page: 1, q: "" } });
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <div className="flex flex-col gap-6 md:flex-row">
        <TagSidebar
          selected={selected}
          mode={mode}
          onToggle={(t: string) =>
            update(selected.includes(t) ? selected.filter((x: string) => x !== t) : [...selected, t])
          }
          onClear={() => update([])}
          onModeChange={setMode}
        />
        <div className="flex-1">
          <div className="mb-4 flex min-h-7 flex-wrap items-center gap-2">
            {q && (
              <Badge
                variant="secondary"
                className="cursor-pointer font-mono"
                onClick={clearSearch}
              >
                search: "{q}" ×
              </Badge>
            )}
            {selected.length > 0 && (
              <>
                <span className="text-xs text-muted-foreground">
                  filtering ({mode === "all" ? "match all" : "match any"}):
                </span>
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
              </>
            )}
          </div>
          <PostGrid posts={pagePosts} />
          {totalPages > 1 && (
            <Pagination className="mt-6">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage > 1) setPage(currentPage - 1);
                    }}
                    aria-disabled={currentPage === 1}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <PaginationItem key={p}>
                    <PaginationLink
                      href="#"
                      isActive={p === currentPage}
                      onClick={(e) => {
                        e.preventDefault();
                        setPage(p);
                      }}
                    >
                      {p}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage < totalPages) setPage(currentPage + 1);
                    }}
                    aria-disabled={currentPage === totalPages}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </div>
      </div>
    </div>
  );
}
