"use client";

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
  return (
    <nav className="flex items-center gap-6 overflow-x-auto no-scrollbar">
      {categories.map((cat, i) => (
        <button
          key={i}
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
