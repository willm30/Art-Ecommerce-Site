import { Link } from "gatsby";
import React, { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import StandardButton from "../frames/buttons/standard-btn";
import { CartItemShape } from "./cartItem";
import CartItemMini from "./cartItemMini";

export default function ShoppingCartMini() {
  const [cart]: [CartItemShape[], (newCart: CartItemShape[]) => void] =
    useContext(CartContext);

  const styles = {
    desktop:
      "absolute translate-x-full right-0 md:top-[4.7rem] overflow-y-auto overscroll-contain border-4 border-transparent border-t-gray-100 md:w-1/3 h-[90vh] bg-white z-50 max-h-[90vh]",
    mobile: "top-[4.1rem] w-screen",
  };
  return (
    <div id="cart" className={`${styles.desktop} ${styles.mobile}`}>
      <Link
        to="/collection"
        className="hover:underline flex justify-center items-center"
      >
        <h3 className="my-2 text-3xl font-ogirema">Your Collection</h3>
      </Link>
      {cart.length ? (
        <ul className="flex flex-col items-center">
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
          <StandardButton to="/collection" text="Review Your Purchase" />
        </ul>
      ) : (
        <p className="font-poppins flex justify-center items-center pl-6 text-xl">
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
