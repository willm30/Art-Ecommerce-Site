import React from "react";
import Header from "./header";

export default function Layout({ children }: { children: React.ReactElement }) {
  return (
    <div className="grid gap-8 grid-cols-6 grid-rows-feature max-h-screen">
      <Header></Header>
      <div className="col-start-2 col-end-6 max-w-screen-md">{children}</div>
    </div>
  );
}
