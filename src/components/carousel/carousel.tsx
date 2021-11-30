import { getImage } from "gatsby-plugin-image";
import React, { useEffect, useRef } from "react";
import { getOddPictures } from "../../utilities/carousel";
import BetterIndImg from "../frames/card/individual/image-wrapper-improved";
import ScrollTo from "gatsby-plugin-smoothscroll";
import { Chevron } from "../../icons/chevron";
import { getDownArrowScrollAnimation } from "../../animations/carousel";

export default function Carousel({ pictures, left, right, initialTransform }) {
  const oddPictures: any[] = getOddPictures(pictures); // must be an odd length for this to work.
  const arrowAnimation = useRef(null);

  function handleScroll() {
    const scrollTop = window.scrollY;
    const fade = arrowAnimation.current;
    if (scrollTop > 150) {
      fade.play();
    } else {
      fade.reverse();
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, true);
    const toGallery = document.getElementById("to-gallery");
    arrowAnimation.current = getDownArrowScrollAnimation(toGallery);
    return () => {
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, []);

  return (
    <div className="relative w-screen h-screen">
      <button
        data-ref="arrow"
        onClick={left}
        className="absolute top-0 left-0 z-10 h-full text-white text-7xl flex justify-center items-center"
      >
        <span className="rotate-90">
          <Chevron />
        </span>
      </button>
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
              style={initialTransform}
            >
              <BetterIndImg data={data} image={image} className="" />
            </div>
          );
        })}
      </div>
      <button
        data-ref="arrow"
        onClick={right}
        className="absolute right-3 top-0 text-white transition-all duration-700 z-10 h-full text-7xl flex justify-center items-center"
      >
        <span className="-rotate-90">
          <Chevron />
        </span>
      </button>
      <div
        id="to-gallery"
        className="absolute bottom-0 text-5xl flex justify-center items-center w-screen z-10"
      >
        <button
          data-ref="arrow"
          className="text-black w-12 h-12 rounded-full flex justify-center items-center"
          onClick={() => ScrollTo("#gallery", "start")}
        >
          <Chevron />
        </button>
      </div>
    </div>
  );
}
