"use client";
import IconRepository from "@/lib/assets/icons/icon.Repository";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

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
  const handleVideoNavigation = (videoId: string) => {
    if (downloaded) {
      handleClick?.(videoId); // Call the handleClick function if provided
    } else {
      router.push(`/video/${videoId}`); // Normal online navigation
    }
  };
  return (
    <div
      onClick={() => handleVideoNavigation(id)}
      className="flex flex-col gap-2 bg-white w-full hover:cursor-pointer p-2"
    >
      <img className="rounded-xl aspect-video" src={thumbnailUrl} alt={title} />
      <div>
        <h5>{title}</h5>
        {!downloaded && (
          <button>
            <IconRepository.DownloadIcon />
          </button>
        )}
      </div>
    </div>
  );
};

export default Video;
