import React, { useEffect, useState } from "react";
import ROWOptionText from "./optionROWText";
import UKOptionText from "./optionUKText";
import ShippingOption from "./shippingOption";

export default function ShippingForm({
  handleShippingChange,
  ukShippingID,
  isMobile,
}) {
  const rowShippingID = "price_1K0419Dp3VvnaMPzfvHSPDlS";
  const [shippingStyles, setShippingStyles] = useState({});

  function handleScroll() {
    const scrollTop = document.querySelector(".tl-edges").scrollTop;
    const scrollLimit =
      document.getElementById("right").getBoundingClientRect().height - 200;

    setShippingStyles({
      transform: `translateY(${
        scrollTop < scrollLimit ? scrollTop : scrollLimit
      }px)`,
      transitionProperty: "transform",
      transitionDuration: "700ms",
      transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
      willChange: "transform",
    });
  }

  useEffect(() => {
    if (!isMobile) {
      window.addEventListener("scroll", handleScroll, true);
    }
    return () => {
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, [isMobile]);

  return (
    <form
      style={shippingStyles}
      className="font-poppins flex flex-col mt-4 max-w-[80%] border shadow-xl text-center p-4"
    >
      <span className="text-xl">Please select a shipping option:</span>
      <div className="flex flex-col">
        <ShippingOption
          shippingId={ukShippingID}
          handleChange={handleShippingChange}
          OptionText={UKOptionText}
        />
        <hr />
        <ShippingOption
          shippingId={rowShippingID}
          handleChange={handleShippingChange}
          OptionText={ROWOptionText}
        />
      </div>
    </form>
  );
}
