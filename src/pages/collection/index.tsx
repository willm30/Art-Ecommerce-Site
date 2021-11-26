import React, { useContext, useRef, useState } from "react";
import Cart from "../../components/cart/cart";
import PayNowBtn from "../../components/frames/buttons/pay-now-btn";
import Copyright from "../../components/layout/copyright";
import Layout from "../../components/layout/layout";
import { CartContext } from "../../context/CartContext";
import getStripe, { allAllowedCountries } from "../../utilities/stripe";

export default function ShoppingCart({ location }) {
  const [cart] = useContext(CartContext);
  const [loading, setLoading] = useState(false);
  const [spanVisEmpty, setSpanVisEmpty] = useState("hidden");
  const [spanVisZero, setSpanVisZero] = useState("hidden");
  const [spanVisShipping, setSpanVisShipping] = useState("hidden");
  const [shippingID, setShippingID] = useState(null);
  const ukShippingID = "price_1K041HDp3VvnaMPzHPebbTqo";
  const rowShippingID = "price_1K0419Dp3VvnaMPzfvHSPDlS";
  const lineItems = cart.map((item) => {
    return {
      price: item.priceId,
      quantity: item.quantity,
    };
  });
  const lineItemsPlusShipping = [
    ...lineItems,
    { price: shippingID, quantity: 1 },
  ];
  const shippingAddressCollection =
    shippingID == ukShippingID
      ? { allowedCountries: ["GB"] }
      : {
          allowedCountries: allAllowedCountries,
        };
  const grandTotal = cart.reduce((a, b) => {
    const subTotal = b.quantity * b.price;
    return a + subTotal;
  }, 0);
  const styles = {
    desktop: {
      h1: "text-5xl font-ogirema md:text-left",
    },
    mobile: {
      h1: "text-center",
    },
  };

  function handleChange(e) {
    setShippingID(e.target.value);
    setSpanVisShipping("hidden");
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (cart.length) {
      const quantityZero = cart.filter((i) => !i.quantity);
      if (!quantityZero.length) {
        if (shippingID) {
          setLoading(true);
          const stripe = await getStripe();
          const { error } = await stripe.redirectToCheckout({
            mode: "payment",
            lineItems: lineItemsPlusShipping,
            billingAddressCollection: "required",
            successUrl: `${window.location.origin}/success`,
            cancelUrl: `${window.location.origin}/cancelled`,
            shippingAddressCollection,
          });
          if (error) {
            console.warn("Error:", error);
            setLoading(false);
          }
        } else {
          setSpanVisShipping("");
        }
      } else {
        setSpanVisZero("");
      }
    } else {
      setSpanVisEmpty("");
    }
  }
  return (
    <Layout
      title="Cart"
      location={location}
      childStyles="col-start-2 col-end-10 md:col-end-6 row-start-2"
    >
      <div className="flex justify-between items-end my-8">
        <div className="flex flex-col items-center">
          <h1 className={`${styles.desktop.h1} ${styles.mobile.h1}`}>
            Your collection
          </h1>
          <span className="font-poppins text-2xl mr-6">
            Total (excl. shipping): £{grandTotal.toFixed(2)}
          </span>
        </div>

        <div className="flex flex-col">
          <div className="relative flex flex-col justify-center items-center">
            <PayNowBtn loading={loading} handleSubmit={handleSubmit} />
            <span
              className={`absolute -bottom-28 ${spanVisEmpty} text-red-500`}
            >
              Your cart is empty.
            </span>
            <span
              className={`absolute -bottom-28 ${spanVisZero} text-red-500 whitespace-nowrap`}
            >
              Quantity must be greater than 0.
            </span>
            <span
              className={`absolute -bottom-28 ${spanVisShipping} text-red-500 whitespace-nowrap`}
            >
              Please select a shipping destination.
            </span>
          </div>
          <form className="font-poppins flex flex-col justify-center items-center mt-4">
            Please select a shipping option:
            <div className="flex">
              <label className="flex flex-col justify-center items-center mx-2">
                Within the UK (£5.95)
                <input
                  name="shipping"
                  type="radio"
                  className="mt-2"
                  value={ukShippingID}
                  onChange={handleChange}
                />
              </label>
              <label className="flex flex-col justify-center items-center mx-2">
                Rest of the world (£8.95)
                <input
                  name="shipping"
                  type="radio"
                  className="mt-2"
                  value={rowShippingID}
                  onChange={handleChange}
                />
              </label>
            </div>
          </form>
        </div>
      </div>
      <Cart setSpanVisZero={setSpanVisZero}></Cart>
      <Copyright />
    </Layout>
  );
}
