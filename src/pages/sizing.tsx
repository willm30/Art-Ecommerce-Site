import { graphql, Link } from "gatsby";
import React from "react";
import StandardButton from "../components/frames/buttons/standard-btn";
import Copyright from "../components/layout/copyright";
import Layout from "../components/layout/layout";
import { getRaw, paragraphsToReactComponent } from "../utilities/contentful";

export default function SizingGuide({ data, location }) {
  const products = data.allContentfulProduct.edges;
  const styles = {
    desktop: {
      h1: "text-5xl font-ogirema my-8 md:text-left",
      h2: "font-poppins text-3xl ",
    },
    mobile: {
      h1: "text-center",
      h2: "",
    },
  };

  return (
    <Layout
      title="Sizing Guide"
      location={location}
      childStyles="col-start-2 col-end-10 md:col-end-6 row-start-2"
    >
      <div className="flex justify-between items-center">
        <h1 className={`${styles.desktop.h1} ${styles.mobile.h1}`}>
          Frame Sizing Guide
        </h1>
      </div>
      <div className="min-h-[70vh] flex flex-col font-poppins leading-relaxed text-xl px-4 md:px-0">
        {products.map((product) => {
          const rawText = product.node.description.raw;
          const description = paragraphsToReactComponent(
            rawText,
            "my-4 text-justify"
          );
          return (
            <div className="my-8 md:my-0">
              <h2 className={`${styles.desktop.h2} ${styles.mobile.h2}`}>
                {product.node.productName}
              </h2>
              <div>{description}</div>
            </div>
          );
        })}
        <div className="self-center md:self-start my-4">
          <StandardButton to="/collection" text="Back To Your Collection" />
        </div>
      </div>
      <Copyright />
    </Layout>
  );
}

export const query = graphql`
  query Products {
    allContentfulProduct {
      edges {
        node {
          description {
            raw
          }
          price
          productName
        }
      }
    }
  }
`;
