"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import Image from "next/image";
import { ChevronDown, Search } from "lucide-react";
import { getProductsByCategory } from "@/features/products/actions/products";
import { Category } from "@/features/categories/types/categories";
import { Product } from "@/features/products/types/products";

interface SearchBarProps {
  initialCategories: Category[];
  initialProducts: Product[];
}

const SearchBar = ({ initialCategories, initialProducts }: SearchBarProps) => {
  const [category, setCategory] = useState("All categories");
  const [categories] = useState<Category[]>(initialCategories);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  // Server action called ONLY from user-triggered event handler
  const handleCategoryChange = useCallback(
    (cat: string) => {
      setCategory(cat);
      setOpen(false);

      if (cat === "All categories") {
        // Reset to initial products (from props) — no server action needed
        setProducts(initialProducts);
      } else {
        // Fetch category-specific products via server action (event handler)
        setLoading(true);
        getProductsByCategory(cat)
          .then(setProducts)
          .catch(() => setProducts([]))
          .finally(() => setLoading(false));
      }
    },
    [initialProducts],
  );

  const handleQueryChange = (value: string) => {
    setQuery(value);
    setShowResults(value.trim().length > 0);
  };

  // Derive filtered results from state — no effect needed
  const filtered = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return products.filter((p) => p.title.toLowerCase().includes(q));
  }, [query, products]);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowResults(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={searchRef}
      className="flex items-center w-full lg:w-1/2 border border-gray-300 rounded-md overflow-visible bg-white h-10 relative"
    >
      {/* Category Dropdown */}
      <div ref={dropdownRef} className="relative shrink-0">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center px-2 sm:px-3 md:px-4 py-2 text-gray-500 hover:bg-gray-50 transition-colors outline-none"
        >
          <span className="text-xs sm:text-sm mr-1 sm:mr-2 truncate max-w-[80px] sm:max-w-[120px]">
            {category}
          </span>
          <ChevronDown
            size={14}
            className="text-gray-400 transition-transform shrink-0"
          />
        </button>

        {open && (
          <ul className="absolute top-full left-0 mt-1 w-48 sm:w-56 bg-white border border-gray-200 rounded-md shadow-lg z-50 max-h-60 overflow-y-auto">
            <li>
              <button
                onClick={() => handleCategoryChange("All categories")}
                className={`w-full text-left px-3 sm:px-4 py-2 text-xs sm:text-sm hover:bg-gray-50 transition-colors ${
                  category === "All categories"
                    ? "text-[#12b1c1] font-medium"
                    : "text-gray-700"
                }`}
              >
                All categories
              </button>
            </li>
            {categories.map((cat) => (
              <li key={cat.id}>
                <button
                  onClick={() => handleCategoryChange(cat.name)}
                  className={`w-full text-left px-3 sm:px-4 py-2 text-xs sm:text-sm capitalize hover:bg-gray-50 transition-colors ${
                    category === cat.name
                      ? "text-[#12b1c1] font-medium"
                      : "text-gray-700"
                  }`}
                >
                  {cat.name}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Vertical Divider */}
      <div className="w-px h-10 bg-gray-300 mx-1 shrink-0"></div>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search for products"
        value={query}
        onChange={(e) => handleQueryChange(e.target.value)}
        onFocus={() => query.trim() && setShowResults(true)}
        className="min-w-0 flex-1 px-2 sm:px-3 md:px-4 py-2 text-xs sm:text-sm text-gray-600 outline-none placeholder-gray-400"
      />

      {/* Search Results Dropdown */}
      {showResults && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50 max-h-80 overflow-y-auto">
          {loading ? (
            <p className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-400">
              Loading...
            </p>
          ) : filtered.length > 0 ? (
            filtered.slice(0, 8).map((product) => (
              <div
                key={product.id}
                className="flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3 hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <div className="relative w-8 h-8 sm:w-10 sm:h-10 shrink-0">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    sizes="40px"
                    className="object-contain"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs sm:text-sm text-gray-800 truncate">
                    {product.title}
                  </p>
                  <p className="text-[10px] sm:text-xs text-[#12b1c1] font-medium">
                    ${product.price.toFixed(2)}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-400">
              No products found
            </p>
          )}
        </div>
      )}

      {/* Search Button */}
      <button className="bg-[#BDBDBD] hover:bg-gray-500 transition-colors px-1.5 sm:px-2 h-full flex items-center justify-center absolute right-0 top-0 rounded-r-md shrink-0">
        <Search size={18} className="text-white stroke-[2.5px]" />
      </button>
    </div>
  );
};

export default SearchBar;
