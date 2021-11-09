import { IGatsbyImageData, GatsbyImage } from "gatsby-plugin-image";
import React from "react";
import QuantityIncrementer from "./quantityIncrementer";

export interface CartItemShape {
  title: string;
  quantity: number;
  productName: string;
  image: IGatsbyImageData;
  alt: string;
  price: number;
  slug: string;
}

export default function CartItem({ title, quantity, type, image, alt, price }) {
  const subtotal = price * quantity;
  return (
    <li className="flex my-4 bg-gray-100 p-2 border-gray-200 shadow-inner border-8">
      <GatsbyImage
        image={image}
        alt={alt}
        className="flex-10 border-white border-4"
      ></GatsbyImage>
      <span className="flex-70 flex flex-col">
        <span>{title}</span>
        <span>Quantity: {quantity}</span>
        <span>{type}</span>
        <span>£{price}</span>
        <span>{`Sub-total: £${subtotal.toFixed(2)}`} </span>
      </span>
      <QuantityIncrementer title={title} type={type} quantity={quantity} />
    </li>
  );
}
