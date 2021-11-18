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
        <h3 className="font-ogirema text-2xl">{title}</h3>
        <h3 className="font-poppins">{artist}</h3>
      </div>
    </Link>
  );
}
