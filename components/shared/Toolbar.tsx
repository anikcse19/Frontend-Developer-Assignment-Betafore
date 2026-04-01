"use client";

import { useState } from "react";
import { menus, socialLinks } from "@/constants/global-constants";
import Image from "next/image";

const Toolbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-[#0E3B3E]">
      <div className="container mx-auto py-2 px-4">
        <div className="flex items-center justify-between">
          {/* Left side */}
          <div className="flex items-center gap-4 md:gap-9">
            {/* Browse by category button - acts as toggle on mobile */}
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center gap-2 md:cursor-default"
            >
              <Image
                src="/icons/menu.png"
                alt="Menu Icon"
                width={13}
                height={13}
              />
              <span className="text-white text-sm md:text-base whitespace-nowrap">
                Browse By Category
              </span>
            </button>

            {/* Menu links - hidden on mobile */}
            <ul className="hidden lg:flex items-center gap-6">
              {menus.map((menu, index) => (
                <li
                  key={index}
                  className="text-white text-xs xl:text-sm hover:text-gray-300 transition-colors cursor-pointer"
                >
                  {menu}
                </li>
              ))}
            </ul>
          </div>

          {/* Social icons - hidden on mobile, visible on md+ */}
          <div className="hidden md:flex gap-6">
            {socialLinks.map((social, index) => (
              <Image
                key={index}
                src={social.src}
                alt={social.alt}
                width={social.width}
                height={social.height}
              />
            ))}
          </div>
        </div>

        {/* Mobile/tablet dropdown */}
        {open && (
          <div className="lg:hidden mt-3 pb-2 border-t border-white/10 pt-3 space-y-4">
            <ul className="flex flex-col gap-3">
              {menus.map((menu, index) => (
                <li
                  key={index}
                  className="text-white text-sm hover:text-gray-300 transition-colors cursor-pointer"
                >
                  {menu}
                </li>
              ))}
            </ul>

            {/* Social icons on mobile */}
            <div className="flex md:hidden gap-6 pt-2 border-t border-white/10">
              {socialLinks.map((social, index) => (
                <Image
                  key={index}
                  src={social.src}
                  alt={social.alt}
                  width={social.width}
                  height={social.height}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Toolbar;
