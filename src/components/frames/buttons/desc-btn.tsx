import React from "react";
import { Link } from "gatsby";

export default function DescBtn({ path, text }) {
  return (
    <Link to={path}>
      <button className="bg-gray-200 border-black border filter drop-shadow-md rounded-md p-2 hover:bg-white">
        {text}
      </button>
    </Link>
  );
}
