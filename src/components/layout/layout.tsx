import React from "react";
import NavMenu from "../navigation/nav-menu";
import HeadBanner from "./head-banner/head-banner";

export default function Layout({ children }: { children: React.ReactElement }) {
  return (
    <div className="grid grid-cols-6 grid-rows-feature max-h-screen">
      <NavMenu></NavMenu>
      <HeadBanner></HeadBanner>
      <div className="col-start-3 col-end-6 row-start-3 row-end-6 max-w-screen-md">
        {children}
      </div>
    </div>
  );
}
