import React from "react";
import Seo from "../seo/seo";
import Header from "./header";

export default function Layout({
  children,
  childStyles,
  title,
  location,
  isMobile,
}: {
  children: React.ReactElement | React.ReactElement[];
  childStyles: string;
  title: string;
  location: any;
  isMobile: boolean;
}) {
  return (
    <div className="grid sm:grid-cols-10 md:grid-cols-6 grid-rows-feature h-screen">
      <Seo title={title} />
      <Header location={location} isMobile={isMobile}></Header>
      <div className={`${childStyles}`}>{children}</div>
    </div>
  );
}
