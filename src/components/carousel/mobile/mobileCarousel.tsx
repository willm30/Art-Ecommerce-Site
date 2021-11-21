import { getImage } from "gatsby-plugin-image";
import React, { useRef, useEffect } from "react";
import { getDownArrowScrollAnimation } from "../../../animations/carousel";
import { Chevron } from "../../../icons/chevron";
import { getOddPictures } from "../../../utilities/carousel";
import BetterIndImg from "../../frames/card/individual/image-wrapper-improved";

export default function MobileCarousel({ pictures, left, right, clearTimer }) {
  const oddPictures: any[] = getOddPictures(pictures); // must be an odd length for this to work.

  return (
    <div className="relative w-screen h-[83vh] top-[10vh] z-0">
      <div className="absolute w-2/12 h-full group z-10">
        <button
          data-ref="arrow"
          onMouseEnter={clearTimer}
          onClick={left}
          className="absolute z-10 h-full text-white text-7xl flex justify-center items-center transition-all duration-700 left-0"
        >
          <span className="rotate-90">
            <Chevron />
          </span>
        </button>
      </div>
      <div className="flex max-h-screen overflow-hidden z-0">
        {oddPictures.map((picture, i) => {
          const data = picture.node;
          const image = getImage(data.image);
          return (
            <div
              id={`slide${i}`}
              className="min-w-[100%] shadow-inner"
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
          data-ref="arrow"
          onMouseEnter={clearTimer}
          onClick={right}
          className="absolute text-white transition-all duration-700 right-3 z-10 h-full text-7xl flex justify-center items-center"
        >
          <span className="-rotate-90">
            <Chevron />
          </span>
        </button>
      </div>
    </div>
  );
}
