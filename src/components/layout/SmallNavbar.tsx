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

const SmallNavbar = () => {
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

  return (
    <div className="z-40 py-3 h-[500px] w-fit sticky top-[65px] left-0">
      <ul className="flex flex-col gap-3 px-2  place-items-center">
        <li>
          <Link
            onClick={() => handleLinkClick("Home")}
            className={`${"Home" === activeLink ? "font-semibold" : ""} flex flex-col gap-2 text-[10px] place-items-center hover:bg-gray-100 py-2 px-4 rounded-md`}
            href="/"
          >
            {"Home" === activeLink ? <HomeIcon /> : <HomeOutlinedIcon />}
            Home
          </Link>
        </li>
        <li>
          <Link
            onClick={() => handleLinkClick("Dashboard")}
            className={`${"Dashboard" === activeLink ? "font-semibold" : ""} flex flex-col gap-2 text-[10px] place-items-center hover:bg-gray-100 py-2 px-4 rounded-md`}
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
        <li>
          <Link
            onClick={() => handleLinkClick("Your videos")}
            className={`${"Your videos" === activeLink ? "font-semibold" : ""} flex flex-col gap-2 text-[10px] place-items-center hover:bg-gray-100 py-2 px-4 rounded-md`}
            href="/your-videos"
          >
            {"Your videos" === activeLink ? (
              <SmartDisplayIcon />
            ) : (
              <SmartDisplayOutlinedIcon />
            )}{" "}
            Your videos
          </Link>
        </li>
        <li>
          <Link
            onClick={() => handleLinkClick("Downloads")}
            className={`${"Downloads" === activeLink ? "font-semibold" : ""} flex flex-col gap-2 text-[10px] place-items-center hover:bg-gray-100 py-2 px-4 rounded-md`}
            href="/downloads"
          >
            {"Downloads" === activeLink ? (
              <FileDownloadRoundedIcon />
            ) : (
              <GetAppOutlinedIcon />
            )}{" "}
            Downloads
          </Link>
        </li>
        <li>
          <Link
            onClick={() => handleLinkClick("Settings")}
            className={`${"Settings" === activeLink ? "font-semibold" : ""} flex flex-col gap-2 text-[10px] place-items-center hover:bg-gray-100 py-2 px-4 rounded-md`}
            href="/settings"
          >
            {"Settings" === activeLink ? (
              <SettingsIcon />
            ) : (
              <SettingsOutlinedIcon />
            )}{" "}
            Settings
          </Link>
        </li>
        <li>
          <Link
            onClick={() => handleLinkClick("Account")}
            className={`${"Account" === activeLink ? "font-semibold" : ""} flex flex-col gap-2 text-[10px] place-items-center hover:bg-gray-100 py-2 px-4 rounded-md`}
            href="/dashboard"
          >
            {"Account" === activeLink ? (
              <AccountCircleIcon />
            ) : (
              <AccountCircleOutlinedIcon />
            )}{" "}
            Account
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SmallNavbar;
