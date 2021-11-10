const React = require("react"); // eslint-disable-line 
const CartProvider = require("./src/context/CartContext");  // eslint-disable-line 

const CartContextProvider = CartProvider.CartProvider;

exports.wrapRootElement = ({ element }) => {
  return <CartContextProvider>{element}</CartContextProvider>;
};
