import Image from "next/image";

const HeroSection = () => {
  return (
    <div className="relative w-full" style={{ aspectRatio: "1400 / 318" }}>
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/banner1.svg"
          alt="Hero Background"
          fill
          className="object-contain object-center"
          priority
          sizes="100vw"
        />
      </div>

      <div className="relative container mx-auto z-10 h-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center py-8">
        {/* Left Content */}
        <div className="z-10 max-w-lg">
          <h1 className="text-3xl md:text-5xl font-light text-[#333333] leading-tight">
            Shop <span className=" text-[#0AAEB9]">Computer</span>
            <br />
            <span className="text-[#0AAEB9]">& experience</span>
          </h1>

          <div className="mt-1 space-y- text-[13px] md:text-base text-gray-700 font-medium">
            <p>
              You Cannot Inspect Quality Into The Product; It Is Already <br />{" "}
              There.
            </p>
            <p>
              I Am Not A Product Of My Circumstances. I Am A Product Of <br />{" "}
              My Decisions.
            </p>
          </div>

          <button className="mt-3 bg-[#00aeef] hover:bg-[#0096ce] text-white px-8 py-3 rounded-md transition-all font-medium text-lg">
            View More
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
