import React, { useContext } from "react";
import Cart from "../../components/cart/cart";
import Layout from "../../components/layout/layout";
import { CartContext } from "../../context/CartContext";

export default function ShoppingCart({ location }) {
  const [cart] = useContext(CartContext);
  const styles = {
    desktop: {
      h1: "text-5xl font-ogirema my-8 md:text-left",
    },
    mobile: {
      h1: "text-center",
    },
  };
  return (
    <Layout
      title="Cart"
      location={location}
      childStyles="col-start-2 col-end-10 md:col-end-6 row-start-2"
    >
      <h1 className={`${styles.desktop.h1} ${styles.mobile.h1}`}>
        Your collection
      </h1>
      <Cart cart={cart} isMini={false} handleMouseEnter={false}></Cart>
    </Layout>
  );
}
