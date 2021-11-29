import { Link } from "gatsby";
import React from "react";

export default function PageSwitch({ condition, to, rel, text }) {
  return (
    !condition && (
      <Link
        to={to}
        rel={rel}
        className="md:mx-2 my-2 md:my-0 hover:text-indigo-900 text-center"
      >
        {text}
      </Link>
    )
  );
}
