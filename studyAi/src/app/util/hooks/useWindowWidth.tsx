"use client";
import { useEffect, useState } from "react";
import { debounce } from "lodash";
const useWindowWidth = () => {
  const [windowWidth, setWindowWidth] = useState(0);
  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = debounce(() => {
      setWindowWidth(window.innerWidth);
    }, 500);
    window.addEventListener("resize", handleResize);

    // Clean up the event listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return windowWidth;
};

export default useWindowWidth;
