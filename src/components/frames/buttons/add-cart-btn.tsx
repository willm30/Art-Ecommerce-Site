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
  const [clicked, setClicked] = useState(false);

  function handleClick() {
    if (!item) {
      setSpanVis("");
    } else {
      addToCart(item);
      setButtonText("Picture added!");
      setClicked(true);
    }
  }

  const bg = clicked
    ? "bg-indigo-900 text-white hover:bg-indigo-900"
    : "bg-white hover:bg-black";
  return (
    <div className="flex flex-col items-center font-poppins">
      <span className={`${spanVis} text-red-500 mb-2`}>
        Please select a product.
      </span>
      <button
        onClick={handleClick}
        className={`${bg} border-black border p-2 w-48  hover:text-white active:bg-indigo-900 active:text-white visited:bg-indigo-900`}
      >
        {buttonText}
      </button>
    </div>
  );
}
