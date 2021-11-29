import React from "react";
import StandardButton from "../frames/buttons/standard-btn";

export default function PaymentResolution({ description, title, pathname }) {
  const styles = {
    desktop: {
      h1: "text-5xl font-ogirema md:px-0 my-8 md:text-left",
      p: "font-poppins text-xl md:px-0 md:text-left",
    },
    mobile: {
      h1: "px-4 text-center",
      p: "px-4 text-center",
    },
  };
  return (
    <div className="flex flex-col items-center md:items-start min-h-[85vh]">
      <div className="flex justify-between items-center">
        <h1 className={`${styles.desktop.h1} ${styles.mobile.h1}`}>{title}</h1>
      </div>
      <div className={`${styles.desktop.p} ${styles.mobile.p}`}>
        {description}
      </div>
      {pathname == "/success" ? (
        <StandardButton to="/art" text="View All Artwork" />
      ) : (
        <StandardButton to="/collection" text="View Your Collection" />
      )}
    </div>
  );
}
