"use client";

import Image from "next/image";
import { useRef, useState } from "react";

// Sample data for the cards (Replace with your own images and links)
const categories = [
  {
    name: "Electronics",
    imageUrl:
      "https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg?auto=compress&cs=tinysrgb&w=800",
    shopUrl: "#",
  },
  {
    name: "Fashion",
    imageUrl:
      "https://images.pexels.com/photos/1036622/pexels-photo-1036622.jpeg?auto=compress&cs=tinysrgb&w=800",
    shopUrl: "#",
  },
  {
    name: "Appliances",
    imageUrl:
      "https://images.pexels.com/photos/1080696/pexels-photo-1080696.jpeg?auto=compress&cs=tinysrgb&w=800",
    shopUrl: "#",
  },
  {
    name: "Babies Store",
    imageUrl:
      "https://images.pexels.com/photos/1080696/pexels-photo-1080696.jpeg?auto=compress&cs=tinysrgb&w=800",
    shopUrl: "#",
  },
  {
    name: "Babies Store",
    imageUrl:
      "https://images.pexels.com/photos/1080696/pexels-photo-1080696.jpeg?auto=compress&cs=tinysrgb&w=800",
    shopUrl: "#",
  },
  {
    name: "Babies Store",
    imageUrl:
      "https://images.pexels.com/photos/1080696/pexels-photo-1080696.jpeg?auto=compress&cs=tinysrgb&w=800",
    shopUrl: "#",
  },
];

const CategoryShowcase = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      const newScrollLeft =
        scrollContainerRef.current.scrollLeft +
        (direction === "left" ? -scrollAmount : scrollAmount);

      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: "smooth",
      });
    }
  };

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  return (
    <div
      className="py-12 px-6"
      style={{
        background:
          "linear-gradient(to bottom, #F3EDC9 0%, #F6F0D5 25%, #FDFAF0 50%, white 50%)",
      }}
    >
      {/* Container with fixed width and arrows */}
      <div className="flex items-center gap-2">
        {/* Left Arrow */}
        <button
          onClick={() => scroll("left")}
          disabled={!canScrollLeft}
          className={`flex-shrink-0 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center transition-all ${
            canScrollLeft
              ? "hover:bg-gray-100 cursor-pointer opacity-100"
              : "opacity-30 cursor-not-allowed"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        {/* Scrollable container with fixed width */}
        <div
          ref={scrollContainerRef}
          onScroll={checkScroll}
          className="flex overflow-x-auto gap-6 scrollbar-hide px-2"
          style={{ width: "calc(100% - 100px)" }}
        >
          {categories.map((category) => (
            <div
              key={category.name}
              className="bg-white border-1 border-[#eaeaea] shadow-md relative group cursor-pointer h-48 flex-shrink-0 w-64"
            >
              {/* The Main Image */}
              <Image
                src={category.imageUrl}
                alt={category.name}
                className="w-full h-full object-cover transition-transform duration-300"
                fill
              />

              {/* The White Overlay Panel */}
              <div
                style={{
                  boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                }}
                className="absolute -left-2 bottom-0 mb-3 bg-white p-4 flex justify-between items-center h-[3rem] transition-all duration-300 w-full"
              >
                {/* Folded corner effect - triangle extending outward */}
                <Image
                  src="/images/Polygon.png"
                  alt="Folded Corner"
                  width={10}
                  height={10}
                  className="absolute -top-1 -left-0"
                />

                <h3 className="text-2xl font-normal text-gray-800 tracking-tight">
                  {category.name}
                </h3>

                {/* Blue "Shop" Link */}
                <a
                  href={category.shopUrl}
                  className="text-lg font-medium text-[#00adef] hover:text-[#0096cc] flex items-center gap-1.5 transition-colors"
                >
                  Shop
                  {/* Arrow icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => scroll("right")}
          disabled={!canScrollRight}
          className={`flex-shrink-0 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center transition-all ${
            canScrollRight
              ? "hover:bg-gray-100 cursor-pointer opacity-100"
              : "opacity-30 cursor-not-allowed"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CategoryShowcase;
