import { Link } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import React from "react";

export default function ImageWrapper({ image, alt, flexBasis, to }) {
  return (
    <div className={`${flexBasis} filter drop-shadow-md border-8 border-white`}>
      <Link to={to}>
        <GatsbyImage image={image} alt={alt}></GatsbyImage>
      </Link>
    </div>
  );
}
