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
  return;
}
