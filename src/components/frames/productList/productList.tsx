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
  return (
    <div style={productStyles} className="my-16 z-10">
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
      <div className="my-4">
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
