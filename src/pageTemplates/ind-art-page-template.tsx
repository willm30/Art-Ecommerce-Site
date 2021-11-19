import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { graphql } from "gatsby";
import { getImage } from "gatsby-plugin-image";
import React, { useState, useContext, useEffect } from "react";
import { CartItemShape } from "../components/cart/cartItem";
import MagImg from "../components/frames/card/individual/magnified-wrapper";
import ThumbnailWrapper from "../components/frames/card/individual/thumbnail-wrapper";
import Magnifier from "../components/frames/magnifier";
import ProductInput from "../components/frames/productList/productList";
import Layout from "../components/layout/layout";
import { CartContext } from "../context/CartContext";
import MagnifyingGlass from "../icons/magnifyingGlass";
import { incrementQuantity } from "../utilities/cart";

export default function ArtInd({ data }) {
  const picture = data.contentfulPicture;
  const image = getImage(picture.image);
  const title = picture.name;
  const alt = picture.alternativeText;
  const { slug, canvasType, mediaType } = picture;
  const des = documentToReactComponents(JSON.parse(picture.description.raw));
  const series = picture.seriesImages;
  const orientation =
    picture.image.gatsbyImageData.width > picture.image.gatsbyImageData.height
      ? "Landscape"
      : "Portrait";
  const seeAlsoDefault = data.allContentfulPicture.edges;
  const [productStyles, setProductStyles] = useState({});
  const [scrollTop, setScrollTop] = useState(undefined);

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

  function handleScroll() {
    const scrollTop = document.querySelector(".tl-edges").scrollTop;
    const scrollLimit = orientation == "Landscape" ? 390 : 750;
    setProductStyles({
      transform: `translateY(${
        scrollTop < scrollLimit ? scrollTop : scrollLimit
      }px)`,
      transitionProperty: "transform",
      transitionDuration: "700ms",
      transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
      willChange: "transform",
    });
    setScrollTop(scrollTop);
  }

  useEffect(() => {
    document.querySelector(".tl-edges").scrollTop = 0;
    window.addEventListener("scroll", handleScroll, true);

    return () => {
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, []);

  return (
    <Layout
      title={picture.name}
      childStyles="col-span-full row-start-2 grid grid-cols-ind relative top-20"
    >
      <div
        id="left"
        className="col-span-1 flex flex-col justify-start items-center mt-8 px-8 text-center"
      >
        <h1 className="font-ogirema text-5xl mb-8">{title}</h1>
        <div className="font-poppins text-justify text-lg">{des}</div>
        <div className="font-poppins text-lg mt-8">
          <p>Canvas Type: {canvasType}</p>
          <p>Media Type: {mediaType}</p>
        </div>
      </div>
      <Magnifier
        zoom={2}
        backgroundImage={`url(${picture.image.file.url})`}
        imageContainerId={picture.name}
        scrollPosition={scrollTop}
      >
        <MagImg
          image={image}
          alt={alt}
          className="flex justify-center items-center mt-8"
          handleMagnify={null}
          id={picture.name}
        />
      </Magnifier>
      <div
        id="right"
        className="relative col-start-3 col-end-4 flex flex-col mt-8"
      >
        <p className="flex font-poppins justify-center mb-1">
          <span className="mx-2">
            <MagnifyingGlass />
          </span>{" "}
          Click image to magnify
        </p>
        <ProductInput
          products={products}
          addToCart={addToCart}
          productStyles={productStyles}
        />
      </div>
      <div
        id="footer"
        className="my-8 col-span-full grid grid-cols-ind grid-rows-feature"
      >
        <h2 className="col-span-2 row-span-1 font-ogirema text-4xl flex justify-start items-center ml-8 py-4">
          {series ? "More from this series:" : "You might also like:"}
        </h2>
        <div className="mt-6 col-span-full flex justify-center items-center">
          {series
            ? series.map((img, i) => {
                const thumbnail = getImage(img.image);
                return (
                  <ThumbnailWrapper
                    to={`/art/${img.slug}`}
                    key={img.name}
                    alt={img.alternativeText}
                    img={thumbnail}
                    title={img.name}
                    artist={img.artist}
                    id={`thumbnail${i + 1}`}
                    width="flex-33"
                  />
                );
              })
            : seeAlsoDefault.map((defaultImg, i) => {
                const data = defaultImg.node;
                const img = getImage(data.image);
                return (
                  <ThumbnailWrapper
                    to={`/art/${data.slug}`}
                    key={data.name}
                    alt={data.alternativeText}
                    img={img}
                    title={data.name}
                    artist={data.artist}
                    id={`thumbnail${i + 1}`}
                    width="flex-33"
                  />
                );
              })}
        </div>
      </div>
    </Layout>
  );
}

export const query = graphql`
  query IndividualPicture($id: String!, $media: String!) {
    contentfulPicture(id: { eq: $id }) {
      id
      name
      slug
      alternativeText
      canvasType
      mediaType
      image {
        gatsbyImageData(
          layout: CONSTRAINED
          placeholder: DOMINANT_COLOR
          width: 700
        )
        file {
          url
        }
      }
      description {
        raw
      }
      seriesImages {
        image {
          gatsbyImageData(
            layout: CONSTRAINED
            placeholder: DOMINANT_COLOR
            width: 300
          )
        }
        alternativeText
        artist
        name
        slug
      }
    }
    allContentfulPicture(filter: { mediaType: { eq: $media } }, limit: 3) {
      edges {
        node {
          id
          image {
            gatsbyImageData(
              placeholder: DOMINANT_COLOR
              layout: CONSTRAINED
              width: 300
            )
          }
          artist
          name
          alternativeText
          slug
        }
      }
    }
  }
`;
