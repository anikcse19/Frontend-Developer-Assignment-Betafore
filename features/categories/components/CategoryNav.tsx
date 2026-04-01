"use client";

import { useRef, useEffect, useCallback } from "react";
import { Category } from "@/features/categories/types/categories";

interface CategoryNavProps {
  categories: Category[];
  selectedCategory: string;
  onCategoryChange: (categoryName: string) => void;
}

export function CategoryNav({
  categories,
  selectedCategory,
  onCategoryChange,
}: CategoryNavProps) {
  const navRef = useRef<HTMLElement>(null);
  const buttonRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  const setButtonRef = useCallback(
    (name: string) => (el: HTMLButtonElement | null) => {
      if (el) buttonRefs.current.set(name, el);
      else buttonRefs.current.delete(name);
    },
    [],
  );

  useEffect(() => {
    const btn = buttonRefs.current.get(selectedCategory);
    if (btn && navRef.current) {
      btn.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "nearest",
      });
    }
  }, [selectedCategory]);

  return (
    <nav
      ref={navRef}
      className="flex items-center gap-6 overflow-x-auto no-scrollbar"
    >
      {categories.map((cat, i) => (
        <button
          key={i}
          ref={setButtonRef(cat.name)}
          onClick={() => onCategoryChange(cat.name)}
          className={`text-xs font-bold cursor-pointer tracking-wider whitespace-nowrap pb-2 border-b-2 transition-colors capitalize ${
            selectedCategory === cat.name
              ? "text-[#12b1c1] border-[#12b1c1]"
              : "text-gray-700 border-transparent hover:text-[#12b1c1]"
          }`}
        >
          {cat.name}
        </button>
      ))}
    </nav>
  );
}
