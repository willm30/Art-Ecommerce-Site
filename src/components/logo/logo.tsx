import React from "react";
import { Link } from "gatsby";

export default function Logo() {
  return (
    <Link
      to="/"
      className="flex-logo flex flex-col items-center justify-center"
    >
      <div className="rounded-full w-28 h-28 bg-white border-8 border-black"></div>
    </Link>
  );
}
