"use client";
import React, { useEffect, useState } from "react";
import SideBar from "./SideBar";
import IconRepository from "@/lib/assets/icons/icon.Repository";
import NewNavbar from "./NewNavbar";
import useWindowSize from "@/lib/hooks/useWindowSize";
import SmallNavbar from "./SmallNavbar";
import DesktopSideBar from "./DesktopSideBar";

interface ClientLayoutProps {
  children: React.ReactNode;
}

const ClientLayout = ({ children }: ClientLayoutProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleMenuClick = () => {
    setIsOpen(!isOpen);
  };
  const { width } = useWindowSize();
  const isLargeScreen = width >= 1024;
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch((err) => {
        console.error("Service Worker registration failed:", err);
      });
    }
  }, []);

  return (
    <div className="flex flex-row relative">
      <SideBar
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        handleMenuClick={handleMenuClick}
      />

      <div className="w-full">
        <NewNavbar handleMenuClick={handleMenuClick} />

        <div className="flex flex-row">
          {isClient && isLargeScreen && (
            <div className="relative">
              {!isOpen ? <SmallNavbar /> : <DesktopSideBar isOpen={isOpen} />}
            </div>
          )}
          {children}
        </div>
      </div>
    </div>
  );
};

export default ClientLayout;
