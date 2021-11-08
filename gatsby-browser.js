import "./src/styles/global.css";
import React from "react";
import { CartProvider } from "./src/context/CartContext";
export function wrapRootElement({ element }) {
  return <CartProvider>{element}</CartProvider>;
}
