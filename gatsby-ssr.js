const React = require("react"); // eslint-disable-line 
const CartProvider = require("./src/context/CartContext");  // eslint-disable-line 
const FilterProvider = require("./src/context/FilterContext");  // eslint-disable-line 

const CartContextProvider = CartProvider.CartProvider;
const FilterContextProvider = FilterProvider.FilterProvider;

exports.wrapRootElement = ({ element }) => {
  return (
    <CartContextProvider>
      <FilterContextProvider>{element}</FilterContextProvider>
    </CartContextProvider>
  );
};
