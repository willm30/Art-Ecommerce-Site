import React from "react";
import UKOptionText from "./optionUKText";

export default function ShippingOption({
  shippingId,
  handleChange,
  OptionText,
}) {
  return (
    <label className="flex flex-col justify-center items-center mx-2 my-4">
      <OptionText />
      <input
        name="shipping"
        type="radio"
        className="mt-2"
        value={shippingId}
        onChange={handleChange}
      />
    </label>
  );
}
