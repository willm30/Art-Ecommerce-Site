import React, { Dispatch, SetStateAction, useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { decrementQuantity, incrementQuantity } from "../../utilities/cart";
import { CartItemShape } from "./cartItem";

export default function QuantityIncrementer({
  quantity,
  title,
  type,
  setSpanVisZero,
}) {
  const [cart, setCart]: [
    CartItemShape[],
    Dispatch<SetStateAction<CartItemShape[]>>
  ] = useContext(CartContext);

  function handleIncrement() {
    const item = cart.find(
      (item) => item.title == title && item.productName == type
    );
    const newCart = incrementQuantity(cart, item);
    setCart(newCart);
    if (!quantity) setSpanVisZero("hidden");
  }

  function handleDecrement() {
    const item = cart.find(
      (item) => item.title == title && item.productName == type
    );
    const newCart = decrementQuantity(cart, item);
    setCart(newCart);
  }

  function handleRemove() {
    const newCart = cart.filter(
      (item) => !(item.title == title && item.productName == type)
    );

    setCart(newCart);
  }

  return (
    <div className="flex flex-col items-center md:my-0 my-4">
      <div className="flex flex-row items-center flex-20 text-3xl font-poppins">
        <button
          className="flex justify-center rounded-full items-center border border-black w-12 h-12 hover:bg-gray-50"
          onClick={handleDecrement}
        >
          <span>-</span>
        </button>
        <span className={`mx-4 ${quantity ? "" : "text-red-500"}`}>
          {quantity}
        </span>
        <button
          className="border rounded-full border-black flex justify-center items-center w-12 h-12 hover:bg-gray-50"
          onClick={handleIncrement}
        >
          <span>+</span>
        </button>
      </div>
      <button onClick={handleRemove} className="hover:underline md:my-0 my-4">
        Remove from collection
      </button>
    </div>
  );
}
