## Overview

A small static booru-style imageboard. No backend — 10 hardcoded sample images with tags, filterable via a left sidebar. Two routes in the top nav: Home (gallery) and Tags (tag index).

## Routes

- `/` — Home: grid of image thumbnails with a left sidebar of tags. Clicking a tag filters the grid (multi-select, AND filter). Selected tags shown as removable chips above the grid.
- `/tags` — Tags: list of all tags with image counts; clicking a tag navigates to Home pre-filtered by that tag (via search param `?tags=tag1,tag2`).
- `/post/$id` — (bonus, lightweight) single image view showing the full image and its tags. Optional — include since it's standard booru UX.

Top nav (shared header in `__root.tsx`): site title + Home and Tags links with active state.

## Data

`src/data/posts.ts` — array of 10 posts:

```ts
{ id: string, title: string, src: string, tags: string[] }
```

Images sourced from Unsplash (free, hotlinkable) covering a few themes so tag filtering is meaningful. Tags derived by flattening + deduping.

Example tag set (~10–12 tags): `landscape`, `city`, `night`, `nature`, `ocean`, `forest`, `mountain`, `architecture`, `animal`, `portrait`.

## Layout

- Header: sticky top bar, site name left, nav links right.
- Home page: two-column layout — left sidebar (tag checkboxes with counts) ~220px, right content area with responsive image grid (`grid-cols-2 md:grid-cols-3 lg:grid-cols-4`, square aspect-ratio thumbs, hover scale).
- Tags page: simple flex-wrap of tag badges with counts.
- Post detail: centered large image + tag list.

Filter state lives in URL search params on `/` so it's shareable and the Tags page can link into it.

## Styling

shadcn primitives (`Badge`, `Button`, `Checkbox`, `Card`) on the existing neutral theme. Light/clean booru aesthetic — white bg, subtle borders, monospace-ish tag chips. No new color tokens needed.

## Files to create

- `src/data/posts.ts` — posts + helpers (`getAllTags()`, `getTagCounts()`, `filterByTags()`).
- `src/components/SiteHeader.tsx` — top nav.
- `src/components/TagSidebar.tsx` — left tag filter (checkbox list).
- `src/components/PostGrid.tsx` — image grid.
- `src/routes/__root.tsx` — update to render `<SiteHeader />` above `<Outlet />`.
- `src/routes/index.tsx` — replace placeholder with Home (sidebar + grid, reads `?tags=` search param).
- `src/routes/tags.tsx` — Tags page.
- `src/routes/post.$id.tsx` — post detail page.

Each route gets its own `head()` metadata (title + description + og tags).

## Out of scope

No upload, no auth, no database, no comments, no pagination (only 10 images).