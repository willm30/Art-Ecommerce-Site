import { graphql } from "gatsby";
import React from "react";
import SeeAlso from "../components/frames/seeAlso/seeAlso";
import Copyright from "../components/layout/copyright";
import Layout from "../components/layout/layout";

export default function PageMissing({ location, data }) {
  const featured = data.allContentfulPicture.edges;

  const styles = {
    desktop: {
      h1: "md:text-6xl md:px-0",
      p: "font-poppins my-4 md:text-4xl md:px-0",
      seeMore: "flex md:flex-row md:flex-wrap",
    },
    mobile: {
      h1: "text-4xl px-4",
      p: "text-2xl px-4",
      seeMore: "flex-col",
    },
  };
  return (
    <Layout
      title="Missing Page"
      childStyles="col-start-2 col-end-10 md:col-end-6 row-start-2 flex flex-col items-start"
      location={location}
    >
      <div className="font-ogirema my-4 text-center md:text-left">
        <h1 className={`${styles.desktop.h1} ${styles.mobile.h1}`}>
          We couldn't find that page!
        </h1>
        <p className={`${styles.desktop.p} ${styles.mobile.p}`}>
          It's possible the page has moved or the url is incorrect.
        </p>
      </div>
      <SeeAlso
        images={featured}
        headingText="In the meantime, you might like some of our featured artwork:"
      />
      <Copyright />
    </Layout>
  );
}

export const query = graphql`
  query Featured {
    allContentfulPicture(filter: { featuredImage: { eq: true } }) {
      edges {
        node {
          id
          image {
            gatsbyImageData(
              layout: CONSTRAINED
              placeholder: DOMINANT_COLOR
              width: 300
            )
          }
          alternativeText
          slug
          name
          artist
          canvasType
          mediaType
        }
      }
    }
  }
`;
