import React from "react";
import { Link } from "gatsby";

export default function Logo({ flexBasis }: { flexBasis: string }) {
  return (
    <Link
      to="/"
      className={`${flexBasis} flex flex-col items-center justify-center p-2`}
    >
      <div className="rounded-full w-12 h-12 bg-white border-2 border-black"></div>
    </Link>
  );
}
