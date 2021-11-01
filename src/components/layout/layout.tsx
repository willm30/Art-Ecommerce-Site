import React from "react";
import NavMenu from "../navigation/nav-menu";
import HeadBanner from "./head-banner/head-banner";

export default function Layout({ children }: { children: React.ReactElement }) {
  return (
    <div className="grid grid-cols-6 grid-rows-6">
      <NavMenu></NavMenu>
      <HeadBanner></HeadBanner>
      {children}
    </div>
  );
}
