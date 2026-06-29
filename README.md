# nice pic

A booru-style photo imageboard built with TanStack Start, React, and Tailwind CSS.

## Features

- Browse 37 photos across categories: landscapes, wildlife, food, astronomy, portraits, abstract, and more
- Filter by tags using **all** or **any** mode
- Full-text search by title or tag
- Paginated grid view and individual post detail pages
- Full tag browser
- Dark mode (persisted via `localStorage`)

## Stack

- [TanStack Start](https://tanstack.com/start) — SSR with file-based routing
- [React Query](https://tanstack.com/query) — data fetching
- [Tailwind CSS v4](https://tailwindcss.com) — styling
- [shadcn/ui](https://ui.shadcn.com) — UI primitives (New York style, slate base)
- [Zod](https://zod.dev) — URL search param validation
- [Vite](https://vite.dev) + Nitro — build tooling, targets Cloudflare by default

## Getting started

```bash
bun install
bun run dev
```

## Commands

```bash
bun run dev      # start dev server
bun run build    # production build
bun run lint     # ESLint
bun run format   # Prettier
```

## Adding content

All posts live in `src/data/posts.ts` as a static array. Add a new entry with an `id`, `title`, `src` (image URL), and `tags[]`. No database or API required.
