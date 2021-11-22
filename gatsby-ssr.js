const React = require("react"); // eslint-disable-line 
const CartProvider = require("./src/context/CartContext");  // eslint-disable-line 
const FilterProvider = require("./src/context/FilterContext");  // eslint-disable-line 
const TouchProvider = require("./src/context/TouchContext");  // eslint-disable-line 

const CartContextProvider = CartProvider.CartProvider;
const FilterContextProvider = FilterProvider.FilterProvider;
const TouchContextProvider = TouchProvider.TouchProvider;

exports.wrapRootElement = ({ element }) => {
  return (
    <TouchContextProvider>
      <CartContextProvider>
        <FilterContextProvider>{element}</FilterContextProvider>
      </CartContextProvider>
    </TouchContextProvider>
  );
};
