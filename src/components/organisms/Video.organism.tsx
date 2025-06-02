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
}

const Video = ({ title, id, thumbnailUrl, downloaded }: VideoProps) => {
  const router = useRouter();
  const handleOfflineVideoNavigation = (videoId: string) => {
    if (!navigator.onLine) {
      localStorage.setItem("offline-video-id", videoId); // Store the video ID
      window.location.href = `/video/${videoId}`; // Navigate to the video route
    } else {
      router.push(`/video/${videoId}`); // Normal online navigation
    }
  };
  return (
    <div
      onClick={() => handleOfflineVideoNavigation(id)}
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
