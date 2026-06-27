import { Checkbox } from "@/components/ui/checkbox";
import { getAllTags, getTagCounts } from "@/data/posts";

type Props = {
  selected: string[];
  onToggle: (tag: string) => void;
  onClear: () => void;
};

export function TagSidebar({ selected, onToggle, onClear }: Props) {
  const tags = getAllTags();
  const counts = getTagCounts();

  return (
    <aside className="w-full shrink-0 md:w-56">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Tags
        </h2>
        {selected.length > 0 && (
          <button
            onClick={onClear}
            className="text-xs text-muted-foreground hover:text-foreground"
          >
            clear
          </button>
        )}
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
    </aside>
  );
}
