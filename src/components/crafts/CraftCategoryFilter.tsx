"use client";

import type { CraftCategory } from "@/types";

export type CraftFilterValue = "전체" | CraftCategory;

export const CRAFT_FILTERS: readonly CraftFilterValue[] = ["전체", "도자기", "나전칠기", "보자기", "목공예"];

interface CraftCategoryFilterProps {
  value: CraftFilterValue;
  onChange: (value: CraftFilterValue) => void;
}

export function CraftCategoryFilter({ value, onChange }: CraftCategoryFilterProps) {
  return (
    <div role="group" aria-label="공예품 분류 필터" className="flex flex-wrap gap-2">
      {CRAFT_FILTERS.map((filter) => {
        const selected = filter === value;
        return (
          <button
            key={filter}
            type="button"
            aria-pressed={selected}
            onClick={() => onChange(filter)}
            className={`inline-flex min-h-11 items-center justify-center rounded-md border-2 px-4 py-2 text-base ${
              selected
                ? "border-ink bg-beige font-bold text-ink underline underline-offset-4"
                : "border-line-strong bg-surface font-medium text-ink hover:bg-beige"
            }`}
          >
            {filter}
          </button>
        );
      })}
    </div>
  );
}
