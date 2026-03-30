import Image from "next/image";
import React from "react";

const Toolbar = () => {
  const menus = [
    "Home",
    "Easy Monthly Installments",
    "Shop By Brands",
    "Become a Vendor",
  ];

  const socialLinks = [
    { src: "/icons/facebook.png", width: 11, height: 22 },
    { src: "/icons/twiter.png", width: 22, height: 18 },
    { src: "/icons/linkedin.png", width: 22, height: 22 },
    { src: "/icons/insta.png", width: 22, height: 22 },
  ];
  return (
    <div className="bg-[#0E3B3E] px-16 py-2">
      <div className="flex items-center justify-between">
        {/* right side */}
        <div className="flex items-center gap-9">
          <div>
            <Image
              src="/icons/menu.png"
              alt="Menu Icon"
              width={13}
              height={13}
              className="inline-block"
            />
            <span className="text-white text-sm ml-2">Browse By Category</span>
          </div>
          <div>
            <ul className="flex items-center gap-6">
              {menus.map((menu, index) => (
                <li
                  key={index}
                  className="text-white text-xs hover:text-gray-300 transition-colors cursor-pointer"
                >
                  {menu}
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* left side */}
        <div>
          {socialLinks.map((social, index) => (
            <Image
              key={index}
              src={social.src}
              alt={`Social Icon ${index}`}
              width={social.width}
              height={social.height}
              className="inline-block ml-4"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Toolbar;
