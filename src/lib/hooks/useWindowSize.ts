"use client";

import { useEffect, useState } from "react";

const useWindowSize = () => {
  const hasWindow = typeof window !== "undefined";

  const [windowSize, setWindowSize] = useState({
    width: hasWindow ? window.innerWidth : 0,
    height: hasWindow ? window.innerHeight : 800,
  });

  useEffect(() => {
    if (!hasWindow) {
      return;
    }

    function changeWindowSize() {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    }

    window.addEventListener("resize", changeWindowSize);

    return () => {
      window.removeEventListener("resize", changeWindowSize);
    };
  }, [hasWindow]);

  return windowSize;
};

export default useWindowSize;
