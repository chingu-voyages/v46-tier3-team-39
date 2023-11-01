"use client";
import { useEffect, useState } from "react";
import { debounce } from "lodash";
export const useWindowHeight = () => {
  const [windowHeight, setwindowHeight] = useState(0);
  useEffect(() => {
    setwindowHeight(window.innerWidth);
    const handleResize = debounce(() => {
      setwindowHeight(window.innerHeight);
    }, 500);
    window.addEventListener("resize", handleResize);

    // Clean up the event listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return windowHeight;
};
