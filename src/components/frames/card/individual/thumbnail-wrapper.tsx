import { Link } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import React from "react";

export default function ThumbnailWrapper({
  to,
  alt,
  img,
  title,
  artist,
  id,
  width,
  canvasType,
  mediaType,
}) {
  const styles = {
    desktop: {
      h3: "font-ogirema text-2xl text-center",
    },
    mobile: {
      h3: "px-2",
    },
  };
  return (
    <Link
      to={to}
      className={`${width} flex flex-col justify-center items-center`}
      id={id}
    >
      <GatsbyImage
        alt={alt}
        image={img}
        className="shadow-2xl border-[16px] border-white outline-ind"
      />
      <div className="mt-8 flex flex-col justify-center items-center font-poppins">
        <h3 className={`${styles.desktop.h3} ${styles.mobile.h3}`}>{title}</h3>
        <h4>{artist}</h4>
        <h5 className="text text-lg md:text-base">
          {canvasType && `${canvasType} | ${mediaType}`}
        </h5>
      </div>
    </Link>
  );
}
