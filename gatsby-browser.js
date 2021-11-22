import "./src/styles/global.css";
import React from "react";
import { CartProvider } from "./src/context/CartContext";
import { FilterProvider } from "./src/context/FilterContext";
import { TouchProvider } from "./src/context/TouchContext";

export function wrapRootElement({ element }) {
  return (
    <TouchProvider>
      <CartProvider>
        <FilterProvider>{element}</FilterProvider>
      </CartProvider>
    </TouchProvider>
  );
}
