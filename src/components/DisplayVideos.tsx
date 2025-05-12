import { retrieveVideoFromChunks, storeVideoAsChunks } from "@/utils/indexedDB";
import React, { useEffect } from "react";
import Video from "./organisms/Video.organism";

interface DisplayVideosProps {
  setOfflineId: (id: string) => void; // Function to set the offline video ID
  setOnlineId: (id: string) => void; // Function to set the online video ID
}

const DisplayVideos = ({ setOfflineId, setOnlineId }: DisplayVideosProps) => {
  const [videoList, setVideoList] = React.useState<any[]>([]); // State to store the list of videos

  const handleAddVideoToIndexedDB = async (id: string) => {
    // const videoId = "sample-video"; // Unique ID for the video
    // const videoPath = "/sample.mp4"; // Path to the video in the public folder
    // const videoId = "680ca9134e469cf84a48137e"; // Unique ID for the video
    const videoPath = `${process.env.NEXT_PUBLIC_API_URL}/api/videos/${id}`; // Path to the video in the public folder

    try {
      // Fetch the video from the public folder
      const response = await fetch(videoPath);
      if (!response.ok) {
        throw new Error(`Failed to fetch video: ${response.statusText}`);
      }

      // Get the video as a Blob
      const videoBlob = await response.blob();

      // Store the video in IndexedDB
      await storeVideoAsChunks(id, videoBlob);

      alert("Video has been added and is ready for offline viewing!");
    } catch (error: any) {
      console.error("Error adding video to IndexedDB:", error);
      alert(`Error: ${error.message}`);
    }
  };

  const fetchVideos = async () => {
    try {
      // const response = await fetch("https://aeoflixbackend.onrender.com/api/videos");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/videos`,
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch videos: ${response.statusText}`);
      }
      const data = await response.json();
      console.log("Fetched videos:", data);
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
      <ul>
        {videoList.map((video, index) => (
          <li key={index}>
            <h2>{video.title}</h2>
            <p>{video.description}</p>
            {/* <img className='w-10 h-10' src={`https://aeoflixbackend.onrender.com/thumbnails/${video.thumbnailName}`} alt="" /> */}
            <img className="w-10 h-10" src={`${video.thumbnailUrl}`} alt="" />
            <div className="flex flex-row gap-2">
              <button onClick={() => handleAddVideoToIndexedDB(video._id)}>
                download
              </button>
              <button onClick={() => setOnlineId(video._id)}>
                view online
              </button>
              <button onClick={() => setOfflineId(video._id)}>
                view offline
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div>
        <h1>test </h1>
        {
          <Video
            title={videoList[2]?.title}
            id={videoList[2]?._id}
            thumbnailUrl={videoList[2]?.thumbnailUrl}
          />
        }
      </div>
    </div>
  );
};

export default DisplayVideos;
