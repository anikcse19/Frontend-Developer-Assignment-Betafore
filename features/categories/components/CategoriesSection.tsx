"use client";

import Image from "next/image";
import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";

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
];

const CategoryShowcase = () => {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <div
      style={{
        background:
          "linear-gradient(to bottom, #F3EDC9 0%, #F6F0D5 25%, #FDFAF0 50%, white 50%)",
      }}
    >
      <div className="container mx-auto pt-3.75 pb-10.25 border-b-2 border-gray-200 relative px-8 sm:px-12 md:px-20 lg:px-52">
        <Swiper
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
          }}
          slidesPerView={4}
          spaceBetween={24}
          slidesOffsetBefore={0}
          slidesOffsetAfter={0}
          breakpoints={{
            0: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
        >
          {categories.map((category, i) => (
            <SwiperSlide key={category.name + i}>
              <div className="bg-white border border-[#eaeaea] shadow-md relative group cursor-pointer h-36 sm:h-40 md:h-48">
                <Image
                  src={category.imageUrl}
                  alt={category.name}
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
                  className="absolute -left-2 bottom-0 mb-3 bg-white p-4 flex justify-between items-center h-12 transition-all duration-300 w-full"
                >
                  <Image
                    src="/images/Polygon.png"
                    alt="Folded Corner"
                    width={10}
                    height={10}
                    className="absolute -top-1 left-0"
                    sizes="10px"
                  />

                  <h3 className="text-base sm:text-lg md:text-2xl font-normal text-gray-800 tracking-tight">
                    {category.name}
                  </h3>

                  <a
                    href={category.shopUrl}
                    className="text-sm sm:text-base md:text-lg font-medium text-[#00adef] hover:text-[#0096cc] flex items-center gap-1.5 transition-colors"
                  >
                    Shop
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
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Buttons */}
        <button
          onClick={() => swiperRef.current?.slidePrev()}
          className="absolute -left-8 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-gray-400 hover:text-gray-600 transition-colors"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="square"
              strokeLinejoin="miter"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        <button
          onClick={() => swiperRef.current?.slideNext()}
          className="absolute -right-8 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-gray-400 hover:text-gray-600 transition-colors"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="square"
              strokeLinejoin="miter"
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
