import Image from "next/image";

const HeroSection = () => {
  return (
    <div className="relative w-full xl:aspect-1400/318">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/banner1.webp"
          alt="Hero Background"
          fill
          className="object-cover lg:object-contain object-center"
          priority
          sizes="100vw"
        />
      </div>

      <div className="relative container mx-auto z-10 h-full grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 items-center px-4 py-4 sm:py-6 md:py-8">
        {/* Left Content */}
        <div className="z-10 max-w-lg lg:pl-3">
          <h1 className="text-2xl md:text-3xl lg:text-5xl font-light text-[#333333] leading-tight">
            Shop <span className="text-[#0AAEB9]">Computer</span>
            <br />
            <span className="text-[#0AAEB9]">& experience</span>
          </h1>

          <div className="mt-1 space-y-1 text-[11px] sm:text-[13px] md:text-base text-gray-700 font-medium">
            <p>
              You Cannot Inspect Quality Into The Product; It Is Already{" "}
              <br className="hidden lg:inline" />
              There.
            </p>
            <p>
              I Am Not A Product Of My Circumstances. I Am A Product Of{" "}
              <br className="hidden lg:inline" />
              My Decisions.
            </p>
          </div>

          <button className="mt-2 sm:mt-3 bg-[#00aeef] hover:bg-[#0096ce] text-white px-5 lg:px-8 py-2 lg:py-3 rounded-md transition-all font-medium text-sm sm:text-lg">
            View More
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
