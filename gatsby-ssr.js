exports.wrapRootElement = ({ element }) => {
  return <CartProvider>{element}</CartProvider>;
};
