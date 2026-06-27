export type Post = {
  id: string;
  title: string;
  src: string;
  tags: string[];
};

export const posts: Post[] = [
  {
    id: "1",
    title: "Mountain lake at dawn",
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80",
    tags: ["landscape", "mountain", "nature", "water"],
  },
  {
    id: "2",
    title: "Tokyo neon street",
    src: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=1200&q=80",
    tags: ["city", "night", "architecture"],
  },
  {
    id: "3",
    title: "Forest path",
    src: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=1200&q=80",
    tags: ["forest", "nature", "landscape"],
  },
  {
    id: "4",
    title: "Ocean waves",
    src: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=1200&q=80",
    tags: ["ocean", "water", "nature"],
  },
  {
    id: "5",
    title: "Red fox in snow",
    src: "https://images.unsplash.com/photo-1474511320723-9a56873867b5?w=1200&q=80",
    tags: ["animal", "nature"],
  },
  {
    id: "6",
    title: "City skyline at night",
    src: "https://images.unsplash.com/photo-1444723121867-7a241cacace9?w=1200&q=80",
    tags: ["city", "night", "architecture"],
  },
  {
    id: "7",
    title: "Portrait in window light",
    src: "https://images.unsplash.com/photo-1488161628813-04466f872be2?w=1200&q=80",
    tags: ["portrait"],
  },
  {
    id: "8",
    title: "Desert dunes",
    src: "https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?w=1200&q=80",
    tags: ["landscape", "nature"],
  },
  {
    id: "9",
    title: "Modern building facade",
    src: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=80",
    tags: ["architecture", "city"],
  },
  {
    id: "10",
    title: "Owl portrait",
    src: "https://images.unsplash.com/photo-1543549790-8b5f4a028cfb?w=1200&q=80",
    tags: ["animal", "portrait", "nature"],
  },
  {
    id: "11",
    title: "Sunlight through the trees",
    src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&q=80",
    tags: ["forest", "nature", "landscape"],
  },
  {
    id: "12",
    title: "Misty woodland morning",
    src: "https://images.unsplash.com/photo-1511497584788-876760111969?w=1200&q=80",
    tags: ["forest", "nature", "landscape"],
  },
  {
    id: "13",
    title: "Tall pines in the fog",
    src: "https://images.unsplash.com/photo-1502209524164-d2f3464971c5?w=1200&q=80",
    tags: ["forest", "nature", "landscape"],
  },
];

export function getAllTags(): string[] {
  const set = new Set<string>();
  posts.forEach((p) => p.tags.forEach((t) => set.add(t)));
  return Array.from(set).sort();
}

export function getTagCounts(): Record<string, number> {
  const counts: Record<string, number> = {};
  posts.forEach((p) => p.tags.forEach((t) => (counts[t] = (counts[t] ?? 0) + 1)));
  return counts;
}

export function filterByTags(selected: string[], mode: "all" | "any" = "all"): Post[] {
  if (selected.length === 0) return posts;
  if (mode === "any") {
    return posts.filter((p) => selected.some((t) => p.tags.includes(t)));
  }
  return posts.filter((p) => selected.every((t) => p.tags.includes(t)));
}

export function searchPosts(list: Post[], q: string): Post[] {
  const query = q.trim().toLowerCase();
  if (!query) return list;
  return list.filter(
    (p) =>
      p.title.toLowerCase().includes(query) ||
      p.tags.some((t) => t.toLowerCase().includes(query))
  );
}

export function getPost(id: string): Post | undefined {
  return posts.find((p) => p.id === id);
}

export default posts;

