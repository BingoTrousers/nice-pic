import { Checkbox } from "@/components/ui/checkbox";
import { getAllTags, getTagCounts } from "@/data/posts";

type Props = {
  selected: string[];
  mode: "all" | "any";
  onToggle: (tag: string) => void;
  onClear: () => void;
  onModeChange: (mode: "all" | "any") => void;
};

export function TagSidebar({ selected, mode, onToggle, onClear, onModeChange }: Props) {
  const tags = getAllTags();
  const counts = getTagCounts();

  return (
    <aside className="w-full shrink-0 md:w-56">
      <div className="mb-3">
        <h2 className="font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Tags
        </h2>
      </div>
      <div className="mb-3 inline-flex rounded-md border p-0.5 text-xs">
        <button
          onClick={() => onModeChange("all")}
          className={`rounded px-2 py-1 font-mono transition-colors ${
            mode === "all" ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          match all
        </button>
        <button
          onClick={() => onModeChange("any")}
          className={`rounded px-2 py-1 font-mono transition-colors ${
            mode === "any" ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          match any
        </button>
      </div>
      <ul className="space-y-1.5">
        {tags.map((tag) => {
          const checked = selected.includes(tag);
          return (
            <li key={tag}>
              <label className="flex cursor-pointer items-center gap-2 rounded px-1.5 py-1 text-sm hover:bg-accent">
                <Checkbox
                  checked={checked}
                  onCheckedChange={() => onToggle(tag)}
                />
                <span className="flex-1 font-mono">{tag}</span>
                <span className="text-xs text-muted-foreground">{counts[tag]}</span>
              </label>
            </li>
          );
        })}
      </ul>
      <div className="mt-3 min-h-8">
        {selected.length > 0 && (
          <button
            onClick={onClear}
            className="rounded bg-black px-3 py-1.5 text-xs font-mono text-white hover:bg-black/80"
          >
            clear tags
          </button>
        )}
      </div>
    </aside>
  );
}
