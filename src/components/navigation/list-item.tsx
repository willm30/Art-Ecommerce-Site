import React, { useEffect, useState } from "react";
import { Link } from "gatsby";
import { toRem } from "../../utilities/tailwind";
import AniLink from "gatsby-plugin-transition-link/AniLink";

export default function ListItem({ text, to }: { text: string; to: string }) {
  const [underlineWidth, setUnderlineWidth] = useState(0);
  const [bgWidth, setBgWidth] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const underlinePadding = "pl-6";
  const underlineStyles = isHovered
    ? {
        transitionProperty: "width, margin-left, border-color",
        transitionDuration: "700ms",
        transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
        width: `calc(${underlineWidth}px - ${toRem(underlinePadding)}`,
        marginLeft: "2.5rem",
        borderColor: "white",
      }
    : {
        transitionProperty: "width, margin-left, border-color",
        transitionDuration: "700ms",
        transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
        width: `0px`,
        marginLeft: `${toRem(underlinePadding)}`,
        borderColor: "black",
      };

  const backgroundStyles = isHovered
    ? {
        transitionProperty: "width",
        transitionDuration: "700ms",
        transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
        width: `${bgWidth}px`,
      }
    : {
        transitionProperty: "width",
        transitionDuration: "700ms",
        transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
        width: `0px`,
      };
  useEffect(() => {
    const link = document.getElementById(`${text}p`);
    const li = document.getElementById(`${text}li`);
    setUnderlineWidth(Math.ceil(link.getBoundingClientRect().width));
    setBgWidth(Math.ceil(li.getBoundingClientRect().width));
  }, []);

  return (
    <AniLink
      cover
      duration={1.3}
      direction="right"
      bg="#4c1d95"
      to={`/${to}`}
      className="flex-20 flex flex-col justify-center items-start group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      id={`${text}li`}
    >
      <li className="relative flex flex-col justify-center items-start h-full w-full font-ogirema text-3xl">
        <div
          className="absolute h-full bg-purple-900 z-0"
          style={backgroundStyles}
        ></div>
        <p
          id={`${text}p`}
          className={`transition-all duration-700 z-10 ${underlinePadding} group-hover:pl-10  group-hover:text-white `}
        >
          {text}
        </p>
        <div className="border-2 h-0 w-0 z-10" style={underlineStyles}></div>
      </li>
    </AniLink>
  );
}
