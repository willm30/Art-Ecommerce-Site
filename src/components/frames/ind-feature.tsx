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
  title,
  children,
  handleMouseMove,
  handleMagnify, // gets passed in from Magnifier
}: {
  image: IGatsbyImageData;
  des: string;
  alt: string;
  name: string;
  media: string;
  canvas: string;
  path: string;
  orientation: "Portrait" | "Landscape";
  title: string;
  children: React.ReactElement;
  handleMouseMove: (e) => void | null;
  handleMagnify: () => void | null;
}) {
  const orientationStyles = orientation == "Landscape" ? "flex-60" : "flex-40";
  return (
    <CardWrapper>
      <div className={`flex flex-col ${orientationStyles}`}>
        {children}
        <IndImg
          image={image}
          alt={alt}
          path={path}
          orientation={orientation}
          title={title}
          handleMagnify={handleMagnify}
          handleMouseMove={handleMouseMove}
        />
      </div>
      <IndDesc name={name} des={des} Button={<AddCartBtn text="Add to Cart" />}>
        <div>
          <p>Media Type: {media}</p>
          <p>Canvas Type: {canvas}</p>
        </div>
      </IndDesc>
    </CardWrapper>
  );
}
