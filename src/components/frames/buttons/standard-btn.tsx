import { Link } from "gatsby";
import React from "react";

export default function StandardButton({ to, text }) {
  return (
    <Link to={to}>
      <button className="font-poppins text-xl bg-white hover:bg-black border-black border p-2 md:p-4 w-68  hover:text-white active:bg-indigo-900 active:text-white visited:bg-indigo-900 my-4">
        {text}
      </button>
    </Link>
  );
}
