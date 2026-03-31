import Image from "next/image";
import SearchBar from "./SearchBar";

const Navbar = () => {
  return (
    <div className="bg-[#03484D] py-4 px-16">
      <div className="flex justify-between">
        {/* left side */}
        <div className="flex items-center gap-10">
          <div>
            <Image src="/images/logo.png" alt="Logo" width={132} height={50} />
          </div>
          <SearchBar />
        </div>
        {/* right side */}
        <div className="flex items-center gap-10">
          <div className="text-white text-[9px]">
            <div>
              <p className="">Call Us Now</p>
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
          <div className="flex items-center gap-6">
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
      </div>
    </div>
  );
};

export default Navbar;
