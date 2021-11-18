import "./src/styles/global.css";
import React from "react";
import { CartProvider } from "./src/context/CartContext";
import { FilterProvider } from "./src/context/FilterContext";

export function wrapRootElement({ element }) {
  return (
    <CartProvider>
      <FilterProvider>{element}</FilterProvider>
    </CartProvider>
  );
}
