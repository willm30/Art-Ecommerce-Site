import { IGatsbyImageData } from "gatsby-plugin-image";
import React from "react";
import DescBtn from "./buttons/desc-btn";
import CardWrapper from "./card/card-wrapper";
import DescWrapper from "./card/list/desc-wrapper";
import ImageWrapper from "./card/list/image-wrapper";

export default function GroupFeature({
  image,
  des,
  alt,
  name,
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
  return (
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
  );
}
