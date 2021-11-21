import { graphql, Link } from "gatsby";
import { getImage } from "gatsby-plugin-image";
import React, { useEffect, useRef } from "react";
import Carousel from "../components/carousel/carousel";
import BetterIndImg from "../components/frames/card/individual/image-wrapper-improved";
import Layout from "../components/layout/layout";
import { getInitialTransform } from "../utilities/carousel";
import gsap from "gsap";
import {
  invalidateAndRestart,
  getRightAnimation,
  getLeftAnimation,
} from "../animations/carousel";

export default function IndexPage({ data, location }) {
  const carouselPictures = data.carousel.edges;
  const featuredPictures = data.featured.edges.slice(0, 8);
  const title = "Art";
  const animateRight = useRef(null);
  const animateLeft = useRef(null);
  const timer = useRef(null);
  const cardWidth = 40;

  function moveRight() {
    const { active, unactive } = animateRight.current;
    if (!active.isActive()) {
      invalidateAndRestart([active, unactive]);
    }
  }

  function moveLeft() {
    const { active, unactive } = animateLeft.current;
    if (!active.isActive()) {
      invalidateAndRestart([active, unactive]);
    }
  }

  useEffect(() => {
    const slides = document.querySelectorAll("[data-ref=slide]");
    gsap.set(slides, {
      xPercent: getInitialTransform(cardWidth, slides.length),
    });
    animateRight.current = getRightAnimation(slides);
    animateLeft.current = getLeftAnimation(slides);
    timer.current = setInterval(moveRight, 2500);

    return () => clearTimer(timer.current);
  }, []);

  function clearTimer(timer) {
    clearInterval(timer);
  }
  return (
    <Layout
      title={title}
      childStyles="relative col-span-full"
      location={location}
    >
      <Carousel
        pictures={carouselPictures}
        left={moveLeft}
        right={moveRight}
        clearTimer={() => clearTimer(timer.current)}
      />

      <div
        id="gallery"
        className="flex h-[90vh] border-2 border-black bg-white"
      >
        <div className="flex flex-col flex-60 h-full border-2 border-black">
          <h2 className="flex justify-center items-center text-6xl font-ogirema h-[10vh]">
            The Gallery
          </h2>
          <p className="h-full font-poppins text-3xl border-2 border-black p-16">
            Some text about the gallery that describes what the gallery is, who
            belongs to it, why it exists, is it online only, who started it, why
            people should spend money in it...
          </p>
        </div>
        <div className="flex-40 h-full border-2 border-black">
          Feature image goes here
        </div>
      </div>
      <div className="h-[142vh]">
        <Link to="/art">
          <h2 className="flex justify-center items-center text-6xl font-ogirema h-[10vh]">
            The Collection
          </h2>
        </Link>
        <div className="flex max-h-[66vh] overflow-y-hidden">
          {featuredPictures.slice(0, 4).map((picture) => {
            const data = picture.node;
            const image = getImage(data.image);
            return (
              <BetterIndImg
                key={data.name}
                data={data}
                image={image}
                className="flex-25"
              />
            );
          })}
        </div>
        <div className="flex max-h-[66vh] overflow-y-hidden">
          {featuredPictures.slice(4).map((picture) => {
            const data = picture.node;
            const image = getImage(data.image);
            return (
              <BetterIndImg
                key={data.name}
                data={data}
                image={image}
                className="flex-25"
              />
            );
          })}
        </div>
      </div>
      <div className="bg-white flex h-[90vh] border-2 border-black">
        <div className="order-1 flex flex-col flex-40 h-full border-2 border-black">
          <h2 className="flex justify-center items-center text-6xl font-ogirema h-[10vh]">
            Contact
          </h2>
          <p className="h-full font-poppins text-3xl border-2 border-black p-16">
            Some contact form
          </p>
        </div>
        <div className="flex-60 h-full border-2 border-black">
          Some image goes here
        </div>
      </div>
      <div className="flex h-[30vh] border-2 border-black">Footer</div>
    </Layout>
  );
}

export const query = graphql`
  query PicturesList {
    carousel: allContentfulPicture(filter: { carouselImage: { eq: true } }) {
      edges {
        node {
          id
          image {
            gatsbyImageData(
              layout: CONSTRAINED
              placeholder: DOMINANT_COLOR
              width: 700
            )
          }
          alternativeText
          slug
          name
        }
      }
    }
    featured: allContentfulPicture(filter: { featuredImage: { eq: true } }) {
      edges {
        node {
          id
          image {
            gatsbyImageData(
              layout: CONSTRAINED
              placeholder: DOMINANT_COLOR
              width: 700
            )
          }
          alternativeText
          slug
          name
        }
      }
    }
  }
`;
