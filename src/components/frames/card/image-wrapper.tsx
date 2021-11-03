import { GatsbyImage } from "gatsby-plugin-image";
import React from "react";

export default function ImageWrapper({ image, alt, flexBasis }) {
  return (
    <div className={`${flexBasis} filter drop-shadow-md border-8 border-white`}>
      <GatsbyImage image={image} alt={alt}></GatsbyImage>
    </div>
  );
}
