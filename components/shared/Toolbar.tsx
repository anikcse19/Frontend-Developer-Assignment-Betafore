import { menus, socialLinks } from "@/constants/global-constants";
import Image from "next/image";

const Toolbar = () => {
  return (
    <div className="bg-[#0E3B3E]">
      <div className="flex items-center justify-between container mx-auto py-2">
        {/* left side */}
        <div className="flex items-center gap-9">
          <div>
            <Image
              src="/icons/menu.png"
              alt="Menu Icon"
              width={13}
              height={13}
            />
          </div>
          <span className="text-white ml-2">Browse By Category</span>
          <div>
            <ul className="flex items-center gap-6">
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
        </div>

        {/* right side */}
        <div className="flex gap-6">
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
    </div>
  );
};

export default Toolbar;
