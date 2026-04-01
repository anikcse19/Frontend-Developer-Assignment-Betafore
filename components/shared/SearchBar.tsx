"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import Image from "next/image";
import { ChevronDown, Search } from "lucide-react";
import { getCategories } from "@/features/categories/actions/categories";
import {
  getAllProducts,
  getProductsByCategory,
} from "@/features/products/actions/products";
import { Category } from "@/features/categories/types/categories";
import { Product } from "@/features/products/types/products";

const SearchBar = () => {
  const [category, setCategory] = useState("All categories");
  const [categories, setCategories] = useState<Category[]>([]);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getCategories()
      .then(setCategories)
      .catch(() => {});
  }, []);

  const fetchProducts = useCallback((cat: string) => {
    setLoading(true);
    const request =
      cat === "All categories" ? getAllProducts() : getProductsByCategory(cat);

    request
      .then(setProducts)
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  // Initial product fetch on mount
  useEffect(() => {
    getAllProducts()
      .then(setProducts)
      .catch(() => setProducts([]));
  }, []);

  const handleCategoryChange = (cat: string) => {
    setCategory(cat);
    setOpen(false);
    fetchProducts(cat);
  };

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
      className="flex items-center w-full border border-gray-300 rounded-md overflow-visible bg-white h-10 relative"
    >
      {/* Category Dropdown */}
      <div ref={dropdownRef} className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center px-4 py-2 text-gray-500 hover:bg-gray-50 transition-colors whitespace-nowrap outline-none"
        >
          <span className="text-sm mr-2">{category}</span>
          <ChevronDown
            size={16}
            className={`text-gray-400 transition-transform ${open ? "rotate-180" : ""}`}
          />
        </button>

        {open && (
          <ul className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50 max-h-60 overflow-y-auto">
            <li>
              <button
                onClick={() => handleCategoryChange("All categories")}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
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
                  className={`w-full text-left px-4 py-2 text-sm capitalize hover:bg-gray-50 transition-colors ${
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
      <div className="w-px h-10 bg-gray-300 mx-1"></div>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search for products"
        value={query}
        onChange={(e) => handleQueryChange(e.target.value)}
        onFocus={() => query.trim() && setShowResults(true)}
        className="grow min-w-0 px-4 py-2 text-sm text-gray-600 outline-none placeholder-gray-400"
      />

      {/* Search Results Dropdown */}
      {showResults && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50 max-h-80 overflow-y-auto">
          {loading ? (
            <p className="px-4 py-3 text-sm text-gray-400">Loading...</p>
          ) : filtered.length > 0 ? (
            filtered.slice(0, 8).map((product) => (
              <div
                key={product.id}
                className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <div className="relative w-10 h-10 shrink-0">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    sizes="40px"
                    className="object-contain"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-gray-800 truncate">
                    {product.title}
                  </p>
                  <p className="text-xs text-[#12b1c1] font-medium">
                    ${product.price.toFixed(2)}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="px-4 py-3 text-sm text-gray-400">No products found</p>
          )}
        </div>
      )}

      {/* Search Button */}
      <button className="bg-[#BDBDBD] hover:bg-gray-500 transition-colors px-2 h-full flex items-center justify-center">
        <Search size={22} className="text-white stroke-[2.5px]" />
      </button>
    </div>
  );
};

export default SearchBar;
