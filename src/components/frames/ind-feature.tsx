import React from "react";
import AddCartBtn from "./buttons/add-cart";
import CardWrapper from "./card/card-wrapper";
import DescWrapper from "./card/desc-wrapper";
import ImageWrapper from "./card/image-wrapper";

export default function IndFeature({ image, des, alt, name, id, to }) {
  return (
    <div>
      <CardWrapper id={id}>
        <ImageWrapper
          image={image}
          alt={alt}
          flexBasis="flex-50"
        ></ImageWrapper>
        <DescWrapper
          name={name}
          flexBasis="flex-50"
          headingSize="text-2xl"
          des={des}
          Button={<AddCartBtn path={to}></AddCartBtn>}
        />
      </CardWrapper>
    </div>
  );
}
