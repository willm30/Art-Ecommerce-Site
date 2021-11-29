import { Link } from "gatsby";
import React from "react";

export default function SkipTo({ allPages }) {
  return (
    allPages.length > 1 && (
      <div className="flex flex-col md:flex-row justify-center items-center font-poppins text-lg mt-2 md:mt-0 mb-4">
        <span className="my-2 md:my-0">Skip to page:</span>
        <div className="md:my-0 my-2">
          {allPages.map((p, i) => (
            <Link
              key={`link${i}`}
              to={`/art${p == 1 ? "" : `/${p}`}`}
              className="underline mx-3 md:mx-2 hover:text-indigo-900"
            >
              {p}
            </Link>
          ))}
        </div>
      </div>
    )
  );
}
