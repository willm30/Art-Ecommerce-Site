const React = require("react");
const CartProvider = require("./src/context/CartContext");

const CartContextProvider = CartProvider.CartProvider;

exports.wrapRootElement = ({ element }) => {
  return <CartContextProvider>{element}</CartContextProvider>;
};
