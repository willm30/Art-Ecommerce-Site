import React from "react";
import { CartItemShape } from "../../cart/cartItem";

export default function AddCartBtn({
  text,
  handleAddToCart,
  item,
}: {
  text: string;
  handleAddToCart: (
    item: { productName: string; price: number } /*TODO CartItemShape*/
  ) => void;
  item: { productName: string; price: number }; // TODO: CartItemShape;
}) {
  return (
    <button
      onClick={() => handleAddToCart(item)}
      className="bg-gray-200 border-black border rounded-md p-2 hover:bg-white"
    >
      {text}
    </button>
  );
}
