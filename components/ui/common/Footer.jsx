"use client";
import { socialMediaList } from "@/constants/menuitems/socialMediaList";
import { Instagram, Twitch, Twitter, X, XIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Footer = () => {
  const path = usePathname();
  const footerList = [
    {
      name: "Beats",
      link: "/beats",
    },
    {
      name: "About-us",
      link: "/about",
    },
    {
      name: "Blogs",
      link: "/blogs",
    },
    {
      name: "Contact-us",
      link: "/contact",
    },
    {
      name: "Support",
      link: "mailto:guhan@guhanisonline.com",
    },
  ];
  return (
    <>
      <footer className="w-full border-t bg-background">
        <div className=" px-4 sm:px-6 lg:px-8">
          <div className="py-16 flex justify-between items-center flex-col gap-8 lg:flex-row">
            <Link href="/" className="flex justify-center text-4xl text-white ">
              <Image
                src="/assets/images/logo/logo_white.png"
                width={100}
                height={80}
                alt="logo"
              />
            </Link>
            <ul className="subtext text-center sm:flex items-center justify-center gap-14 lg:gap-10 xl:gap-14 transition-all duration-500">
              {footerList.map((item, index) => (
                <li key={index} className="sm:my-0 my-2">
                  <Link
                    href={item.link}
                    className="text-white hover:text-gray-400"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="flex  space-x-4 sm:justify-center  ">
              {socialMediaList.map((link, index) => (
                <Link
                  key={index}
                  href={link.link}
                  target="_blank"
                  className="w-9 h-9 rounded-full bg-gray-800 flex justify-center items-center hover:bg-indigo-600"
                >
                  {link.icon}
                </Link>
              ))}
            </div>
          </div>
          <div className="py-7 border-t border-gray-700">
            <div className="flex items-center justify-center">
              <span className="text-gray-400 text-[1.5rem] ">
                ©<a href="https://guhanisonline.com/">guhanisonline</a>2024, All
                rights reserved.
              </span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
