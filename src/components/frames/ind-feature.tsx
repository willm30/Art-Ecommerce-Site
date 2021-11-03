import React from "react";
import AddCartBtn from "./buttons/add-cart-btn";
import CardWrapper from "./card/card-wrapper";
import DescWrapper from "./card/desc-wrapper";
import ImageWrapper from "./card/image-wrapper";

export default function IndFeature({ image, des, alt, name }) {
  return (
    <div>
      <CardWrapper>
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
          Button={<AddCartBtn text="Add to Cart" />}
        />
      </CardWrapper>
    </div>
  );
}
