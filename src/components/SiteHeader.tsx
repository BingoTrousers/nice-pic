import { Link } from "@tanstack/react-router";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <Link to="/" className="font-mono text-lg font-bold tracking-tight">
          booru
        </Link>
        <nav className="flex items-center gap-1 text-sm">
          <Link
            to="/"
            activeOptions={{ exact: true }}
            activeProps={{ className: "bg-accent text-accent-foreground" }}
            className="rounded-md px-3 py-1.5 hover:bg-accent hover:text-accent-foreground"
          >
            Home
          </Link>
          <Link
            to="/tags"
            activeProps={{ className: "bg-accent text-accent-foreground" }}
            className="rounded-md px-3 py-1.5 hover:bg-accent hover:text-accent-foreground"
          >
            Tags
          </Link>
        </nav>
      </div>
    </header>
  );
}
