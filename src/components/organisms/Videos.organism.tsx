"use client";
import React, { useEffect, useState } from "react";
import Video from "./Video.organism";

const Videos = () => {
  const [videoList, setVideoList] = React.useState<any[]>([]); // State to store the list of videos
  const [isLoading, setIsLoading] = useState(false);
  const fetchVideos = async () => {
    try {
      // const response = await fetch("https://aeoflixbackend.onrender.com/api/videos");
      setIsLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/videos`,
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch videos: ${response.statusText}`);
      }
      const data = await response.json();
      console.log("Fetched videos:", data);
      setIsLoading(false);
      setVideoList(data); // Update the video list state
    } catch (err: any) {
      console.error("Error fetching videos:", err);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  return (
    <div>
      {isLoading && <p>Loading ...</p>}
      {!isLoading && videoList && (
        <div className="flex flex-col gap-3">
          {videoList.map((item) => (
            <Video
              key={item._id}
              title={item.title}
              id={item._id}
              thumbnailUrl={item.thumbnailUrl}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Videos;
