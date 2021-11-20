import { getImage } from "gatsby-plugin-image";
import React, { useEffect, useRef, useState } from "react";
import {
  getInitialTransform,
  getMaxX,
  getMinX,
  getOddPictures,
  getPositionFarthestLeft,
  getTransfromProperty,
  isFirstOffLeft,
  isFirstOffRight,
  isInViewport,
  slideCarouselLeft,
  slideCarouselRight,
} from "../../utilities/carousel";
import BetterIndImg from "../frames/card/individual/image-wrapper-improved";
import ScrollTo from "gatsby-plugin-smoothscroll";

export default function Carousel({ pictures, left, right, clearTimer }) {
  const oddPictures: any[] = getOddPictures(pictures); // must be an odd length for this to work.
  const [arrowStyle, setArrowStyle] = useState({});
  const [cancelAuto, setCancelAuto] = useState(false);
  const [visibleSlides, setVisibleSlides] = useState(undefined);

  function handleScroll() {
    if (typeof document != "undefined") {
      const scrollTop = document.querySelector(".tl-edges").scrollTop;
      if (scrollTop > 150) {
        setArrowStyle({
          opacity: "0",
          transitionProperty: "opacity",
          transitionDuration: "700ms",
          transitionTimingFunction: "linear",
          willChange: "opacity",
        });
      }
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, true);
    return () => {
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, []);

  return (
    <div className="relative w-screen h-screen">
      <div className="absolute w-2/12 h-full z-10 group">
        <button
          onMouseEnter={clearTimer}
          onClick={left}
          className="absolute z-10 h-full text-white text-7xl flex justify-center items-center transition-all duration-700 left-0"
        >
          <span className="rotate-180">&#10146;</span>
        </button>
      </div>
      <div className="flex max-h-screen overflow-hidden">
        {oddPictures.map((picture, i) => {
          const data = picture.node;
          const image = getImage(data.image);
          return (
            <div
              id={`slide${i}`}
              className="min-w-[40%] shadow-inner"
              key={data.id}
              data-ref="slide"
            >
              <BetterIndImg data={data} image={image} className="" />
            </div>
          );
        })}
      </div>
      <div className="absolute top-0 right-0 w-2/12 h-full z-10 group">
        <button
          onMouseEnter={clearTimer}
          onClick={right}
          className="absolute text-white transition-all duration-700 right-3 z-10 h-full text-7xl flex justify-center items-center"
        >
          &#10146;
        </button>
      </div>
      <button
        className="absolute bottom-4 text-4xl flex justify-center items-center w-screen text-white z-20"
        style={arrowStyle}
        onClick={() => ScrollTo("#gallery", "end")}
      >
        <span className="border-2 border-white w-12 h-12 rounded-full flex justify-center items-center pb-1">
          &darr;
        </span>
      </button>
    </div>
  );
}
