import React, { useContext, useEffect, useRef, useState } from "react";
import { toRem } from "../../utilities/tailwind";
import { TouchContext } from "../../context/TouchContext";
import { Link } from "gatsby";
import {
  getNavLiBgAnimation,
  getNavLiTextAnimation,
  getNavLiUnderlineAnimation,
} from "../../animations/nav";
import gsap from "gsap";

export default function ListItem({ text, to }: { text: string; to: string }) {
  const [underlineWidth, setUnderlineWidth] = useState(0);
  const [bgWidth, setBgWidth] = useState(0);
  const [isTouch] = useContext(TouchContext);
  const animation = useRef(null);

  const underlinePadding = "pl-6";
  const endUnderlineWidth = `calc(${underlineWidth}px - ${toRem(
    underlinePadding
  )})`;
  const endBgWidth = `${bgWidth}px`;

  useEffect(() => {
    const link = document.getElementById(`${text}p`);
    const li = document.getElementById(`${text}li`);
    setUnderlineWidth(Math.ceil(link.getBoundingClientRect().width));
    setBgWidth(Math.ceil(li.getBoundingClientRect().width));
  }, []);

  useEffect(() => {
    const underline = document.getElementById(`${text}underline`);
    const bg = document.getElementById(`${text}bg`);
    const p = document.getElementById(`${text}p`);

    animation.current = {
      underline: getNavLiUnderlineAnimation(underline, endUnderlineWidth),
      bg: getNavLiBgAnimation(bg, endBgWidth),
      p: getNavLiTextAnimation(p),
    };
  }, [endUnderlineWidth]);

  function handleMouseEnter() {
    if (!isTouch) {
      animation.current.underline.forward.restart();
      animation.current.bg.forward.restart();
      animation.current.p.forward.restart();
    }
  }

  function handleMouseLeave() {
    if (!isTouch) {
      animation.current.underline.backward.restart();
      animation.current.bg.backward.restart();
      animation.current.p.backward.restart();
    }
  }

  function handleTouchStart() {
    animation.current.underline.set.play();
    animation.current.bg.set.play();
    animation.current.p.set.play();
  }

  function handleTouchEnd() {
    animation.current.underline.set.reverse();
    animation.current.bg.set.reverse();
    animation.current.p.set.reverse();
  }

  return (
    <Link
      to={`/${to}`}
      className="flex-20 flex flex-col justify-center items-start group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      id={`${text}li`}
    >
      <li
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="relative flex flex-col justify-center items-start h-full w-full font-ogirema text-3xl"
      >
        <div
          id={`${text}bg`}
          className="absolute -left-2 h-full bg-indigo-900 z-0 w-0"
        ></div>
        <p id={`${text}p`} className="z-10 pl-6">
          {text}
        </p>
        <div
          id={`${text}underline`}
          className="border-2 border-black h-0 w-0 z-10 bg-black ml-6"
        ></div>
      </li>
    </Link>
  );
}
