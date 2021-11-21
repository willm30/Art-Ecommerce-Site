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
      <div className="mt-8 flex flex-col justify-center items-center">
        <h3 className="font-ogirema text-2xl text-center">{title}</h3>
        <h4 className="font-poppins">{artist}</h4>
        <h5 className="font-poppins">
          {canvasType} | {mediaType}
        </h5>
      </div>
    </Link>
  );
}
