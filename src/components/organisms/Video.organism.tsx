import IconRepository from "@/lib/assets/icons/icon.Repository";
import Link from "next/link";
import React from "react";

interface VideoProps {
  title: string;
  id: string;
  thumbnailUrl: string;
  downloaded?: boolean;
}

const Video = ({ title, id, thumbnailUrl, downloaded }: VideoProps) => {
  return (
    <Link
      href={`/video/${id}`}
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
    </Link>
  );
};

export default Video;
