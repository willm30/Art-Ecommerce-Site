import { Link } from "gatsby";
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image";
import React from "react";

export default function ImageWrapper({
  image,
  alt,
  flexBasis,
  maxWidth,
  to,
  xl,
}: {
  image: IGatsbyImageData;
  alt: string;
  flexBasis: string;
  maxWidth: string;
  to: string;
  xl: boolean;
}) {
  return (
    <div className={`${flexBasis} ${maxWidth} border-8 border-white`}>
      {xl ? (
        <GatsbyImage image={image} alt={alt}></GatsbyImage>
      ) : (
        <Link to={to}>
          <GatsbyImage image={image} alt={alt}></GatsbyImage>
        </Link>
      )}
    </div>
  );
}
