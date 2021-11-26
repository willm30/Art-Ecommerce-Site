import { Link } from "gatsby";
import React from "react";
import Layout from "../components/layout/layout";

export default function Success({ location }) {
  const styles = {
    desktop: {
      h1: "text-5xl font-ogirema my-8 md:text-left",
      p: "font-poppins text-xl md:px-0",
    },
    mobile: {
      h1: "text-center",
      p: "px-4",
    },
  };

  return (
    <Layout
      title="Cart"
      location={location}
      childStyles="col-start-2 col-end-10 md:col-end-6 row-start-2"
    >
      <div className="flex justify-between items-center">
        <h1 className={`${styles.desktop.h1} ${styles.mobile.h1}`}>
          Payment cancelled.
        </h1>
      </div>
      <p className={`${styles.desktop.p} ${styles.mobile.p}`}>
        Your payment was cancelled.{" "}
        <Link to="/collection" className="hover:underline">
          Click here to return to your collection.
        </Link>
      </p>
    </Layout>
  );
}
