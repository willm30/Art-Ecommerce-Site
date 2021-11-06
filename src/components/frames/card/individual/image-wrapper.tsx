import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image";
import React, { useEffect, useState } from "react";
import CustomLink from "../../../navigation/customLink";

export default function IndImg({
  path,
  title,
  image,
  alt,
  orientation,
  handleMouseMove,
  handleMagnify,
}: {
  path: string;
  title: string;
  image: IGatsbyImageData;
  alt: string;
  orientation: "Portrait" | "Landscape";
  handleMouseMove: (e) => void;
  handleMagnify: () => void;
}) {
  const [innerWidth, setInnerWidth] = useState(undefined);

  useEffect(() => {
    const innerWidth = document.body.clientWidth;
    setInnerWidth(innerWidth);
  }, []);

  const isMobile = innerWidth < 768;
  const isXL = path.includes("/xl");
  const linkPath = isMobile || isXL ? null : `${path}/xl`;
  const orientationConditionalClasses =
    orientation == "Landscape" ? "flex-60" : "flex-40";
  return (
    <div
      className={`${orientationConditionalClasses} border-8 border-white hover:cursor-pointer`}
      onClick={handleMagnify}
      onMouseMove={handleMouseMove}
    >
      <div id={title}>
        <CustomLink path={linkPath}>
          <GatsbyImage image={image} alt={alt}></GatsbyImage>
        </CustomLink>
      </div>
    </div>
  );
}
