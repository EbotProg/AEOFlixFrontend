import IconRepository from "@/lib/assets/icons/icon.Repository";
import TheatersOutlinedIcon from "@mui/icons-material/TheatersOutlined";
import TheatersIcon from "@mui/icons-material/Theaters";

import React from "react";
interface NewNavbarProps {
  handleMenuClick: () => void;
}
const NewNavbar = ({ handleMenuClick }: NewNavbarProps) => {
  return (
    <div className="flex flex-row gap-6 place-items-center p-3 lg:py-3 lg:px-7 sticky top-0 left-0 bg-white z-40 ">
      <button
        onClick={handleMenuClick}
        className="rounded-full flex flex-row cursor-pointer p-2 hover:bg-gray-200 focus:bg-gray-300"
      >
        <IconRepository.MenuLogo width={25} height={25} />
      </button>
      <div className="flex flex-row gap-0.5 cursor-pointer place-items-center">
        <div className="p-1 bg-gray-300 rounded-md">
          <TheatersOutlinedIcon />
        </div>

        <h1 className="text-lg font-semibold">AEOFlix</h1>
      </div>
    </div>
  );
};

export default NewNavbar;
