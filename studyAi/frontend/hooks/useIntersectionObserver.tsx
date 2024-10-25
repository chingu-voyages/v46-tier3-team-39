"use client";
import { useEffect, useState } from "react";

const useIntersectionObserver = (
  options: IntersectionObserverInit | undefined
) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [ref, setRef] = useState<HTMLElement | null>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);

    if (ref) {
      observer.observe(ref);
    }

    return () => {
      if (ref) {
        observer.unobserve(ref);
      }
    };
  }, [options, ref]);

  return {
    ref,
    isIntersecting,
    setRef,
  };
};

export default useIntersectionObserver;
