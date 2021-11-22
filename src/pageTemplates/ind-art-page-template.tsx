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
import { getRandomImages } from "../utilities/images";

export default function ArtInd({ data, location }) {
  const picture = data.contentfulPicture;
  const image = getImage(picture.image);
  const title = picture.name;
  const alt = picture.alternativeText;
  const { slug, canvasType, mediaType } = picture;
  const des = documentToReactComponents(JSON.parse(picture.description.raw));
  const series = picture.seriesImages;
  const artist = picture.artist;
  const [seeAlsoDefault, setSeeAlsoDefault] = useState(undefined);
  const [productStyles, setProductStyles] = useState({});
  const [scrollTop, setScrollTop] = useState(undefined);
  const [isMobile, setIsMobile] = useState(false);

  const [cart, setCart]: [CartItemShape[], (newCart: CartItemShape[]) => void] =
    useContext(CartContext);
  const quantity = 1;

  const products: CartItemShape[] = [
    {
      productName: "Poster",
      price: 19.99,
      title,
      image,
      alt,
      quantity,
      slug,
      artist,
      canvasType,
      mediaType,
    },
    {
      productName: "Frame",
      price: 79.99,
      title,
      image,
      alt,
      quantity,
      slug,
      artist,
      canvasType,
      mediaType,
    },
  ]; // TODO: Extract from page query

  function addToCart(item: CartItemShape) {
    console.log(item, "item");
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
    const scrollLimit =
      document.getElementById("right").getBoundingClientRect().height - 200;

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
    setSeeAlsoDefault(getRandomImages(data.allContentfulPicture.edges, 3));
    if (window.innerWidth < 668) {
      setIsMobile(true);
    }
  }, []);

  useEffect(() => {
    if (!isMobile) {
      window.addEventListener("scroll", handleScroll, true);
    }
    return () => {
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, [isMobile]);

  const styles = {
    desktop: {
      layout: "col-span-full row-start-2 md:grid grid-cols-ind",
      seeMore: {
        cont: "mt-6 col-span-full flex md:flex-row justify-center items-center",
        h2: "col-span-2 row-span-1 font-ogirema text-4xl flex md:justify-start items-center md:ml-8 py-4",
      },
      footer: "my-8 col-span-full md:grid grid-cols-ind grid-rows-feature",
    },
    mobile: {
      layout: "flex flex-col",
      seeMore: {
        cont: "flex-col",
        h2: "justify-center",
      },
      footer: "flex flex-col justify-center items-center",
    },
  };
  return (
    <Layout
      title={picture.name}
      childStyles={`${styles.desktop.layout} ${styles.mobile.layout}`}
      location={location}
    >
      <div
        id="left"
        className="col-span-1 flex flex-col justify-start items-center mt-8 px-0 md:px-8 text-center"
      >
        <h1 className="font-ogirema text-5xl mb-8 px-8 md:px-0">{title}</h1>
        {isMobile ? (
          <MagImg
            image={image}
            alt={alt}
            className="flex px-4 justify-center items-center"
            handleMagnify={null}
            id={picture.name}
          />
        ) : null}
        <h2 className="font-poppins text-lg my-4 md:-mt-2">
          {mediaType} on {canvasType}
        </h2>
        <div className="font-poppins text-justify text-lg px-4 md:px-0">
          {des}
        </div>
      </div>
      {!isMobile ? (
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
      ) : null}
      <div
        id="right"
        className="relative col-start-3 col-end-4 flex flex-col mt-8"
      >
        {!isMobile ? (
          <p className="flex font-poppins justify-center mb-1">
            <span className="mx-2">
              <MagnifyingGlass />
            </span>{" "}
            Click image to magnify
          </p>
        ) : null}
        <ProductInput
          products={products}
          addToCart={addToCart}
          productStyles={productStyles}
        />
      </div>
      <div
        id="footer"
        className={`${styles.desktop.footer} ${styles.mobile.footer}`}
      >
        <h2
          id="see-more"
          className={`${styles.desktop.seeMore.h2} ${styles.mobile.seeMore.h2}`}
        >
          {series ? "More from this series:" : "You might also like:"}
        </h2>
        <div
          className={`${styles.desktop.seeMore.cont} ${styles.mobile.seeMore.cont}`}
        >
          {series
            ? series.slice(0, 3).map((img, i) => {
                const thumbnail = getImage(img.image);
                return (
                  <ThumbnailWrapper
                    to={`/art/${img.slug}`}
                    key={img.name}
                    alt={img.alternativeText}
                    img={thumbnail}
                    title={img.name}
                    artist={img.artist}
                    canvasType={img.canvasType}
                    mediaType={img.mediaType}
                    id={`thumbnail${i + 1}`}
                    width="my-4 md:my-0 md:flex-33"
                  />
                );
              })
            : seeAlsoDefault?.map((defaultImg, i) => {
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
                    canvasType={data.canvasType}
                    mediaType={data.mediaType}
                    id={`thumbnail${i + 1}`}
                    width="my-4 md:my-0 md:flex-33"
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
      artist
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
        canvasType
        mediaType
      }
    }
    allContentfulPicture(filter: { mediaType: { eq: $media } }) {
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
          canvasType
          mediaType
        }
      }
    }
  }
`;
