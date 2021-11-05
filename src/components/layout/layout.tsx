import React from "react";
import Seo from "../seo/seo";
import Header from "./header";

export default function Layout({
  children,
  title,
}: {
  children: React.ReactElement | React.ReactElement[];
  title: string;
}) {
  return (
    <div className="grid sm:gap-4 md:gap-8 sm:grid-cols-10 md:grid-cols-6 grid-rows-feature max-h-screen">
      <Seo title={title} />
      <Header></Header>
      <div className="col-span-full sm:col-start-2 sm:col-end-10 md:col-start-2 md:col-end-6 max-w-screen-md">
        {children}
      </div>
    </div>
  );
}
