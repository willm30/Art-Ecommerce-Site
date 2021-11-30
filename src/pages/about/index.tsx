import { graphql } from "gatsby";
import React, { useEffect } from "react";
import SeeAlso from "../../components/frames/seeAlso/seeAlso";
import Copyright from "../../components/layout/copyright";
import Layout from "../../components/layout/layout";
import { paragraphsToReactComponent } from "../../utilities/contentful";

export default function About({ location, data }) {
  const galleryCopy = data.allContentfulPageCopy.edges[0].node.textEntry.raw;
  const galleryCopyJSX = paragraphsToReactComponent(
    galleryCopy,
    "my-4 text-justify leading-relaxed"
  );
  const featured = data.allContentfulPicture.edges;

  const styles = {
    desktop: {
      h1: "text-5xl font-ogirema mt-8 mb-4 md:text-left",
      p: "font-poppins md:text-2xl md:px-0 mb-8",
    },
    mobile: {
      h1: "text-center",
      p: "px-4 text-lg",
    },
  };

  return (
    <Layout
      title="About"
      location={location}
      childStyles="col-start-2 col-end-10 md:col-end-6 row-start-2"
    >
      <div className="flex justify-between items-center">
        <h1 className={`${styles.desktop.h1} ${styles.mobile.h1}`}>
          About Purple Orchard
        </h1>
      </div>
      <div className={`${styles.desktop.p} ${styles.mobile.p}`}>
        {galleryCopyJSX}
      </div>
      <SeeAlso
        images={featured}
        headingText="Here are some of our favourite images:"
      />
      <Copyright />
    </Layout>
  );
}

export const query = graphql`
  query GalleryCopy {
    allContentfulPageCopy(filter: { title: { eq: "Gallery" } }) {
      edges {
        node {
          title
          textEntry {
            raw
          }
        }
      }
    }
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
