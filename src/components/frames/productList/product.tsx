import React, { useEffect } from "react";
import { useState } from "react";
import Info from "../../../icons/info";

export default function Product({ product, handleSelectProduct, index }) {
  const [infoPopUps, setInfoPopUps] = useState(null);

  useEffect(() => {
    setInfoPopUps(document.querySelectorAll("[data-ref=info]"));
  }, []);
  return (
    <label className="bg-white hover:bg-gray-50 border border-black py-4 px-6 mx-4 flex flex-col justify-center items-center font-poppins">
      <p className="relative font-ogirema text-lg flex items-center">
        {product.productName}
        <span
          className="absolute -right-4 cursor-pointer"
          onMouseEnter={() => (infoPopUps[index].style.display = "block")}
          onMouseLeave={() => (infoPopUps[index].style.display = "none")}
        >
          <Info />
        </span>
      </p>
      <p>£{product.price}</p>
      <input
        name="product"
        type="radio"
        onChange={() => handleSelectProduct(product)}
        className="mt-2"
      />
    </label>
  );
}
