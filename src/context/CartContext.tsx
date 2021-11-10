import React, { Dispatch, SetStateAction, useState } from "react";
import { CartItemShape } from "../components/cart/cartItem";

export const CartContext =
  React.createContext<
    [CartItemShape[] | null, Dispatch<SetStateAction<CartItemShape[]>>]
  >(null);

export const CartProvider = ({ children }) => {
  const cartStateHook = useState<CartItemShape[]>([]);
  return (
    <CartContext.Provider value={cartStateHook}>
      {children}
    </CartContext.Provider>
  );
};
