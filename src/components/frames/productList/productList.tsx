import React from "react";

export default function ProductInput({
  products,
  handleSelectProduct,
}: {
  products: any[]; // TODO update with interface
  handleSelectProduct: (product: {
    productName: string;
    price: number;
  }) => void;
}) {
  return (
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
  );
}
