"use client";

import dynamic from "next/dynamic";

const CategoryShowcase = dynamic(
  () => import("@/features/categories/components/CategoriesSection"),
  { ssr: false },
);

export default function CategoriesSectionWrapper() {
  return <CategoryShowcase />;
}
