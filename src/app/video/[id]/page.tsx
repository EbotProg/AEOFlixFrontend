"use client";
import React, { useEffect, useState } from "react";
import { isVideoDownloaded, retrieveVideoFromChunks } from "@/utils/indexedDB";
import VideoPlayer from "@/components/VideoPlayer";
import { usePathname } from "next/navigation";

const page = () => {
  const pathname = usePathname();
  const id = pathname.split("/")[2];
  const [videoUrl, setVideoUrl] = useState<string>(""); // State to store the video URL for playback
  const [isOffline, setIsOffline] = useState<boolean>(false); // State to check if the app is offline

  const getVid = async (id: string) => {
    const retrievedBlob = await retrieveVideoFromChunks(id);
    if (retrievedBlob) {
      const videoBlobUrl = URL.createObjectURL(retrievedBlob);
      setVideoUrl(videoBlobUrl); // Update the video URL for playback
    }
  };

  const getVideo = async (id: string) => {
    if (await isVideoDownloaded(id)) {
      setIsOffline(true);
      getVid(id as string);
    }
  };

  useEffect(() => {
    if (id) {
      getVideo(id as string);
    }
  }, [id]);

  return (
    <div>
      <div>
        {!isOffline && (
          <div style={{ marginTop: "20px" }}>
            {/* <VideoPlayer videoId={videoId} /> */}
            <VideoPlayer
              videoId={id as string}
              apiBaseUrl={`${process.env.NEXT_PUBLIC_API_URL}/api`}
              // apiBaseUrl="https://aeoflixbackend.onrender.com/api"
            />
          </div>
        )}
        {isOffline && videoUrl && (
          <div style={{ marginTop: "20px" }}>
            <video
              controls
              style={{
                width: "100%",
                maxWidth: "600px",
                border: "1px solid #ccc",
                borderRadius: "8px",
              }}
            >
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
