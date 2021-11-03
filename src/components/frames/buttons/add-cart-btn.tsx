import React from "react";

export default function AddCartBtn({ text }) {
  return (
    <button className="bg-gray-200 border-black border filter drop-shadow-md rounded-md p-2 hover:bg-white">
      {text}
    </button>
  );
}
