"use client";
import React, { createContext, useEffect, useState } from "react";

interface FullscreenContextType {
  isFullscreen: boolean;
  toggleFullscreen: () => void;
}

export const FullscreenContext = createContext<FullscreenContextType>({
  isFullscreen: false,
  toggleFullscreen: () => {},
});
const FullscreenProvider = ({ children }: { children: React.ReactNode }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
      const handleFullscreenChange = () => {
        setIsFullscreen(document.fullscreenElement !== null);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  const toggleFullscreen = () => {
    let currDocument: any = document;
    if (!isFullscreen) {
      // Go fullscreen
      if (currDocument.documentElement.requestFullscreen) {
        currDocument.documentElement.requestFullscreen();
      } else if (currDocument.documentElement.mozRequestFullScreen) {
        currDocument.documentElement.mozRequestFullScreen();
      } else if (currDocument.documentElement.webkitRequestFullscreen) {
        currDocument.documentElement.webkitRequestFullscreen();
      } else if (currDocument.documentElement.msRequestFullscreen) {
        currDocument.documentElement.msRequestFullscreen();
      }
    } else {
      // Exit fullscreen
      if (currDocument.exitFullscreen) {
        currDocument.exitFullscreen();
      } else if (currDocument.mozCancelFullScreen) {
        currDocument.mozCancelFullScreen();
      } else if (currDocument.webkitExitFullscreen) {
        currDocument.webkitExitFullscreen();
      } else if (currDocument.msExitFullscreen) {
        currDocument.msExitFullscreen();
      }
    }
  };

  return (
    <FullscreenContext.Provider
      value={{
        isFullscreen,
        toggleFullscreen,
      }}
    >
      {children}
    </FullscreenContext.Provider>
  );
};
export const useFullscreen = () => React.useContext(FullscreenContext);
export default FullscreenProvider;
