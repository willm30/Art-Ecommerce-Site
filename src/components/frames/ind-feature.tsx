import { IGatsbyImageData } from "gatsby-plugin-image";
import React from "react";
import AddCartBtn from "./buttons/add-cart-btn";
import IndImg from "./card/individual/image-wrapper";
import IndDesc from "./card/individual/desc-wrapper";
import CardWrapper from "./card/card-wrapper";

export default function IndFeature({
  image,
  des,
  alt,
  name,
  media,
  canvas,
  path,
  orientation,
}: {
  image: IGatsbyImageData;
  des: string;
  alt: string;
  name: string;
  media: string;
  canvas: string;
  path: string;
  orientation: "Portrait" | "Landscape";
}) {
  return (
    <CardWrapper>
      <IndImg
        image={image}
        alt={alt}
        path={path}
        orientation={orientation}
      ></IndImg>
      <IndDesc name={name} des={des} Button={<AddCartBtn text="Add to Cart" />}>
        <div>
          <p>Media Type: {media}</p>
          <p>Canvas Type: {canvas}</p>
        </div>
      </IndDesc>
    </CardWrapper>
  );
}
