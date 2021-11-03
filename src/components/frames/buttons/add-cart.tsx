import React from "react";
import { Link } from "gatsby";

export default function AddCartBtn({ path }) {
  return (
    <Link to={`/art/${path}`}>
      <button className="bg-gray-200 border-black border filter drop-shadow-md rounded-md p-2 hover:bg-white">
        Add to Cart
      </button>
    </Link>
  );
}
