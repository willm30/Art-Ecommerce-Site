import React from "react";
import { Link } from "gatsby";

export default function Logo() {
  return (
    <Link to="/" className="flex-20 flex flex-col items-center justify-center">
      <div className="rounded-full w-12 h-12 bg-white border-2 border-black"></div>
    </Link>
  );
}
