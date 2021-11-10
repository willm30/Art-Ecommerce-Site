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
  setCartOpen,
}) {
  const subtotal = price * quantity;
  return (
    <Link to={`/art/${slug}`} className="font-poppins ">
      <hr />
      <li className="relative group transition-all duration-700 px-44 hover:pl-4 my-4">
        <GatsbyImage
          image={image}
          alt={alt}
          className="w-32 shadow-2xl border-8 border-white outline-mini"
          onMouseEnter={() => setCartOpen(true)}
        ></GatsbyImage>
        <span className="absolute transition-all duration-700 top-4 -right-52 group-hover:right-20 flex flex-col items-center justify-center text-lg">
          <span className="text-xl">
            <strong>{title}</strong>
          </span>
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
