import { getImage } from "gatsby-plugin-image";
import React, { useEffect, useState } from "react";
import {
  getOddPictures,
  getTransfromProperty,
  slideCarouselLeft,
  slideCarouselRight,
} from "../../utilities/carousel";
import BetterIndImg from "../frames/card/individual/image-wrapper-improved";
import ScrollTo from "gatsby-plugin-smoothscroll";

export default function Carousel({ pictures }) {
  const cardWidth = 40;
  const oddPictures: any[] = getOddPictures(pictures); // must be an odd length for this to work.
  const [allowNextPicture, setAllowNextPicture] = useState(false);
  const [arrowStyle, setArrowStyle] = useState({});
  const [cancelAuto, setCancelAuto] = useState(false);
  const [slides, setSlides] = useState<HTMLElement[]>(undefined);

  function handleScroll() {
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

  useEffect(() => {
    const slides = document.querySelectorAll("[data-ref=slide]");
    setSlides(slides);
    window.addEventListener("scroll", handleScroll, true);
    setAllowNextPicture(true);
    return () => {
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, []);

  useEffect(() => {
    if (!cancelAuto) {
      const timer = setInterval(() => {
        move("Right");
      }, 2000);
      // clearing interval

      return () => clearInterval(timer);
    }
  });

  const transformTransition = {
    transform: getTransfromProperty(cardWidth, oddPictures.length),
    transition: "transform 1200ms cubic-bezier(0.4, 0, 0.2, 1)",
  };

  function move(direction: "Left" | "Right") {
    if (allowNextPicture) {
      setAllowNextPicture(false);
      direction == "Right"
        ? slideCarouselRight(slides)
        : slideCarouselLeft(slides);
    }
  }

  return (
    <div className="relative w-screen h-screen">
      <div className="absolute w-2/12 h-full z-10 group">
        <button
          onMouseEnter={() => setCancelAuto(true)}
          onClick={() => move("Left")}
          className="absolute z-10 h-full text-white text-7xl flex justify-center items-center transition-all duration-700 -left-20 group-hover:left-0"
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
              className="min-w-[40%]"
              key={data.id}
              style={transformTransition}
              data-ref="slide"
              onTransitionEnd={() => setAllowNextPicture(true)}
            >
              <BetterIndImg data={data} image={image} className="" />
            </div>
          );
        })}
      </div>
      <div className="absolute top-0 right-0 w-2/12 h-full z-10 group">
        <button
          onMouseEnter={() => setCancelAuto(true)}
          onClick={() => move("Right")}
          className="absolute text-white transition-all duration-700 -right-20 group-hover:right-3 z-10 h-full text-7xl flex justify-center items-center"
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

/*
style={appendTransitionInformation(
                slideStyles[i],
                transformTransition
              )}
*/
