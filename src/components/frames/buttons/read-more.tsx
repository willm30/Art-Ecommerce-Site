import React from "react";
import { Link } from "gatsby";

export default function ReadMoreBtn({ path }) {
  return (
    <Link to={`/art/${path}`}>
      <button className="bg-gray-200 border-black border filter drop-shadow-md rounded-md p-2 hover:bg-white">
        Read more
      </button>
    </Link>
  );
}
