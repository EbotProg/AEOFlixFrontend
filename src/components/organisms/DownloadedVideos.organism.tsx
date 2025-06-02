"use client";
import React, { useEffect, useState } from "react";
import Video from "./Video.organism";
import { listStoredVideos } from "@/utils/indexedDB";

interface DownloadedVideosProps {
  handleClick?: (id: string) => void; // Optional prop for handling video click
}

const DownloadedVideos = ({ handleClick }: DownloadedVideosProps) => {
  const [videoList, setVideoList] = React.useState<any[]>([]); // State to store the list of videos
  const [isLoading, setIsLoading] = useState(false);
  const getVideos = async () => {
    try {
      // const response = await fetch("https://aeoflixbackend.onrender.com/api/videos");
      setIsLoading(true);
      const data = await listStoredVideos();
      console.log("downloaded videos:", data);
      setIsLoading(false);
      setVideoList(data); // Update the video list state
    } catch (err: any) {
      console.error("Error fetching videos:", err);
    }
  };

  useEffect(() => {
    getVideos();
  }, []);

  return (
    <div className="w-full">
      {isLoading && <p>Loading ...</p>}
      {!isLoading && videoList && (
        <div className="flex flex-col gap-3 w-full md:grid md:grid-cols-2 lg:grid-cols-3">
          {videoList.map((item) => (
            <Video
              key={item.id}
              title={item.title}
              id={item.id}
              thumbnailUrl={item.thumbnailUrl}
              downloaded={true} // Indicating that this video is downloaded
              handleClick={handleClick} // Pass the handleClick function to Video component
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default DownloadedVideos;
