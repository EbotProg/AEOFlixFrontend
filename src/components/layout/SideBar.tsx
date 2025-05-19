"use client";
import IconRepository from "@/lib/assets/icons/icon.Repository";
import React, { useEffect, useState } from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import TheatersOutlinedIcon from "@mui/icons-material/TheatersOutlined";
import TheatersIcon from "@mui/icons-material/Theaters";
import SmartDisplayOutlinedIcon from "@mui/icons-material/SmartDisplayOutlined";
import FileDownloadOutlined from "@mui/icons-material/FileDownloadOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import HomeIcon from "@mui/icons-material/Home";
import SmartDisplayIcon from "@mui/icons-material/SmartDisplay";
import GetAppOutlinedIcon from "@mui/icons-material/GetAppOutlined";
import FileDownloadRoundedIcon from "@mui/icons-material/FileDownloadRounded";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import Link from "next/link";
import { usePathname } from "next/navigation";
import useClickOutside from "@/lib/hooks/useClickOutside";

interface SideBarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  handleMenuClick: () => void;
}

const SideBar = ({ isOpen, handleMenuClick, setIsOpen }: SideBarProps) => {
  const links = [
    { name: "Home", path: "/" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "Your videos", path: "/your-videos" },
    { name: "Downloads", path: "/downloads" },
    { name: "Settings", path: "/settings" },
    { name: "Account", path: "/account" },
  ];

  const pathname = usePathname();
  const isActive = (linkPath: string) => pathname.includes(linkPath);
  const [activeLink, setActiveLink] = useState<string>(links[0].name);
  const ref = useClickOutside(() => setIsOpen(false));
  // const [isOpen, setIsOpen] = useState<boolean>(false);
  // const handleMenuClick = () => {
  //   setIsOpen(!isOpen);
  // }
  const handleLinkClick = (linkName: string) => {
    setActiveLink(linkName);
  };

  useEffect(() => {
    links.map((link) => {
      console.log(isActive(link.path), link.path);
      console.log("activeLink", activeLink);
      if (isActive(link.path)) {
        setActiveLink(link.name);
      }
    });
  }, []);

  return (
    <div
      className={`${isOpen ? "backdrop-blur-[1px] bg-black/20 opacity-100 w-screen h-screen" : "opacity-0"} z-50 fixed top-0 left-0  transition-opacity duration-300 ease-in-out`}
    >
      <div
        ref={ref}
        className={`${isOpen ? "translate-x-0" : "-translate-x-full"} p-3 flex flex-col gap-11 w-[250px] z-50 bg-white h-screen fixed top-0 left-0 transition-transform duration-300 ease-in-out`}
      >
        <div className="flex flex-row gap-6 place-items-center">
          <button
            onClick={handleMenuClick}
            className="rounded-full flex flex-row cursor-pointer p-2 focus:bg-gray-200"
          >
            <IconRepository.MenuLogo width={25} height={25} />
          </button>
          <div className="flex flex-row gap-0.5 cursor-pointer place-items-center">
            <div className="p-1 bg-gray-300 rounded-md">
              <TheatersIcon />
            </div>

            <h1 className="text-lg font-semibold">AEOFlix</h1>
          </div>
        </div>

        <nav className="flex flex-col gap-6">
          <ul className="flex flex-col gap-3">
            <li>
              <Link
                onClick={() => handleLinkClick("Home")}
                className={`${"Home" === activeLink ? "bg-gray-200 font-semibold" : "hover:bg-gray-100"} flex flex-row gap-2 place-items-center p-2 rounded-md focus:bg-gray-200`}
                href="/"
              >
                {"Home" === activeLink ? <HomeIcon /> : <HomeOutlinedIcon />}
                Home
              </Link>
            </li>
            <li>
              <Link
                onClick={() => handleLinkClick("Dashboard")}
                className={`${"Dashboard" === activeLink ? "bg-gray-200 font-semibold" : "hover:bg-gray-100"} flex flex-row gap-2 place-items-center p-2 rounded-md focus:bg-gray-200`}
                href="/dashboard"
              >
                {"Dashboard" === activeLink ? (
                  <DashboardIcon />
                ) : (
                  <DashboardOutlinedIcon />
                )}{" "}
                Dashboard
              </Link>
            </li>
          </ul>
          <hr className="border-gray-300" />

          <ul className="flex flex-col gap-3">
            <li>
              <Link
                onClick={() => handleLinkClick("Your videos")}
                className={`${"Your videos" === activeLink ? "bg-gray-200 font-semibold" : "hover:bg-gray-100"} flex flex-row gap-2 place-items-center p-2 rounded-md focus:bg-gray-200`}
                href="/your-videos"
              >
                {"Your videos" === activeLink ? (
                  <SmartDisplayIcon />
                ) : (
                  <SmartDisplayOutlinedIcon />
                )}
                Your videos
              </Link>
            </li>
            <li>
              <Link
                onClick={() => handleLinkClick("Downloads")}
                className={`${"Downloads" === activeLink ? "bg-gray-200 font-semibold" : "hover:bg-gray-100"} flex flex-row gap-2 place-items-center p-2 rounded-md focus:bg-gray-200`}
                href="/downloads"
              >
                {"Downloads" === activeLink ? (
                  <FileDownloadRoundedIcon />
                ) : (
                  <GetAppOutlinedIcon />
                )}
                Downloads
              </Link>
            </li>
          </ul>

          <hr className="border-gray-300" />
          <ul className="flex flex-col gap-3">
            <li>
              <Link
                onClick={() => handleLinkClick("Settings")}
                className={`${"Settings" === activeLink ? "bg-gray-200 font-semibold" : "hover:bg-gray-100"} flex flex-row gap-2 place-items-center p-2 rounded-md focus:bg-gray-200`}
                href="/settings"
              >
                {"Settings" === activeLink ? (
                  <SettingsIcon />
                ) : (
                  <SettingsOutlinedIcon />
                )}
                Settings
              </Link>
            </li>
            <li>
              <Link
                onClick={() => handleLinkClick("Account")}
                className={`${"Account" === activeLink ? "bg-gray-200 font-semibold" : "hover:bg-gray-100"} flex flex-row gap-2 place-items-center p-2 rounded-md focus:bg-gray-200`}
                href="/account"
              >
                {"Account" === activeLink ? (
                  <AccountCircleIcon />
                ) : (
                  <AccountCircleOutlinedIcon />
                )}
                Account
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default SideBar;
