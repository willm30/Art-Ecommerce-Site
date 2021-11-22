import { graphql, Link } from "gatsby";
import { getImage } from "gatsby-plugin-image";
import React, { useEffect, useRef, useState } from "react";
import Carousel from "../components/carousel/carousel";
import BetterIndImg from "../components/frames/card/individual/image-wrapper-improved";
import Layout from "../components/layout/layout";
import { getInitialTransform } from "../utilities/carousel";
import gsap from "gsap";
import { invalidateAndRestart, translateCard } from "../animations/carousel";
import MobileCarousel from "../components/carousel/mobile/mobileCarousel";

export default function IndexPage({ data, location }) {
  const carouselPictures = data.carousel.edges;
  const featuredPictures = data.featured.edges.slice(0, 8);
  const title = "Art";
  const animateRight = useRef(null);
  const animateLeft = useRef(null);
  const timer = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const cardWidth = isMobile ? 100 : 40;

  function moveRight() {
    const { active, unactive } = animateRight.current;
    const activeLeft = animateLeft.current.active;

    if (!active.isActive() && !activeLeft.isActive()) {
      invalidateAndRestart([active, unactive]);
    }
  }

  function moveLeft() {
    const { active, unactive } = animateLeft.current;
    const activeRight = animateRight.current.active;

    if (!active.isActive() && !activeRight.isActive()) {
      invalidateAndRestart([active, unactive]);
    }
  }

  function handleChevronClick(direction: "Left" | "Right") {
    clearTimer(timer.current);
    direction == "Left" ? moveLeft() : moveRight();
  }

  useEffect(() => {
    timer.current = setInterval(moveRight, 2500);
    if (window.innerWidth < 668) {
      setIsMobile(true);
    }
    return () => clearTimer(timer.current);
  }, []);

  useEffect(() => {
    const slides = document.querySelectorAll("[data-ref=slide]");
    const initialTransform = getInitialTransform(cardWidth, slides.length);
    animateRight.current = translateCard(slides, cardWidth, "Right");
    animateLeft.current = translateCard(slides, cardWidth, "Left");
    gsap.set(slides, {
      xPercent: initialTransform,
    });
  }, [isMobile]);

  function clearTimer(timer) {
    clearInterval(timer);
  }

  const slice = isMobile ? 2 : 4;
  const sliceEnd = isMobile ? 4 : featuredPictures.length;
  const styles = {
    desktop: {
      gallery: {
        cont: "md:static flex md:flex-row h-[90vh] border-2 border-black bg-white",
        img: "md:block flex-40 h-full border-2 border-black",
        p: "h-full font-poppins md:text-3xl border-2 border-black md:p-16",
      },
      collection: {
        row1: "flex md:flex-nowrap md:max-h-[64vh] overflow-y-hidden",
        row2: "flex md:flex-nowrap md:max-h-[64vh] overflow-y-hidden",
      },
      contact: {
        img: "md:block flex-60 h-full border-2 border-black",
      },
    },
    mobile: {
      gallery: {
        cont: "relative flex-col z-10",
        img: "hidden",
        p: "p-2 text-xl",
      },
      collection: {
        row1: "max-h-[37vh] flex-wrap",
        row2: "max-h-[37vh] flex-wrap",
      },
      contact: {
        img: "hidden",
      },
    },
  };

  return (
    <Layout
      title={title}
      childStyles="relative col-span-full"
      location={location}
      isMobile={isMobile}
    >
      {isMobile ? (
        <MobileCarousel
          pictures={carouselPictures}
          left={() => handleChevronClick("Left")}
          right={() => handleChevronClick("Right")}
        />
      ) : (
        <Carousel
          pictures={carouselPictures}
          left={() => handleChevronClick("Left")}
          right={() => handleChevronClick("Right")}
        />
      )}
      <section
        id="gallery"
        className={`${styles.desktop.gallery.cont} ${styles.mobile.gallery.cont}`}
      >
        <div
          className={`${styles.mobile.gallery.img} ${styles.desktop.gallery.img}`}
        >
          Feature image goes here
        </div>
        <div className="flex flex-col flex-60 h-full border-2 border-black">
          <Link to="/about">
            <h2 className="flex justify-center items-center text-6xl font-ogirema h-[10vh]">
              The Gallery
            </h2>
          </Link>
          <p
            className={`${styles.desktop.gallery.p} ${styles.mobile.gallery.p}`}
          >
            Some text about the gallery that describes what the gallery is, who
            belongs to it, why it exists, is it online only, who started it, why
            people should spend money in it...
          </p>
        </div>
      </section>
      <div className="h-[85vh] md:h-[138vh]">
        <Link to="/art">
          <h2 className="flex justify-center items-center text-6xl font-ogirema h-[10vh]">
            The Collection
          </h2>
        </Link>
        <div
          className={`${styles.desktop.collection.row1} ${styles.mobile.collection.row1}`}
        >
          {featuredPictures.slice(0, slice).map((picture) => {
            const data = picture.node;
            const image = getImage(data.image);
            return (
              <BetterIndImg
                key={data.name}
                data={data}
                image={image}
                className="flex-50 md:flex-25"
              />
            );
          })}
        </div>
        <div
          className={`${styles.desktop.collection.row2} ${styles.mobile.collection.row2}`}
        >
          {featuredPictures.slice(slice, sliceEnd).map((picture) => {
            const data = picture.node;
            const image = getImage(data.image);
            return (
              <BetterIndImg
                key={data.name}
                data={data}
                image={image}
                className="flex-50 md:flex-25"
              />
            );
          })}
        </div>
      </div>
      <div className="relative z-10 bg-white flex h-[90vh] border-2 border-black">
        <div className="order-1 flex flex-col flex-40 h-full border-2 border-black">
          <h2 className="flex justify-center items-center text-6xl font-ogirema h-[10vh]">
            Contact
          </h2>
          <p className="h-full font-poppins text-3xl border-2 border-black p-16">
            Some contact form
          </p>
        </div>
        <div
          className={`${styles.mobile.contact.img} ${styles.desktop.contact.img}`}
        >
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
