"use client";
import React, { useState } from "react";
import IconRepository from "@/lib/assets/icons/icon.Repository";
import Link from "next/link";

const Navbar = () => {
  const links = [
    { name: "Home", path: "/" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "Upload", path: "/upload" },
    { name: "Settings", path: "/settings" },
  ];
  const [activeLink, setActiveLink] = useState<string>(links[0].name);
  const handleLinkClick = (linkName: string) => {
    setActiveLink(linkName);
  };

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleMenuClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="p-4 bg-gray-100 flex flex-row justify-between place-items-center relative">
      <div className="py-2 px-5 bg-white rounded-2xl flex flex-row gap-2 cursor-pointer">
        <IconRepository.LogoIcon />
        <h1 className="text-sm">AEOFlix</h1>
      </div>

      <ul
        className={`${isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"} flex transition-all duration-300 delay-150 ease-in-out flex-col gap-2 absolute top-[100%] left-0 bg-gray-100 w-full px-4 py-6 text-center`}
      >
        {links.map((link) => (
          //<li key={link.name} onClick={() => handleLinkClick(link.name)} className={`${link.name === activeLink? 'bg-black text-white': 'bg-white text-black'}  py-2 px-5 rounded-2xl hover:bg-[#333333] hover:text-white`}>
          <Link
            href={link.path}
            key={link.name}
            onClick={() => handleLinkClick(link.name)}
            className={`${link.name === activeLink ? "bg-black text-white" : "bg-white text-black"}  py-2 px-5 rounded-2xl hover:bg-[#333333] hover:text-white focus:bg-black focus:text-white`}
          >
            {link.name}
          </Link>
          // </li>
        ))}
      </ul>
      <div>
        <button
          onClick={handleMenuClick}
          className="p-2 bg-gray-100 rounded-full flex flex-row gap-2 cursor-pointer"
        >
          <IconRepository.MenuLogo width={20} height={20} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
