"use client";
import { useEffect, useState } from "react";
const useRemToPixel = (remValue: string) => {
  const [pixelValue, setPixelValue] = useState<number | null>(null);
  useEffect(() => {
    const getRemPixelValue = () => {
      // Create a temporary div element to calculate rem to pixel ratio
      const div = document.createElement("div");
      div.style.fontSize = "1rem";
      div.style.display = "none";
      document.body.appendChild(div);

      // Get the computed style and extract the font size in pixels
      const computedStyle = window.getComputedStyle(div);
      const remToPixelRatio = parseFloat(computedStyle.fontSize);

      // Clean up the temporary element
      document.body.removeChild(div);

      // Calculate the pixel value
      const rem = parseFloat(remValue);
      const pixels = rem * remToPixelRatio;

      return pixels;
    };

    const pixels = getRemPixelValue();
    setPixelValue(pixels);
  }, [remValue]);

  return pixelValue;
};

export default useRemToPixel;
