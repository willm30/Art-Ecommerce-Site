import React from "react";

export default function Copyright() {
  const styles = {
    desktop:
      "col-span-full row-start-3 flex justify-center items-center font-poppins md:text-lg",
    mobile: "text-xs",
  };
  return (
    <div className={`${styles.desktop} ${styles.mobile}`}>
      <span className="text-center">
        Copyright © Purple Orchard Art. 2021 All Rights Reserved.
      </span>
    </div>
  );
}
