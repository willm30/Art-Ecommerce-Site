import { Link } from "gatsby";
import React from "react";
import CartItem from "./cartItem";
import CartItemMini from "./cartItemMini";

export default function Cart({ cart, isMini, handleMouseEnter }) {
  return (
    <div>
      {cart.length ? (
        <ul className="flex flex-col">
          {cart?.map((item, i) =>
            isMini ? (
              <CartItemMini
                title={item.title}
                quantity={item.quantity}
                type={item.productName}
                image={item.image}
                price={item.price}
                slug={item.slug}
                alt={item.alt}
                key={`${item.title}${i}`}
                handleMouseEnter={handleMouseEnter}
              />
            ) : (
              <CartItem
                title={item.title}
                quantity={item.quantity}
                type={item.productName}
                image={item.image}
                price={item.price}
                alt={item.alt}
                key={`${item.title}${i}`}
              />
            )
          )}
        </ul>
      ) : (
        <p>
          Your collection is currently empty.{" "}
          <Link to="/art" className="hover:underline">
            Click here to view the latest artwork.
          </Link>
        </p>
      )}
    </div>
  );
}
