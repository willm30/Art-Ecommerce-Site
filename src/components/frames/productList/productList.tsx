import React from "react";
import { useState } from "react";
import { CartItemShape } from "../../cart/cartItem";
import AddCartBtn from "../buttons/add-cart-btn";

export default function ProductInput({
  products,
  productStyles,
  addToCart,
}: {
  products: CartItemShape[]; // TODO update with interface
  addToCart: (item: CartItemShape) => void;
  productStyles: any;
}) {
  const [spanVis, setSpanVis] = useState("hidden");
  const [selectedProduct, setSelectedProduct] = useState<CartItemShape | null>(
    null
  );
  function handleSelectProduct(product: CartItemShape) {
    setSelectedProduct(product);
    setSpanVis("hidden");
  }

  const styles = {
    desktop: {
      cont: "md:mt-8 z-10",
      button: "md:my-4",
    },
    mobile: {
      cont: "",
      button: "mt-4",
    },
  };
  return (
    <div
      style={productStyles}
      className={`${styles.desktop.cont} ${styles.mobile.cont}`}
    >
      <form className="flex justify-center">
        {products.map((product) => {
          return (
            <label
              key={product.productName}
              className="bg-white hover:bg-gray-50 border border-black p-4 mx-4 flex flex-col justify-center items-center font-poppins"
            >
              {product.productName} <br />£{product.price} <br />
              <input
                name="product"
                type="radio"
                onChange={() => handleSelectProduct(product)}
                className="mt-2"
              />
            </label>
          );
        })}
      </form>
      <div className={`${styles.desktop.button} ${styles.mobile.button}`}>
        <AddCartBtn
          addToCart={addToCart}
          item={selectedProduct}
          spanVis={spanVis}
          setSpanVis={setSpanVis}
        />
      </div>
    </div>
  );
}
