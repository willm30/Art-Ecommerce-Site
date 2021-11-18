import { Link } from "gatsby";
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image";
import React from "react";

export default function GroupFeature({
  image,
  alt,
  to,
  orientation,
}: {
  image: IGatsbyImageData;
  des: string;
  alt: string;
  name: string;
  to: string;
  orientation: "Portrait" | "Landscape";
}) {
  const orientationStyles = orientation == "Landscape" ? "flex-50" : "flex-40";

  return (
    <div className="flex-60">
      <Link to={to}>
        <GatsbyImage image={image} alt={alt}></GatsbyImage>
      </Link>
    </div>
  );
}

/*
<CardWrapper>
      <ImageWrapper
        image={image}
        alt={alt}
        to={`/art/${to}`}
        orientation={orientation}
      ></ImageWrapper>
      <DescWrapper
        name={name}
        des={des}
        Button={<DescBtn path={`/art/${to}`} text="Learn More" />}
      />
    </CardWrapper>
*/
