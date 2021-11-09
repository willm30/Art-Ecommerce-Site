import { Link } from "gatsby";
import { IGatsbyImageData, GatsbyImage } from "gatsby-plugin-image";
import React from "react";

export interface CartItemShape {
  title: string;
  quantity: number;
  type: string;
  image: IGatsbyImageData;
  alt: string;
  price: number;
}

export default function CartItemMini({
  title,
  quantity,
  type,
  image,
  alt,
  price,
  slug,
  handleMouseEnter,
}) {
  const subtotal = price * quantity;
  return (
    <Link to={`/art/${slug}`}>
      <li className="flex my-1">
        <GatsbyImage
          image={image}
          alt={alt}
          className="flex-30 border-white border-4"
          onMouseEnter={handleMouseEnter}
        ></GatsbyImage>
        <span className="flex-70 flex flex-col">
          <span>{title}</span>
          <span>Quantity: {quantity}</span>
          <span>{type}</span>
          <span>£{price}</span>
          <span>{`Sub-total: £${subtotal.toFixed(2)}`} </span>
        </span>
      </li>
    </Link>
  );
}
