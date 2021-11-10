import React from "react";
import { useState } from "react";
import { CartItemShape } from "../../cart/cartItem";

export default function AddCartBtn({
  addToCart,
  item,
  spanVis,
  setSpanVis,
}: {
  addToCart: (item: CartItemShape | null) => void;
  item: CartItemShape | null;
  spanVis: string;
  setSpanVis: (vis: string) => void;
}) {
  const [buttonText, setButtonText] = useState("Add to collection");

  function handleClick() {
    if (!Object.entries(item).length) {
      setSpanVis("");
    } else {
      addToCart(item);
      setButtonText("Picture added!");
    }
  }

  return (
    <div className="flex flex-col items-center">
      <span className={`${spanVis} text-red-500 mb-2`}>
        Please select a product.
      </span>
      <button
        onClick={handleClick}
        className="bg-gray-200 border-black border rounded-md p-2 w-48 hover:bg-gray-300 active:bg-gray-400 active:text-white"
      >
        {buttonText}
      </button>
    </div>
  );
}
