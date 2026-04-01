"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Slide {
  id: number;
  title: string;
  highlight1: string;
  highlight2: string;
  subtitle: string[];
  buttonText: string;
  image: string;
}

const slides: Slide[] = [
  {
    id: 1,
    title: "Shop ",
    highlight1: "Computer",
    highlight2: "& experience",
    subtitle: [
      "You Cannot Inspect Quality Into The Product; It Is Already There.",
      "I Am Not A Product Of My Circumstances. I Am A Product Of My Decisions.",
    ],
    buttonText: "View More",
    image: "/images/banner1.webp",
  },
  {
    id: 2,
    title: "Discover ",
    highlight1: "Latest",
    highlight2: "Technology",
    subtitle: [
      "Innovation Distinguishes Between A Leader And A Follower.",
      "The Best Way To Predict The Future Is To Invent It.",
    ],
    buttonText: "Shop Now",
    image: "/images/banner1.webp",
  },
  {
    id: 3,
    title: "Explore ",
    highlight1: "Premium",
    highlight2: "Products",
    subtitle: [
      "Quality Is Not An Act, It Is A Habit.",
      "Excellence Is Not A Skill. It's An Attitude.",
    ],
    buttonText: "Learn More",
    image: "/images/banner1.webp",
  },
];

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Navigation functions
  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleDotClick = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative w-full xl:aspect-1400/318 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10 transition-opacity duration-500">
        <Image
          src={slides[currentSlide].image}
          alt="Hero Background"
          fill
          className="object-cover lg:object-contain object-center"
          priority
          sizes="100vw"
        />
      </div>

      {/* Navigation Arrows - Left */}
      <button
        onClick={handlePrev}
        className="absolute left-2 sm:left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-white/80 hover:bg-white rounded-full shadow-md transition-all opacity-0 hover:opacity-100 group-hover:opacity-100"
        aria-label="Previous slide"
      >
        <ChevronLeft size={20} className="text-gray-700 sm:block hidden" />
        <ChevronLeft size={16} className="text-gray-700 sm:hidden block" />
      </button>

      {/* Navigation Arrows - Right */}
      <button
        onClick={handleNext}
        className="absolute right-2 sm:right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-white/80 hover:bg-white rounded-full shadow-md transition-all opacity-0 hover:opacity-100 group-hover:opacity-100"
        aria-label="Next slide"
      >
        <ChevronRight size={20} className="text-gray-700 sm:block hidden" />
        <ChevronRight size={16} className="text-gray-700 sm:hidden block" />
      </button>

      <div className="relative container mx-auto z-10 h-full grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 items-center px-4 py-4 sm:py-6 md:py-8">
        {/* Left Content - Animated */}
        <div className="z-10 max-w-lg lg:pl-3">
          <div className="transition-opacity duration-500">
            <h1 className="text-2xl md:text-3xl lg:text-5xl font-light text-[#333333] leading-tight">
              {slides[currentSlide].title}
              <span className="text-[#0AAEB9]">
                {slides[currentSlide].highlight1}
              </span>
              <br />
              <span className="text-[#0AAEB9]">
                {slides[currentSlide].highlight2}
              </span>
            </h1>

            <div className="mt-1 space-y-1 text-[11px] sm:text-[13px] md:text-base text-gray-700 font-medium">
              {slides[currentSlide].subtitle.map((line, index) => (
                <p key={index}>
                  {line}
                  {index === 0 && <br className="hidden lg:inline" />}
                </p>
              ))}
            </div>

            <button className="mt-2 sm:mt-3 bg-[#00aeef] hover:bg-[#0096ce] text-white px-5 lg:px-8 py-2 lg:py-3 rounded-md transition-all font-medium text-sm sm:text-lg">
              {slides[currentSlide].buttonText}
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Dots - Bottom Center */}
      <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 sm:gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`w-2.5 h-2.5 sm:w-8 sm:h-2 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-[#0AAEB9]"
                : "bg-gray-400 hover:bg-white/90"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
