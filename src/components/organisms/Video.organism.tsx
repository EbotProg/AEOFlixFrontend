import IconRepository from "@/lib/assets/icons/icon.Repository";
import Link from "next/link";
import React from "react";

interface VideoProps {
  title: string;
  id: string;
  thumbnailUrl: string;
}

const Video = ({ title, id, thumbnailUrl }: VideoProps) => {
  return (
    <Link
      href={`/video/${id}`}
      className="flex flex-col gap-2 bg-white w-full hover:cursor-pointer hover:bg-gray-100 hover:rounded-2xl p-2"
    >
      <img className="rounded-xl aspect-video" src={thumbnailUrl} alt={title} />
      <div>
        <h5>{title}</h5>
        <button>
          <IconRepository.DownloadIcon />
        </button>
      </div>
    </Link>
  );
};

export default Video;
