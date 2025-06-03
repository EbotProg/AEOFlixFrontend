import React, { useRef } from "react";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import useClickOutside from "@/lib/hooks/useClickOutside";

interface VideoModalProps {
  videoUrl: string; // URL of the video to be played
  handleClose: () => void; // Function to close the modal
}

const VideoModal = ({ videoUrl, handleClose }: VideoModalProps) => {
  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, handleClose);

  return (
    <div className="backdrop-blur-[10px] bg-black/20 opacity-100 w-full h-screen z-50 fixed top-0 left-0">
      <div className="flex relative w-full h-full">
        <CloseRoundedIcon
          onClick={handleClose}
          style={{
            color: "#ffffff",
            position: "absolute",
            top: 10,
            right: 10,
            width: "30px",
            height: "30px",
          }}
        />
        <div className="place-self-center w-full">
          <div ref={ref} className="w-fit place-self-center">
            <video
              controls
              style={{
                width: "100%",
                maxWidth: "600px",
                border: "1px solid #ccc",
                borderRadius: "8px",
                placeSelf: "center",
              }}
            >
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoModal;
