"use client";
import React, { useState } from "react";
import SideBar from "./SideBar";
import IconRepository from "@/lib/assets/icons/icon.Repository";
import NewNavbar from "./NewNavbar";

interface ClientLayoutProps {
  children: React.ReactNode;
}

const ClientLayout = ({ children }: ClientLayoutProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleMenuClick = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="flex flex-row relative">
      <SideBar isOpen={isOpen} handleMenuClick={handleMenuClick} />
      <div className="absolute top-0 left-0 w-full">
        <NewNavbar handleMenuClick={handleMenuClick} />

        {children}
      </div>
    </div>
  );
};

export default ClientLayout;
