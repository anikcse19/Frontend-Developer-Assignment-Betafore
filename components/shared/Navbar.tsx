"use client";

import { useState } from "react";
import Image from "next/image";
import SearchBar from "./SearchBar";
import { Category } from "@/features/categories/types/categories";
import { Product } from "@/features/products/types/products";

interface NavbarProps {
  categories: Category[];
  products: Product[];
}

const Navbar = ({ categories, products }: NavbarProps) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="bg-[#03484D]">
      <div className="container mx-auto py-3.5 px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={132}
            height={48}
            className=""
            loading="eager"
          />

          {/* Search bar - hidden on mobile/tablet, visible on lg+ */}
          <div className="hidden lg:block flex-1 mx-8">
            <SearchBar
              initialCategories={categories}
              initialProducts={products}
            />
          </div>

          {/* Right side icons + info - hidden on mobile/tablet */}
          <div className="hidden lg:flex items-center gap-10">
            <div className="text-white text-[9px]">
              <div>
                <p>Call Us Now</p>
                <span className="flex items-center gap-1">
                  <Image
                    src="/icons/headphones.png"
                    alt="Phone Icon"
                    width={19}
                    height={19}
                    className="inline-block"
                  />
                  <a href="tel:+011 5827918" className="font-medium text-sm">
                    +011 5827918
                  </a>
                </span>
                <p>Sign In</p>
              </div>
            </div>
            <div className="flex items-center gap-6 pr-6">
              <Image
                src="/icons/user.png"
                alt="User Icon"
                width={24}
                height={24}
                className="inline-block mt-2"
              />
              <Image
                src="/icons/heart.png"
                alt="Heart Icon"
                width={24}
                height={24}
                className="inline-block mt-2"
              />
              <Image
                src="/icons/cart.png"
                alt="Cart Icon"
                width={60}
                height={44}
                className="inline-block mt-2"
              />
            </div>
          </div>

          {/* Mobile/Tablet: cart icon + hamburger */}
          <div className="flex lg:hidden items-center gap-4">
            <Image
              src="/icons/cart.png"
              alt="Cart Icon"
              width={48}
              height={36}
              className="inline-block"
            />
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-white p-1"
              aria-label="Toggle menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {menuOpen ? (
                  <>
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </>
                ) : (
                  <>
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile/Tablet menu dropdown */}
        {menuOpen && (
          <div className="lg:hidden mt-4 space-y-4 pb-2">
            {/* Search bar */}
            <SearchBar
              initialCategories={categories}
              initialProducts={products}
            />

            {/* Contact & actions */}
            <div className="flex items-center justify-between text-white">
              <div className="text-[9px]">
                <p>Call Us Now</p>
                <span className="flex items-center gap-1">
                  <Image
                    src="/icons/headphones.png"
                    alt="Phone Icon"
                    width={19}
                    height={19}
                    className="inline-block"
                  />
                  <a href="tel:+011 5827918" className="font-medium text-sm">
                    +011 5827918
                  </a>
                </span>
                <p>Sign In</p>
              </div>

              <div className="flex items-center gap-6">
                <Image
                  src="/icons/user.png"
                  alt="User Icon"
                  width={24}
                  height={24}
                  className="inline-block"
                />
                <Image
                  src="/icons/heart.png"
                  alt="Heart Icon"
                  width={24}
                  height={24}
                  className="inline-block"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
