import { graphql } from "gatsby";
import React, { useContext, useEffect } from "react";
import StandardButton from "../components/frames/buttons/standard-btn";
import Copyright from "../components/layout/copyright";
import Layout from "../components/layout/layout";
import PaymentResolution from "../components/payments/paymentResolution";
import { CartContext } from "../context/CartContext";
import { getRaw, paragraphsToReactComponent } from "../utilities/contentful";

export default function Success({ data, location }) {
  const [cart, setCart] = useContext(CartContext);
  console.log(location, "location");
  const { pathname } = location;
  const copy = data.allContentfulPageCopy.edges;
  const description = paragraphsToReactComponent(
    getRaw(copy, "Success"),
    "my-4"
  );

  useEffect(() => {
    setCart([]);
  }, []);
  return (
    <Layout
      title="Success!"
      location={location}
      childStyles="col-start-2 col-end-10 md:col-end-6 row-start-2"
    >
      <PaymentResolution
        description={description}
        title="Success!"
        pathname={pathname}
      />
      <Copyright />
    </Layout>
  );
}

export const query = graphql`
  query SuccessCopy {
    allContentfulPageCopy(filter: { title: { eq: "Success" } }) {
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
