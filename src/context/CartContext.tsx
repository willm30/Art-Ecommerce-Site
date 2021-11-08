import React, { useState } from "react";

export const CartContext = React.createContext([]);

export const CartProvider = ({ children }) => {
  const cartStateHook = useState([]);
  return (
    <CartContext.Provider value={cartStateHook}>
      {children}
    </CartContext.Provider>
  );
};
