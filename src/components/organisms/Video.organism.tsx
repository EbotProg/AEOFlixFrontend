"use client";
import IconRepository from "@/lib/assets/icons/icon.Repository";
import useClickOutside from "@/lib/hooks/useClickOutside";
import { handleAddVideoToIndexedDB } from "@/utils/indexedDB";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { MouseEvent, useRef, useState } from "react";

interface VideoProps {
  title: string;
  id: string;
  thumbnailUrl: string;
  downloaded?: boolean;
  handleClick?: (id: string) => void; // Optional prop for handling video click
}

const Video = ({
  title,
  id,
  thumbnailUrl,
  downloaded,
  handleClick,
}: VideoProps) => {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const handleVideoNavigation = (videoId: string) => {
    if (downloaded) {
      handleClick?.(videoId); // Call the handleClick function if provided
    } else {
      router.push(`/video/${videoId}`); // Normal online navigation
    }
  };

  useClickOutside(menuRef, () => setIsVisible(false));

  const handleVidMenuClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent click from propagating to the parent div
    setIsVisible(!isVisible); // Toggle visibility of the menu
  };

  const handleDownloadClick = async (
    e: React.MouseEvent,
    id: string,
    thumnailUrl: string,
  ) => {
    e.stopPropagation(); // Prevent click from propagating to the parent div
    await handleAddVideoToIndexedDB(id, {
      title,
      thumbnailUrl,
    });
    router.push(`/downloads`); // Navigate to the video page after download
  };
  return (
    <div
      onClick={() => handleVideoNavigation(id)}
      className="flex flex-col gap-2 bg-white w-full hover:cursor-pointer p-2"
    >
      <img className="rounded-xl aspect-video" src={thumbnailUrl} alt={title} />
      <div className="flex flex-row items-center justify-between">
        <h5>{title}</h5>
        <div ref={menuRef} className="relative">
          <div
            className="p-2 rounded-full hover:bg-gray-200"
            onClick={handleVidMenuClick}
          >
            <IconRepository.ThreeDotsVertical width={20} height={20} />
          </div>
          {isVisible && (
            <div className="absolute right-0 -top-13 bg-white rounded py-2 shadow-lg">
              <button
                disabled={downloaded}
                onClick={(e: MouseEvent) =>
                  handleDownloadClick(e, id, thumbnailUrl)
                }
                className={`disabled:opacity-50 w-full px-2 py-1 hover:bg-gray-100`}
              >
                Download
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Video;
