import React, { useContext, useEffect, useRef, useState } from "react";
import Cart from "../../components/cart/cart";
import PayNowBtn from "../../components/frames/buttons/pay-now-btn";
import Copyright from "../../components/layout/copyright";
import Layout from "../../components/layout/layout";
import ShippingForm from "../../components/payments/shippingForm";
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
  const [isMobile, setIsMobile] = useState(false);

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
      h1: "text-5xl font-ogirema",
    },
    mobile: {
      h1: "text-center",
    },
  };

  useEffect(() => {
    document.querySelector(".tl-edges").scrollTop = 0;
    if (window.innerWidth < 668) {
      setIsMobile(true);
    }
  }, []);
  function handleShippingChange(e) {
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
          setSpanVisZero("hidden");
          setSpanVisEmpty("hidden");
        }
      } else {
        setSpanVisZero("");
        setSpanVisShipping("hidden");
        setSpanVisEmpty("hidden");
      }
    } else {
      setSpanVisEmpty("");
      setSpanVisZero("hidden");
      setSpanVisShipping("hidden");
    }
  }
  return (
    <Layout
      title="Cart"
      location={location}
      childStyles="col-span-full row-start-2 flex w-screen md:grid grid-cols-collection"
    >
      <div className="col-start-2 col-end-3 w-full flex flex-col">
        <div className="flex md:flex-row flex-col items-center md:justify-between md:items-end mt-4 md:my-8">
          <div className="flex flex-col md:items-start">
            <h1 className={`${styles.desktop.h1} ${styles.mobile.h1}`}>
              Your collection
            </h1>
            <span className="font-poppins text-2xl md:mr-6 text-center">
              Total (excl. shipping): £{grandTotal.toFixed(2)}
            </span>
          </div>

          <div className="relative flex flex-col justify-center items-center my-8 md:my-0">
            <div className="">
              <PayNowBtn loading={loading} handleSubmit={handleSubmit} />
            </div>
            <span className={`absolute -bottom-8 ${spanVisEmpty} text-red-500`}>
              Your cart is empty.
            </span>
            <span
              className={`absolute -bottom-8 ${spanVisZero} text-red-500 whitespace-nowrap`}
            >
              Quantity must be greater than 0.
            </span>
            <span
              className={`absolute -bottom-8 ${spanVisShipping} text-red-500 whitespace-nowrap`}
            >
              Please select a shipping destination.
            </span>
          </div>
          {isMobile && cart.length ? (
            <ShippingForm
              handleShippingChange={handleShippingChange}
              ukShippingID={ukShippingID}
              isMobile={isMobile}
            />
          ) : null}
        </div>
        <Cart setSpanVisZero={setSpanVisZero}></Cart>
        <Copyright />
      </div>
      {cart.length ? (
        <div
          id="right"
          className="col-start-3 col-end-4 flex justify-center items-start"
        >
          {!isMobile ? (
            <ShippingForm
              handleShippingChange={handleShippingChange}
              ukShippingID={ukShippingID}
              isMobile={isMobile}
            />
          ) : null}
        </div>
      ) : null}
    </Layout>
  );
}
