import React from "react";
import NavMenu from "../navigation/nav-menu";

export default function Layout({ children }: { children: React.ReactElement }) {
  return (
    <div className="grid gap-8 grid-cols-6 grid-rows-feature max-h-screen">
      <NavMenu></NavMenu>
      <div className="col-start-2 col-end-6 max-w-screen-md">{children}</div>
    </div>
  );
}
