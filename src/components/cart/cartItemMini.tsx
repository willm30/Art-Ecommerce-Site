import { Link } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import React from "react";

export default function CartItemMini({
  title,
  quantity,
  type,
  image,
  alt,
  price,
  slug,
}) {
  const subtotal = price * quantity;

  return (
    <Link to={`/art/${slug}`} className="font-poppins hover:bg-gray-50">
      <hr />
      <li className="group flex justify-around items-center pl-4 my-4">
        <GatsbyImage
          image={image}
          alt={alt}
          className="w-32 flex-30 flex justify-center items-center shadow-2xl border-8 border-white outline-mini"
        />
        <span className="flex-70 flex flex-col items-center justify-center text-lg px-4">
          <span className="text-xl font-bold text-center">{title}</span>
          <span>Quantity: {quantity}</span>
          <span>{type}</span>
          <span>£{price}</span>
          <span>{`Sub-total: £${subtotal.toFixed(2)}`} </span>
        </span>
      </li>
      <hr />
    </Link>
  );
}
