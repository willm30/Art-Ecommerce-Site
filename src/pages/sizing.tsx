import { graphql, Link } from "gatsby";
import React from "react";
import Copyright from "../components/layout/copyright";
import Layout from "../components/layout/layout";
import { getRaw, paragraphsToReactComponent } from "../utilities/contentful";

export default function SizingGuide({ data, location }) {
  const products = data.allContentfulProduct.edges;
  const styles = {
    desktop: {
      h1: "text-5xl font-ogirema my-8 md:text-left",
      h2: "font-poppins text-3xl md:px-0",
    },
    mobile: {
      h1: "text-center",
      h2: "px-4",
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
      <div className="min-h-[70vh] font-poppins leading-relaxed text-xl">
        {products.map((product) => {
          const rawText = product.node.description.raw;
          const description = paragraphsToReactComponent(
            rawText,
            "my-4 text-justify"
          );
          return (
            <div>
              <h2 className={`${styles.desktop.h2} ${styles.mobile.h2}`}>
                {product.node.productName}
              </h2>
              <div>{description}</div>
            </div>
          );
        })}
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
