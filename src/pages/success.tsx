import { Link } from "gatsby";
import React, { useContext, useEffect, useState } from "react";
import PayNowBtn from "../components/frames/buttons/pay-now-btn";
import Layout from "../components/layout/layout";
import { CartContext } from "../context/CartContext";
import getStripe from "../utilities/stripe";

export default function Success({ location }) {
  const [cart, setCart] = useContext(CartContext);
  const [loading, setLoading] = useState(false);

  const styles = {
    desktop: {
      h1: "text-5xl font-ogirema my-8 md:text-left",
      p: "font-poppins text-xl md:px-0",
    },
    mobile: {
      h1: "text-center",
      p: "px-4",
    },
  };

  useEffect(() => {
    setCart([]);
  }, []);
  return (
    <Layout
      title="Cart"
      location={location}
      childStyles="col-start-2 col-end-10 md:col-end-6 row-start-2"
    >
      <div className="flex justify-between items-center">
        <h1 className={`${styles.desktop.h1} ${styles.mobile.h1}`}>Success!</h1>
      </div>
      <p className={`${styles.desktop.p} ${styles.mobile.p}`}>
        Your payment was successful.{" "}
        <Link to="/art" className="hover:underline">
          Click here to return to the latest artwork.
        </Link>
      </p>
    </Layout>
  );
}
