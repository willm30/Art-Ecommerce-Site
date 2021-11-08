import { IGatsbyImageData } from "gatsby-plugin-image";
import React, { useState } from "react";
import AddCartBtn from "./buttons/add-cart-btn";
import IndImg from "./card/individual/image-wrapper";
import IndDesc from "./card/individual/desc-wrapper";
import CardWrapper from "./card/card-wrapper";
import { CartItemShape } from "../cart/cartItem";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import _ from "lodash";
import { incrementQuantity } from "../../utilities/cart";

export default function IndFeature({
  image,
  des,
  alt,
  name,
  media,
  canvas,
  path,
  orientation,
  title,
  type,
  price,
  children,
  handleMouseMove,
  handleMagnify, // gets passed in from Magnifier
}: {
  image: IGatsbyImageData;
  des: string;
  alt: string;
  name: string;
  media: string;
  canvas: string;
  path: string;
  orientation: "Portrait" | "Landscape";
  title: string;
  type: string;
  price: number;
  children: React.ReactElement;
  handleMouseMove: (e) => void | null;
  handleMagnify: () => void | null;
}) {
  const [cart, setCart]: [any[], (newCart) => void] = useContext(CartContext);
  const [selectedProduct, setSelectedProduct] = useState({
    productName: "Poster",
    price: 19.99,
  });
  const quantity = 1;

  const products = [
    { productName: "Poster", price: 19.99, title, image, alt, quantity },
    { productName: "Frame", price: 79.99, title, image, alt, quantity },
  ]; // TODO: Extract from static query
  const item: CartItemShape = {
    image,
    alt,
    title,
    quantity,
    type,
    price,
  };

  function addToCart(item: { productName: string; price: number }) {
    //TODO update to CardItemShape
    const duplicateEntry = cart.find(
      (cartItem) =>
        item.title == cartItem.title && item.productName == cartItem.productName
    );
    if (!duplicateEntry) {
      setCart([...cart, item]);
      console.log(`setting new obj in state`, [...cart, item]);
    } else {
      const newCart = incrementQuantity(cart, duplicateEntry);
      setCart(newCart);
      console.log(`DUPLICATE: increasing quantity in state`, cart);
    }
  }

  function handleSelectProduct(product: {
    productName: string;
    price: number;
  }) {
    setSelectedProduct(product);
  }

  const orientationStyles = orientation == "Landscape" ? "flex-60" : "flex-40";

  return (
    <CardWrapper>
      <div className={`flex flex-col ${orientationStyles}`}>
        {children}
        <IndImg
          image={image}
          alt={alt}
          path={path}
          orientation={orientation}
          title={title}
          handleMagnify={handleMagnify}
          handleMouseMove={handleMouseMove}
        />
      </div>
      <IndDesc
        name={name}
        des={des}
        Button={
          <AddCartBtn
            text="Add to Cart"
            handleAddToCart={addToCart}
            item={selectedProduct}
          />
        }
        products={products}
        handleSelectProduct={handleSelectProduct}
      >
        <div>
          <p>Media Type: {media}</p>
          <p>Canvas Type: {canvas}</p>
        </div>
      </IndDesc>
    </CardWrapper>
  );
}

// INSERT PAGE QUERY FOR PRODUCTS
