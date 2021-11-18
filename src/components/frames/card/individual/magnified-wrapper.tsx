import { GatsbyImage } from "gatsby-plugin-image";
import React from "react";

export default function MagImg({ handleMagnify, image, alt, className, id }) {
  return (
    <button id={id} onClick={handleMagnify} className={className}>
      <GatsbyImage image={image} alt={alt}></GatsbyImage>
    </button>
  );
}
