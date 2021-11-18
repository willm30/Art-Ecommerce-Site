import { Link } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import React from "react";

export default function BetterIndImg({ data, image, className }) {
  return (
    <Link to={`/art/${data.slug}`} className={className}>
      <GatsbyImage image={image} alt={data.alternativeText}></GatsbyImage>
    </Link>
  );
}
