import React, { useContext } from "react";
import Cart from "../../components/cart/cart";
import Layout from "../../components/layout/layout";
import { CartContext } from "../../context/CartContext";

export default function ShoppingCart({ location }) {
  const [cart] = useContext(CartContext);

  return (
    <Layout
      title="Cart"
      location={location}
      childStyles="col-start-2 col-end-6 row-start-2"
    >
      <h1 className="text-5xl font-ogirema my-8">Your collection</h1>
      <Cart cart={cart} isMini={false} handleMouseEnter={false}></Cart>
    </Layout>
  );
}
