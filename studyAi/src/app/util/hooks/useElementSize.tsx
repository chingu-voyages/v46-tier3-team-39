"use client"
import { useState, useEffect } from "react";

const useElementPosition = () => {
  const [elementRef, setRef] = useState<HTMLElement | null>(null);
  const [position, setPosition] = useState({ x: 0, y: 0, width:0, height:0 });

  useEffect(() => {
    if (!elementRef) return;
    const element = elementRef;
    const handlePositionChange = () => {
      if (element) {
        const { x, y, width, height  } = element.getBoundingClientRect();
        setPosition({ x, y, width, height  });
      }
    };

    window.addEventListener("resize", handlePositionChange);
    document.addEventListener("scroll", handlePositionChange);

    handlePositionChange();

    return () => {
      window.removeEventListener("resize", handlePositionChange);
      document.removeEventListener("scroll", handlePositionChange);
    };
  }, [elementRef]);

  return { elementRef, setRef, position };
};

export default useElementPosition;
