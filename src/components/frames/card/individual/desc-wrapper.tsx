import React from "react";
import ProductInput from "../../productList/productList";

export default function IndDesc({
  name,
  des,
  Button,
  products,
  children,
  handleSelectProduct,
}: {
  name: string;
  des: string;
  products: any[]; // TODO describe shape of product as interface
  Button: JSX.Element;
  children: React.ReactElement | React.ReactElement[];
  handleSelectProduct: (product: {
    productName: string;
    price: number;
  }) => void;
}) {
  return (
    <div className="flex flex-col flex-40 text-center font-poppins">
      <h2 className="my-2 sm:my-4 flex items-center justify-center flex-10 text-2xl md:text-3xl font-secular">
        {name}
      </h2>
      <div className="my-2 sm:my-4 flex-50 justify-center flex flex-col sm:px-4 md:px-16">
        <p id="PictureDescription">{des ? des : "No description available."}</p>
      </div>
      <div className="my-2 sm:hidden md:block md:my-4 flex-30">{children}</div>
      <ProductInput
        handleSelectProduct={handleSelectProduct}
        products={products}
      />
      <div className="my-4 flex-10">{Button}</div>
    </div>
  );
}
