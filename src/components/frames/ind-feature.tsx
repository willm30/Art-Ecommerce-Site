import { IGatsbyImageData } from "gatsby-plugin-image";
import React from "react";
import AddCartBtn from "./buttons/add-cart-btn";
import CardWrapper from "./card/card-wrapper";
import DescWrapper from "./card/desc-wrapper";
import ImageWrapper from "./card/image-wrapper";

export default function IndFeature({
  image,
  des,
  alt,
  name,
  media,
  canvas,
}: {
  image: IGatsbyImageData;
  des: string;
  alt: string;
  name: string;
  media: string;
  canvas: string;
}) {
  return (
    <CardWrapper>
      <ImageWrapper
        image={image}
        alt={alt}
        flexBasis="flex-50"
        to={null}
      ></ImageWrapper>
      <DescWrapper
        name={name}
        flexBasis="flex-50"
        headingSize="text-2xl"
        des={des}
        Button={<AddCartBtn text="Add to Cart" />}
      >
        <div>
          <p>Media Type: {media}</p>
          <p>Canvas Type: {canvas}</p>
        </div>
      </DescWrapper>
    </CardWrapper>
  );
}
