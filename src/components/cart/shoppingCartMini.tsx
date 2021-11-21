import { Link } from "gatsby";
import React, { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { CartItemShape } from "./cartItem";
import CartItemMini from "./cartItemMini";

export default function ShoppingCartMini({ cartOpen }) {
  const [cart]: [CartItemShape[], (newCart: CartItemShape[]) => void] =
    useContext(CartContext);

  const menuRightPosition = cartOpen
    ? {
        transform: "translateX(100%)",
        transitionProperty: "transform",
        transitionDuration: "700ms",
        transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
        willChange: "transform",
      }
    : {
        transform: "translateX(200%)",
        transitionProperty: "transform",
        transitionDuration: "700ms",
        transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
        willChange: "transform",
      };

  return (
    <div
      className={`absolute top-[4.7rem] overflow-y-auto border-4 border-transparent border-t-gray-100 w-1/3 h-[90vh] bg-white z-50 max-h-[90vh]`}
      style={menuRightPosition}
    >
      <Link
        to="/collection"
        className="hover:underline flex justify-center items-center"
      >
        <h3 className="my-2 text-2xl font-ogirema">Your Collection</h3>
      </Link>
      {cart.length ? (
        <ul className="flex flex-col">
          {cart?.map((item, i) => (
            <CartItemMini
              title={item.title}
              quantity={item.quantity}
              type={item.productName}
              image={item.image}
              price={item.price}
              slug={item.slug}
              alt={item.alt}
              key={`${item.title}${i}`}
            />
          ))}
        </ul>
      ) : (
        <p className="font-poppins flex justify-center items-center pl-6">
          <span>
            Your collection is currently empty.{" "}
            <Link to="/art" className="hover:underline">
              Click here to view the latest artwork.
            </Link>
          </span>
        </p>
      )}
    </div>
  );
}

/*
const pointer =
  "after:block after:border-[12px] after:border-transparent after:border-l-gray-200 after:-top-2 after:left-[23.5rem] after:absolute";
*/
