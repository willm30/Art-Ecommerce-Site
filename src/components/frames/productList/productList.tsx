import React from "react";
import { useState } from "react";
import { paragraphsToReactComponent } from "../../../utilities/contentful";
import { CartItemShape } from "../../cart/cartItem";
import AddCartBtn from "../buttons/add-cart-btn";
import Product from "./product";

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
      cont: "md:mt-8 z-10 flex flex-col justify-center items-center",
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
      <form className="relative flex justify-center">
        {products.map((product, i) => {
          return (
            <Product
              key={product.productName}
              product={product}
              handleSelectProduct={handleSelectProduct}
              index={i}
            />
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
      {products.map((product, i) => {
        const description = paragraphsToReactComponent(
          product.description,
          "my-2"
        );

        return (
          <div
            key={`info${i}`}
            data-ref="info"
            className="hidden w-[90%] bg-white border border-black shadow-lg p-4 text-justify font-poppins my-4 md:my-0"
          >
            {description}
          </div>
        );
      })}
    </div>
  );
}
