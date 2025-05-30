import DownloadedVideos from "@/components/organisms/DownloadedVideos.organism";
import React from "react";

const page = () => {
  return (
    <div className="w-full p-2">
      <h1 className="text-2xl font-bold p-2">Downloads</h1>
      <DownloadedVideos />
    </div>
  );
};

export default page;
