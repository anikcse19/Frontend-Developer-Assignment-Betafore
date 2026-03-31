"use client";
import React, { useState } from "react";
import { ChevronDown, Search } from "lucide-react";

const SearchBar = () => {
  const [category, setCategory] = useState("All categories");

  return (
    <div className="flex items-center w-full max-w-4xl border border-gray-300 rounded-md overflow-hidden bg-white h-10">
      {/* Category Dropdown */}
      <button className="flex items-center px-4 py-2 text-gray-500 hover:bg-gray-50 transition-colors whitespace-nowrap outline-none">
        <span className="text-sm mr-2">{category}</span>
        <ChevronDown size={16} className="text-gray-400" />
      </button>

      {/* Vertical Divider */}
      <div className="w-px h-10 bg-gray-300 mx-1"></div>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search for products"
        className="grow w-64 px-4 py-2 text-sm text-gray-600 outline-none placeholder-gray-400"
      />

      {/* Search Button */}
      <button className="bg-[#BDBDBD] hover:bg-gray-500 transition-colors px-2 h-full flex items-center justify-center">
        <Search size={22} className="text-white stroke-[2.5px]" />
      </button>
    </div>
  );
};

export default SearchBar;
