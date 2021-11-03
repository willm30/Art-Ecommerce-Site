import React from "react";
import ReadMoreBtn from "./buttons/read-more";
import CardWrapper from "./card/card-wrapper";
import DescWrapper from "./card/desc-wrapper";
import ImageWrapper from "./card/image-wrapper";

export default function GroupFeature({ image, des, alt, name, id, to }) {
  return (
    <div>
      <CardWrapper id={id}>
        <ImageWrapper
          image={image}
          alt={alt}
          flexBasis="flex-30"
        ></ImageWrapper>
        <DescWrapper
          name={name}
          flexBasis="flex-70"
          headingSize="text-lg"
          des={des}
          Button={<ReadMoreBtn path={to}></ReadMoreBtn>}
        />
      </CardWrapper>
    </div>
  );
}
