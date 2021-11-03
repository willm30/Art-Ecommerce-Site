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
    <div className="grid gap-8 grid-cols-6 grid-rows-feature max-h-screen">
      <Seo title={title} />
      <Header></Header>
      <div className="col-start-2 col-end-6 max-w-screen-md">{children}</div>
    </div>
  );
}
