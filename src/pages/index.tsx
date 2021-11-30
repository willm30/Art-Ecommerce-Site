import { graphql, Link } from "gatsby";
import { getImage } from "gatsby-plugin-image";
import React, { useEffect, useRef, useState } from "react";
import Carousel from "../components/carousel/carousel";
import BetterIndImg from "../components/frames/card/individual/image-wrapper-improved";
import Layout from "../components/layout/layout";
import { getInitialTransform } from "../utilities/carousel";
import { invalidateAndRestart, translateCard } from "../animations/carousel";
import MobileCarousel from "../components/carousel/mobile/mobileCarousel";
import ThumbnailWrapper from "../components/frames/card/individual/thumbnail-wrapper";
import { getRaw, paragraphsToReactComponent } from "../utilities/contentful";
import Copyright from "../components/layout/copyright";
import StandardButton from "../components/frames/buttons/standard-btn";
import gsap from "gsap";

export default function IndexPage({ data, location }) {
  const carouselPictures = data.carousel.edges;
  const featuredPictures = data.featured.edges
    .filter((n) => n.node.name.trim() != "Flowers Joyful")
    .slice(0, 9);
  const flowersJoyful = data.featured.edges.filter(
    (n) => n.node.name.trim() == "Flowers Joyful"
  )[0].node;
  const copy = data.copy.edges;
  const galleryCopy = getRaw(copy, "Gallery");
  const contactCopy = getRaw(copy, "Contact");
  galleryCopy.content = galleryCopy.content.slice(0, 2);
  const galleryCopyJSX = paragraphsToReactComponent(
    galleryCopy,
    "my-4 px-4 text-justify leading-relaxed"
  );
  const contactCopyJSX = paragraphsToReactComponent(
    contactCopy,
    "my-4 px-4 text-justify leading-relaxed"
  );
  const title = "Art";
  const animateRight = useRef(null);
  const animateLeft = useRef(null);
  const timer = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const cardWidth = isMobile ? 100 : 40;
  const imgSlice = isMobile ? 8 : 9;
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
    clearInterval(timer.current);
    direction == "Left" ? moveLeft() : moveRight();
  }

  useEffect(() => {
    timer.current = setInterval(moveRight, 2500);
    if (window.innerWidth < 668) {
      setIsMobile(true);
    }
    return () => {
      clearInterval(timer.current);
    };
  }, []);

  useEffect(() => {
    const slides = document.querySelectorAll("[data-ref=slide]");
    const initialTransform = getInitialTransform(cardWidth, slides.length);
    gsap.set(slides, {
      xPercent: initialTransform,
    });
    animateRight.current = translateCard(slides, cardWidth, "Right");
    animateLeft.current = translateCard(slides, cardWidth, "Left");
  }, [isMobile]);

  const styles = {
    desktop: {
      gallery: {
        cont: "md:min-h-screen bg-white md:flex-row",
        img: "md:block flex-40 m-6",
        p: "font-poppins md:text-3xl md:px-4",
      },
      collection: {
        row1: "flex overflow-y-hidden",
      },
      contact: {
        img: "md:block flex-60 h-full ",
      },
    },
    mobile: {
      gallery: {
        cont: "flex flex-col justify-center items-center",
        img: "hidden",
        p: "p-2 text-xl",
      },
      collection: {
        row1: "flex-wrap",
      },
      contact: {
        img: "hidden",
      },
    },
  };

  return (
    <Layout
      title={title}
      childStyles="col-span-full row-start-2 md:grid grid-cols-all"
      location={location}
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
          <ThumbnailWrapper
            to={`/art/${flowersJoyful.slug}`}
            alt={flowersJoyful.alternativeText}
            img={getImage(flowersJoyful.image)}
          />
        </div>
        <div className="flex flex-col justify-center flex-60 h-full">
          <Link to="/about">
            <h2 className="flex justify-center items-center text-6xl font-ogirema h-[10vh] my-2">
              The Gallery
            </h2>
          </Link>
          <div
            className={`${styles.desktop.gallery.p} ${styles.mobile.gallery.p}`}
          >
            {galleryCopyJSX}
          </div>
          <div className="flex justify-center items-center md:mt-8">
            <StandardButton to="/about" text="Read More" />
          </div>
        </div>
      </section>

      <div className="">
        <Link to="/art">
          <h2 className="flex w-full justify-center items-center text-6xl font-ogirema h-[10vh] my-8">
            The Collection
          </h2>
        </Link>
        <div
          className={`${styles.desktop.collection.row1} ${styles.mobile.collection.row1}`}
        >
          {featuredPictures.slice(0, imgSlice).map((picture) => {
            const data = picture.node;
            const image = getImage(data.image);
            return (
              <BetterIndImg
                key={data.name}
                data={data}
                image={image}
                className="flex-50 md:flex-30"
              />
            );
          })}
        </div>
      </div>
      <div className="md:grid grid-cols-contact md:h-[90vh]">
        <div className="col-start-2 col-end-3 order-1 flex flex-col justify-center items-center z-10 bg-white">
          <h2 className="flex justify-center items-center text-6xl font-ogirema my-4 md:my-0">
            Contact
          </h2>
          <div className="font-poppins md:text-3xl text-xl md:p-10 p-2 w-full">
            {contactCopyJSX}
          </div>
        </div>
      </div>
      <Copyright />
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
    copy: allContentfulPageCopy {
      edges {
        node {
          title
          textEntry {
            raw
          }
        }
      }
    }
  }
`;
