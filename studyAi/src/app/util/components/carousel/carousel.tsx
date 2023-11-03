"use client";
import { useRef, useEffect } from "react";
import { SwiperContainer, register } from "swiper/element/bundle";
import { SwiperOptions } from "swiper/types";
export const Carousel = ({ children }: { children: JSX.Element[] }) => {
  const swiperElRef = useRef<SwiperContainer | null>(null);
  useEffect(() => {
    register();
    if (!swiperElRef.current) return;
    // Object with parameters
    const params: SwiperOptions = {
      slidesPerView: "auto",
    };
    // Assign it to swiper element
    Object.assign(swiperElRef.current, params);
    // initialize swiper
    swiperElRef.current.initialize();
  }, []);

  return (
    <swiper-container
      ref={swiperElRef}
      init={false}
      style={{
        width: "inherit",
      }}
    >
      {children.map((el) => (
        <swiper-slide
          style={{
            width: "auto",
          }}
          key={el.key}
        >
          {el}
        </swiper-slide>
      ))}
    </swiper-container>
  );
};
