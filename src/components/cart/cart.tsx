import { Link } from "gatsby";
import React, { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import StandardButton from "../frames/buttons/standard-btn";
import CartItem, { CartItemShape } from "./cartItem";

export default function Cart({ setSpanVisZero }) {
  const [cart]: [CartItemShape[], (newCart: CartItemShape[]) => void] =
    useContext(CartContext);

  const styles = {
    desktop: {
      p: "font-poppins text-xl md:px-0 md:text-left",
    },
    mobile: {
      p: "px-4 text-center",
    },
  };
  return (
    <div className="text-sm md:mt-1.5 font-poppins min-h-[55vh] md:min-h-[65vh]">
      {cart.length ? (
        <ul className="flex flex-col mb-5">
          {cart?.map((item, i) => (
            <div key={`${item.title}${i}`}>
              <hr />
              <CartItem
                title={item.title}
                quantity={item.quantity}
                type={item.productName}
                image={item.image}
                price={item.price}
                alt={item.alt}
                artist={item.artist}
                slug={item.slug}
                canvasType={item.canvasType}
                mediaType={item.mediaType}
                setSpanVisZero={setSpanVisZero}
              />
              <hr />
            </div>
          ))}
        </ul>
      ) : (
        <div className="flex flex-col justify-center items-center md:items-start">
          <p className={`${styles.desktop.p} ${styles.mobile.p}`}>
            Your collection is currently empty.{" "}
          </p>
          <StandardButton to="/art" text="View All Artwork" />
        </div>
      )}
    </div>
  );
}

/*
const pointer =
  "after:block after:border-[12px] after:border-transparent after:border-l-gray-200 after:-top-2 after:left-[23.5rem] after:absolute";
*/
