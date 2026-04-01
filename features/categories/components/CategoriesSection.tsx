"use client";

import Image from "next/image";
import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import { enrichCategoriesWithImages } from "../config/category-images";
import { Category } from "../types/categories";

interface CategoryShowcaseProps {
  categories: Array<Category>;
}

const CategoryShowcase = ({ categories }: CategoryShowcaseProps) => {
  const swiperRef = useRef<SwiperType | null>(null);

  // Enrich categories with image information
  const categoriesWithImages = enrichCategoriesWithImages(categories);

  return (
    <div
      style={{
        background:
          "linear-gradient(to bottom, #F3EDC9 0%, #F6F0D5 25%, #FEFEFE 50%, white 50%)",
      }}
    >
      <div className="container mx-auto pt-3.75 pb-10.25 border-b-2 border-gray-200 relative px-0 sm:px-4 md:px-12 lg:px-20 xl:px-52">
        <div className="px-4 sm:px-4 md:px-0">
          <Swiper
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            slidesPerView={1.2}
            spaceBetween={12}
            centeredSlides={false}
            grabCursor={true}
            resistance={true}
            resistanceRatio={0.85}
            touchRatio={1}
            touchAngle={45}
            simulateTouch={true}
            allowTouchMove={true}
            breakpoints={{
              480: { slidesPerView: 1.5, spaceBetween: 16 },
              640: { slidesPerView: 2, spaceBetween: 20 },
              768: { slidesPerView: 3, spaceBetween: 24 },
              1024: { slidesPerView: 4, spaceBetween: 24 },
            }}
          >
            {categoriesWithImages.map((category, index) => (
              <SwiperSlide key={category.id}>
                <div
                  className={`bg-white border border-[#eaeaea] shadow-md relative group cursor-pointer h-32 sm:h-36 md:h-40 lg:h-48 ${index === 0 ? "ml-2 md:ml-3" : ""}`}
                >
                  <Image
                    src={category.imageUrl}
                    alt={category.imageAlt}
                    className="w-full h-full object-cover transition-transform duration-300 border-2 border-white"
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    loading="eager"
                    priority
                  />

                  <div
                    style={{
                      boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                    }}
                    className="absolute -left-2 bottom-0 mb-2 sm:mb-3 bg-white p-2 sm:p-3 md:p-4 flex justify-between items-center h-10 sm:h-12 transition-all duration-300 w-full"
                  >
                    <Image
                      src="/images/Polygon.png"
                      alt="Folded Corner"
                      width={10}
                      height={10}
                      className="absolute -top-1 left-0"
                      sizes="10px"
                    />

                    <h3 className="text-xs sm:text-sm md:text-base lg:text-lg font-normal text-gray-800 tracking-tight capitalize">
                      {category.name}
                    </h3>

                    <a
                      href={`/?category=${encodeURIComponent(category.name)}`}
                      className="text-xs sm:text-sm md:text-base lg:text-lg font-medium text-[#00adef] hover:text-[#0096cc] flex items-center gap-1 sm:gap-1.5 transition-colors"
                    >
                      Shop
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3 sm:h-4 sm:w-4"
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
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Custom Navigation Buttons - Hidden on mobile, visible on desktop */}
        <button
          onClick={() => swiperRef.current?.slidePrev()}
          className="hidden md:flex absolute -left-8 lg:-left-12 top-1/2 -translate-y-1/2 z-10 items-center justify-center cursor-pointer "
          aria-label="Previous category"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 lg:h-8 lg:w-8 text-gray-600 hover:text-gray-900 transition-colors"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <button
          onClick={() => swiperRef.current?.slideNext()}
          className="hidden md:flex absolute -right-8 lg:-right-12 top-1/2 -translate-y-1/2 z-10 items-center justify-center cursor-pointer  "
          aria-label="Next category"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 lg:h-8 lg:w-8 text-gray-600 hover:text-gray-900 transition-colors"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CategoryShowcase;
