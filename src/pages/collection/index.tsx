import React, { useContext } from "react";
import Cart from "../../components/cart/cart";
import Layout from "../../components/layout/layout";
import { CartContext } from "../../context/CartContext";

export default function ShoppingCart() {
  const [cart] = useContext(CartContext);

  return (
    <Layout title="Cart">
      <h1>Your collection</h1>
      <Cart cart={cart} isMini={false} handleMouseEnter={false}></Cart>
    </Layout>
  );
}
