import React from "react";

export default function AddCartBtn({ text }: { text: string }) {
  return (
    <button className="bg-gray-200 border-black border rounded-md p-2 hover:bg-white">
      {text}
    </button>
  );
}
