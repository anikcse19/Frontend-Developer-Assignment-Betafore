import Image from "next/image";
import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";

const Footer = () => {
  const footerSections = [
    {
      title: "Trending",
      links: [
        "Installments",
        "Electronics",
        "Grocery",
        "Health & Beauty",
        "Home Appliances",
        "Mobile Accessories",
      ],
    },
    {
      title: "Information",
      links: [
        "About Us",
        "Contact Us",
        "FAQs",
        "Shipping & Return",
        "Privacy policy",
        "Terms & Conditions",
      ],
    },
    {
      title: "Customer Care",
      links: [
        "My Account",
        "Track Your Order",
        "Recently Viewed",
        "Wishlist",
        "Compare",
        "Become a Vendor",
      ],
    },
  ];

  return (
    <footer>
      <div className="bg-[#393939] text-white py-12">
        <div className="px-37.25 grid grid-cols-1 md:grid-cols-2">
          {/* Contact Column */}
          <div className="flex flex-col gap-4">
            <div className="mb-2">
              <div>
                <Image
                  src="/images/logo.png"
                  alt="Logo"
                  width={132}
                  height={50}
                />
              </div>
            </div>

            <div>
              <p className="text-[#00c2cb] text-lg font-medium">
                Got questions? Call us 24/7!
              </p>
              <p className="text-gray-300 text-sm mt-2">03 111 666 144</p>
              <p className="text-gray-300 text-sm">0317 1777015.</p>
            </div>

            <div>
              <p className="text-[#00c2cb] text-lg font-medium">Contact info</p>
              <p className="text-gray-300 text-sm italic">info@winstore.pk</p>
            </div>

            <div className="flex gap-4 mt-2">
              <FaFacebookF className="cursor-pointer hover:text-[#00c2cb] transition-colors" />
              <FaTwitter className="cursor-pointer hover:text-[#00c2cb] transition-colors" />
              <FaLinkedinIn className="cursor-pointer hover:text-[#00c2cb] transition-colors" />
              <FaInstagram className="cursor-pointer hover:text-[#00c2cb] transition-colors" />
            </div>
          </div>

          <div className="flex justify-between items-center">
            {/* Dynamic Link Columns */}
            {footerSections.map((section) => (
              <div key={section.title}>
                <h3 className="text-[#00c2cb] text-xl mb-6">{section.title}</h3>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-gray-300 text-sm hover:text-white transition-colors"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Methods Section */}
        <div className="px-37.25 flex justify-end gap-3 mt-10">
          <PaymentCard src="/images/visacard.png" alt="Visa" />
          <PaymentCard src="/images/mastercard.png" alt="Mastercard" />
          <PaymentCard src="/images/cod.png" alt="Cash on Delivery" />
          <PaymentCard src="/images/eip.png" alt="Installment Plans" />
        </div>
      </div>
      <div className="bg-black h-15 pl-31 flex items-center">
        <p className="text-white text-sm">
          © 2021 STRATUS99 E-Commerce, Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

const PaymentCard = ({ src, alt }: { src: string; alt: string }) => (
  <div className="bg-white rounded-md p-1 flex items-center justify-center">
    <Image
      src={src}
      alt={alt}
      className="max-h-full max-w-full object-contain"
      width={90}
      height={55}
    />
  </div>
);

export default Footer;
