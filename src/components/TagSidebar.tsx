import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { getAllTags, getTagCounts } from "@/data/posts";

const INITIAL_VISIBLE = 14;

type Props = {
  selected: string[];
  mode: "all" | "any";
  onToggle: (tag: string) => void;
  onClear: () => void;
  onModeChange: (mode: "all" | "any") => void;
};

export function TagSidebar({ selected, mode, onToggle, onClear, onModeChange }: Props) {
  const [showAll, setShowAll] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const counts = getTagCounts();
  const tags = getAllTags().sort((a, b) => (counts[b] ?? 0) - (counts[a] ?? 0));

  const topTags = tags.slice(0, INITIAL_VISIBLE);
  const restTags = tags.slice(INITIAL_VISIBLE);
  const selectedInRest = restTags.filter((t) => selected.includes(t));
  const hiddenCount = restTags.length - selectedInRest.length;
  const visibleTags = showAll ? tags : [...topTags, ...selectedInRest];

  const tagList = (
    <ul className="space-y-1.5">
      {visibleTags.map((tag) => {
        const checked = selected.includes(tag);
        return (
          <li key={tag}>
            <label className="flex cursor-pointer items-center gap-2 rounded px-1.5 py-2.5 text-sm hover:bg-accent">
              <Checkbox checked={checked} onCheckedChange={() => onToggle(tag)} />
              <span className="flex-1 font-mono">{tag}</span>
              <span className="text-xs text-muted-foreground">{counts[tag]}</span>
            </label>
          </li>
        );
      })}
    </ul>
  );

  const expandToggle = !showAll && hiddenCount > 0 ? (
    <button
      onClick={() => setShowAll(true)}
      className="mt-2 flex items-center gap-1 px-1.5 text-xs font-mono text-muted-foreground hover:text-foreground"
    >
      <ChevronDown className="h-3 w-3" />
      {hiddenCount} more
    </button>
  ) : showAll ? (
    <button
      onClick={() => setShowAll(false)}
      className="mt-2 flex items-center gap-1 px-1.5 text-xs font-mono text-muted-foreground hover:text-foreground"
    >
      <ChevronUp className="h-3 w-3" />
      show fewer
    </button>
  ) : null;

  return (
    <aside className="w-full shrink-0 md:w-56">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Tags
        </h2>
        <button
          className="flex items-center gap-1 rounded px-1.5 py-1 text-xs font-mono text-muted-foreground hover:text-foreground md:hidden"
          onClick={() => setMobileOpen((o) => !o)}
          aria-expanded={mobileOpen}
        >
          {selected.length > 0 && (
            <span className="rounded bg-foreground px-1.5 py-0.5 text-background">
              {selected.length}
            </span>
          )}
          {mobileOpen ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
        </button>
      </div>

      <div className={`${mobileOpen ? "block" : "hidden"} md:block`}>
        <div className="mb-3 inline-flex rounded-md border p-0.5 text-xs">
          <button
            onClick={() => onModeChange("any")}
            className={`rounded px-2 py-1 font-mono transition-colors ${
              mode === "any" ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            match any
          </button>
          <button
            onClick={() => onModeChange("all")}
            className={`rounded px-2 py-1 font-mono transition-colors ${
              mode === "all" ? "bg-accent text-accent-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            match all
          </button>
        </div>

        {tagList}
        {expandToggle}

        <div className="mt-3 min-h-8">
          {selected.length > 0 && (
            <button
              onClick={onClear}
              className="rounded bg-foreground px-3 py-1.5 text-xs font-mono text-background hover:bg-foreground/80"
            >
              clear tags
            </button>
          )}
        </div>
      </div>
    </aside>
  );
}
