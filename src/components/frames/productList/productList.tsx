import React from "react";
import { useState } from "react";
import { CartItemShape } from "../../cart/cartItem";
import AddCartBtn from "../buttons/add-cart-btn";

export default function ProductInput({
  products,
  addToCart,
}: {
  products: CartItemShape[]; // TODO update with interface
  addToCart: (item: CartItemShape) => void;
}) {
  const [spanVis, setSpanVis] = useState("hidden");
  const [selectedProduct, setSelectedProduct] = useState({});
  function handleSelectProduct(product: {
    productName: string;
    price: number;
  }) {
    setSelectedProduct(product);
    setSpanVis("hidden");
  }
  return (
    <div>
      <form className="flex justify-center">
        {products.map((product) => {
          return (
            <label
              key={product.productName}
              className="bg-white hover:bg-gray-50 border-2 border-gray-400 p-4 mx-4"
            >
              {product.productName} <br />£{product.price} <br />
              <input
                name="product"
                type="radio"
                onChange={() => handleSelectProduct(product)}
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
