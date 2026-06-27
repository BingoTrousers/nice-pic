import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Moon, Search, Sun } from "lucide-react";

export function SiteHeader() {
  const navigate = useNavigate();
  const search = useSearch({ strict: false }) as { q?: string };
  const [q, setQ] = useState(search.q ?? "");

  useEffect(() => {
    setQ(search.q ?? "");
  }, [search.q]);

  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const prefersDark =
      stored === "dark" ||
      (stored === null && window.matchMedia("(prefers-color-scheme: dark)").matches);
    document.documentElement.classList.toggle("dark", prefersDark);
    setIsDark(prefersDark);
  }, []);
  const toggleTheme = () => {
    const next = !isDark;
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
    setIsDark(next);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const value = q.trim();
    navigate({
      to: "/",
      search: { tags: "", mode: "all", page: 1, q: value },
    });
  };

  return (
    <header className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center px-4">
        <Link to="/" className="font-mono text-lg font-bold tracking-tight">
          nice pic
        </Link>
        <div className="ml-6 mr-3 h-6 w-px bg-border" aria-hidden="true" />
        <nav className="flex items-center gap-1 text-sm">
          <Link
            to="/"
            activeOptions={{ exact: true }}
            activeProps={{ className: "bg-accent text-accent-foreground" }}
            className="rounded-md px-3 py-1.5 hover:bg-accent hover:text-accent-foreground"
          >
            Home
          </Link>
          <div className="mx-1 h-6 w-px bg-border" aria-hidden="true" />
          <Link
            to="/tags"
            activeProps={{ className: "bg-accent text-accent-foreground" }}
            className="rounded-md px-3 py-1.5 hover:bg-accent hover:text-accent-foreground"
          >
            Tags
          </Link>
        </nav>
        <form onSubmit={onSubmit} className="ml-auto flex items-center">
          <div className="relative">
            <Search className="pointer-events-none absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="search posts or tags"
              className="h-8 w-48 rounded-md border bg-background pl-8 pr-2 font-mono text-sm outline-none focus:ring-2 focus:ring-ring sm:w-64"
            />
          </div>
        </form>
      </div>
    </header>
  );
}
