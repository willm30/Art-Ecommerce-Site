import React from "react";
import DescBtn from "./buttons/desc-btn";
import CardWrapper from "./card/card-wrapper";
import DescWrapper from "./card/desc-wrapper";
import ImageWrapper from "./card/image-wrapper";

export default function GroupFeature({ image, des, alt, name, to }) {
  return (
    <CardWrapper>
      <ImageWrapper
        image={image}
        alt={alt}
        flexBasis="flex-30"
        to={`/art/${to}`}
      ></ImageWrapper>
      <DescWrapper
        name={name}
        flexBasis="flex-70"
        headingSize="text-lg"
        des={des}
        Button={<DescBtn path={`/art/${to}`} text="Learn More" />}
      >
        {null}
      </DescWrapper>
    </CardWrapper>
  );
}
