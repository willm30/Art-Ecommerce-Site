import { Link } from "gatsby";
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image";
import React from "react";

export default function IndImg({
  image,
  alt,
  path,
  orientation,
}: {
  image: IGatsbyImageData;
  alt: string;
  path: string;
  orientation: string;
}) {
  const orientationStyles = orientation == "Landscape" ? "flex-60" : "flex-40";
  return (
    <div className={`${orientationStyles} border-8 border-white`}>
      <Link
        to={
          window?.innerWidth > 767
            ? path.includes("/xl")
              ? null
              : `${path}/xl`
            : null
        }
      >
        <GatsbyImage image={image} alt={alt}></GatsbyImage>
      </Link>
    </div>
  );
}
