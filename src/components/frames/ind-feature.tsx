import { IGatsbyImageData } from "gatsby-plugin-image";
import React from "react";
import IndImg from "./card/individual/image-wrapper";
import IndDesc from "./card/individual/desc-wrapper";
import CardWrapper from "./card/card-wrapper";
import { CartItemShape } from "../cart/cartItem";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
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
  slug,
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
  slug: string;
  children: React.ReactElement;
  handleMouseMove: (e) => void | null;
  handleMagnify: () => void | null;
}) {
  const [cart, setCart]: [CartItemShape[], (newCart: CartItemShape[]) => void] =
    useContext(CartContext);
  const quantity = 1;

  const products: CartItemShape[] = [
    { productName: "Poster", price: 19.99, title, image, alt, quantity, slug },
    { productName: "Frame", price: 79.99, title, image, alt, quantity, slug },
  ]; // TODO: Extract from static query

  function addToCart(item: CartItemShape) {
    if (!Object.entries(item).length) return;
    const duplicateEntry = cart.find(
      (cartItem) =>
        item.title == cartItem.title && item.productName == cartItem.productName
    );
    if (!duplicateEntry) setCart([...cart, item]);
    else {
      const newCart = incrementQuantity(cart, duplicateEntry);
      setCart(newCart);
    }
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
      <IndDesc name={name} des={des} products={products} addToCart={addToCart}>
        <div>
          <p>Media Type: {media}</p>
          <p>Canvas Type: {canvas}</p>
        </div>
      </IndDesc>
    </CardWrapper>
  );
}

// INSERT PAGE QUERY FOR PRODUCTS
