import { Link } from "gatsby";
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image";
import React from "react";

export default function ImageWrapper({
  image,
  alt,
  to,
  orientation,
}: {
  image: IGatsbyImageData;
  alt: string;
  to: string;
  orientation: "Portrait" | "Landscape";
}) {
  const orientationStyles = orientation == "Landscape" ? "flex-50" : "flex-40";
  return (
    <div className={`${orientationStyles} md:flex-10 border-8 border-white`}>
      <Link to={to}>
        <GatsbyImage image={image} alt={alt}></GatsbyImage>
      </Link>
    </div>
  );
}
