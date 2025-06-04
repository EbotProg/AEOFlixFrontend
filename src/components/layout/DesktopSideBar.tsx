import useWindowSize from "@/lib/hooks/useWindowSize";
import Link from "next/link";
import { usePathname } from "next/navigation";
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

interface DesktopSideBarProps {
  isOpen: boolean;
}

const DesktopSideBar = ({ isOpen }: DesktopSideBarProps) => {
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
  const [isClient, setIsClient] = useState(false);
  const { width } = useWindowSize();
  const isMediumSmallScreen = width < 1024;
  const isLargeScreen = width >= 1024;
  useEffect(() => {
    setIsClient(true);
  }, []);
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
  }, [pathname]);

  useEffect(() => {
    console.log("isOpen", isOpen);
  }, [isOpen]);

  return (
    <div
      className={`${isClient && isOpen && isLargeScreen ? "translate-x-0" : "-translate-x-full"} p-3 flex flex-col gap-11 w-[250px] z-50 bg-white h-[500px] sticky top-[65px] left-0 transition-transform duration-300 ease-in-out`}
    >
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
  );
};

export default DesktopSideBar;
