import React, { useState } from "react";
import { CartItemShape } from "../components/cart/cartItem";

export const CartContext = React.createContext(null);

export const CartProvider = ({ children }) => {
  function getCurrentSessionStorage() {
    if (typeof window != "undefined") {
      return JSON.parse(window.sessionStorage.getItem("cart"));
    }
  }

  const cartStateHook = updateCart(getCurrentSessionStorage() || []);
  function updateCart(defaultValue) {
    const [cart, setCart] = useState<CartItemShape[]>(defaultValue);

    function handleSetCart(newCart) {
      setCart(newCart);
      window.sessionStorage.setItem("cart", JSON.stringify(newCart));
    }
    return [cart, handleSetCart];
  }
  return (
    <CartContext.Provider value={cartStateHook}>
      {children}
    </CartContext.Provider>
  );
};
