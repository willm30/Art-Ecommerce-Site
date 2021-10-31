import { PageProps } from "gatsby";
import React from "react";
import NavMenu from "../navigation/nav-menu";

export default function Layout({
  children,
}: {
  children: PageProps["children"];
}) {
  return (
    <div>
      <NavMenu></NavMenu>
      {children}
    </div>
  );
}
