import { IGatsbyImageData } from "gatsby-plugin-image";
import React from "react";
import AddCartBtn from "./buttons/add-cart-btn";
import CardWrapper from "./card/card-wrapper";
import DescWrapper from "./card/desc-wrapper";
import ImageWrapper from "./card/image-wrapper";
import PolaroidWrapper from "./card/polaroid-wrapper";

export default function IndFeature({
  image,
  des,
  alt,
  name,
  media,
  canvas,
  orientation,
  xl,
  path,
}: {
  image: IGatsbyImageData;
  des: string;
  alt: string;
  name: string;
  media: string;
  canvas: string;
  orientation: "Landscape" | "Portrait";
  xl: boolean;
  path: string;
}) {
  const portraitImageFlexBasisXL = "flex-50";
  const portraitDescFlexBasisXL = "flex-40";
  const landscapeImageFlexBasisXL = "flex-70";
  const landscapeDescFlexBasisXL = "flex-20";
  const portraitImageFlexBasis = "flex-40";
  const portraitDescFlexBasis = "flex-40";
  const landscapeImageFlexBasis = "";
  const landscapeDescFlexBasis = "";
  const landscapeMaxWidth = "";
  return orientation == "Landscape" ? (
    <PolaroidWrapper>
      <ImageWrapper
        image={image}
        alt={alt}
        xl={xl}
        flexBasis={xl ? landscapeImageFlexBasisXL : landscapeImageFlexBasis}
        maxWidth={landscapeMaxWidth}
        to={xl ? "" : `${path}/xl`}
      ></ImageWrapper>
      <DescWrapper
        name={name}
        flexBasis={xl ? landscapeDescFlexBasisXL : landscapeDescFlexBasis}
        headingSize="text-2xl"
        des={des}
        orientation={orientation}
        Button={<AddCartBtn text="Add to Cart" />}
      >
        <div>
          <p>Media Type: {media}</p>
          <p>Canvas Type: {canvas}</p>
        </div>
      </DescWrapper>
    </PolaroidWrapper>
  ) : (
    <CardWrapper>
      <ImageWrapper
        image={image}
        alt={alt}
        xl={xl}
        flexBasis={xl ? portraitImageFlexBasisXL : portraitImageFlexBasis}
        maxWidth={null}
        to={xl ? "" : `${path}/xl`}
      ></ImageWrapper>
      <DescWrapper
        name={name}
        flexBasis={xl ? portraitDescFlexBasisXL : portraitDescFlexBasis}
        headingSize="text-2xl"
        des={des}
        orientation={orientation}
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
