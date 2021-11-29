import { graphql } from "gatsby";
import React from "react";
import Copyright from "../components/layout/copyright";
import Layout from "../components/layout/layout";
import PaymentResolution from "../components/payments/paymentResolution";
import { getRaw, paragraphsToReactComponent } from "../utilities/contentful";

export default function Cancelled({ data, location }) {
  const copy = data.allContentfulPageCopy.edges;
  const description = paragraphsToReactComponent(
    getRaw(copy, "Cancelled"),
    "my-4"
  );

  return (
    <Layout
      title="Cancelled"
      location={location}
      childStyles="col-start-2 col-end-10 md:col-end-6 row-start-2"
    >
      <PaymentResolution description={description} title="Payment cancelled" />
      <Copyright />
    </Layout>
  );
}

export const query = graphql`
  query CancelledCopy {
    allContentfulPageCopy(filter: { title: { eq: "Cancelled" } }) {
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
