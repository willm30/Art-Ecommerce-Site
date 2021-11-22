import { IGatsbyImageData, GatsbyImage } from "gatsby-plugin-image";
import React from "react";
import ThumbnailWrapper from "../frames/card/individual/thumbnail-wrapper";
import QuantityIncrementer from "./quantityIncrementer";

export interface CartItemShape {
  title: string;
  quantity: number;
  productName: string;
  image: IGatsbyImageData;
  alt: string;
  price: number;
  slug: string;
  artist: string;
  canvasType: string;
  mediaType: string;
}

export default function CartItem({
  title,
  quantity,
  type,
  image,
  alt,
  price,
  slug,
  artist,
  canvasType,
  mediaType,
}) {
  const subtotal = price * quantity;
  const styles = {
    desktop: {
      li: "flex md:flex-row mt-8",
      frame: "md:flex-30 md:px-0",
    },
    mobile: {
      li: "flex-col",
      frame: "px-4",
    },
  };
  return (
    <li className={`${styles.desktop.li} ${styles.mobile.li}`}>
      <ThumbnailWrapper
        to={`art/${slug}`}
        alt={alt}
        img={image}
        title={null}
        artist={null}
        id={null}
        width={`${styles.desktop.frame} ${styles.mobile.frame}`}
        canvasType={canvasType}
        mediaType={mediaType}
      />
      <span className="flex-70 flex flex-col items-center text-xl px-4">
        <span className="text-2xl text-center my-4 md:mt-0 md:mb-8">
          <span className="font-bold">{title}</span> <br />
          <span>by {artist}</span>
        </span>
        <span>Quantity: {quantity}</span>
        <span>Type: {type}</span>
        <span>Price: £{price}</span>
        <span>{`Sub-total: £${subtotal.toFixed(2)}`} </span>
      </span>
      <QuantityIncrementer title={title} type={type} quantity={quantity} />
    </li>
  );
}
