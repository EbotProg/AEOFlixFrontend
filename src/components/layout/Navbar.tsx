"use client";
import React, { useEffect, useState } from "react";
import IconRepository from "@/lib/assets/icons/icon.Repository";
import Link from "next/link";
import useWindowSize from "@/lib/hooks/useWindowSize";
import { usePathname } from "next/navigation";

const Navbar: React.FC = () => {
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
  const [isClient, setIsClient] = useState(false);
  const pathname = usePathname();
  const isActive = (linkPath: string) => pathname.includes(linkPath);

  const { width } = useWindowSize();

  const handleMenuClick = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    setIsClient(true);
    links.map((link) => {
      console.log(isActive(link.path), link.path);

      if (isActive(link.path)) {
        setActiveLink(link.name);
      }
    });
  }, []);

  return (
    <nav className="p-4 bg-gray-100 flex flex-row justify-between place-items-center sticky top-0 h-[60px] md:h-[70px] font-montserrat">
      <div className="py-2 px-5 bg-white rounded-2xl flex flex-row gap-2 cursor-pointer">
        <IconRepository.LogoIcon />
        <h1 className="text-sm font-semibold">AEOFlix</h1>
      </div>
      {isClient && width < 768 && (
        <ul
          className={`${isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 hidden"} flex place-items-center  flex-col gap-2 transition-all duration-300 delay-150 ease-in-out absolute top-[100%] left-0  bg-gray-100 w-full px-4 py-6 text-center md:static md:w-fit md:flex-row`}
        >
          {links.map((link) => (
            //<li key={link.name} onClick={() => handleLinkClick(link.name)} className={`${link.name === activeLink? 'bg-black text-white': 'bg-white text-black'}  py-2 px-5 rounded-2xl hover:bg-[#333333] hover:text-white`}>
            <Link
              href={link.path}
              key={link.name}
              onClick={() => handleLinkClick(link.name)}
              className={`${link.name === activeLink ? "bg-black text-white font-semibold" : "bg-white text-black hover:bg-[#333333] hover:text-white"}  py-2 px-5 rounded-2xl  focus:bg-black focus:text-white w-full max-w-[500px] md:px-5 md:py-2 md:rounded-4xl`}
            >
              {link.name}
            </Link>
            // </li>
          ))}
        </ul>
      )}
      {isClient && width >= 768 && (
        <ul
          className={`flex place-items-center flex-col gap-2 bg-gray-100 w-full px-4 text-center md:w-fit md:flex-row`}
        >
          {links.map((link) => (
            //<li key={link.name} onClick={() => handleLinkClick(link.name)} className={`${link.name === activeLink? 'bg-black text-white': 'bg-white text-black'}  py-2 px-5 rounded-2xl hover:bg-[#333333] hover:text-white`}>
            <Link
              href={link.path}
              key={link.name}
              onClick={() => handleLinkClick(link.name)}
              className={`${link.name === activeLink ? "bg-black text-white font-semibold" : "bg-white text-black hover:bg-[#333333] hover:text-white"}  py-2 px-5 rounded-2xl  focus:bg-black focus:text-white w-full max-w-[500px] md:px-5 md:py-2 md:rounded-4xl md:text-sm`}
            >
              {link.name}
            </Link>
            // </li>
          ))}
        </ul>
      )}

      <div>
        <button
          onClick={handleMenuClick}
          className="p-2 bg-white rounded-full flex flex-row gap-2 cursor-pointer"
        >
          <IconRepository.MenuLogo width={20} height={20} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
