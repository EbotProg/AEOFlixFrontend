"use client";
import DownloadedVideos from "@/components/organisms/DownloadedVideos.organism";
import VideoModal from "@/components/organisms/VideoModal.organism";
import { retrieveVideoFromChunks } from "@/utils/indexedDB";
import React, { useEffect, useState } from "react";

const page = () => {
  const [videoUrl, setVideoUrl] = useState<string>(""); // State to store the video URL for playback
  const [videoId, setVideoId] = useState<string>(""); // State to store the video ID for playback
  const [isVideoModalOpen, setIsVideoModalOpen] = useState<boolean>(false); // State to control the video modal visibility

  const handleClick = (id: string) => {
    setVideoId(id); // Set the video ID for playback
  };
  const handleClose = () => {
    setIsVideoModalOpen(false); // Close the video modal
    setVideoUrl(""); // Clear the video URL
    setVideoId(""); // Clear the video ID
  };
  const getVid = async (id: string) => {
    const retrievedBlob = await retrieveVideoFromChunks(id);
    if (retrievedBlob) {
      const videoBlobUrl = URL.createObjectURL(retrievedBlob);
      setVideoUrl(videoBlobUrl); // Update the video URL for playback
    }
    setIsVideoModalOpen(true); // Open the video modal
  };

  useEffect(() => {
    if (videoId) {
      getVid(videoId); // Fetch the video when the videoId changes
    }
  }, [videoId]);

  return (
    <div className="w-full p-2 relative">
      <h1 className="text-2xl font-bold p-2">Downloads</h1>
      <DownloadedVideos handleClick={handleClick} />
      {isVideoModalOpen && videoUrl && (
        <VideoModal videoUrl={videoUrl} handleClose={handleClose} />
      )}
    </div>
  );
};

export default page;
