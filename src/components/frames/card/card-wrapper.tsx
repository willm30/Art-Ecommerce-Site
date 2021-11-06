import React from "react";

export default function CardWrapper({
  children,
}: {
  children: React.ReactElement | React.ReactElement[];
}) {
  return (
    <div
      id="CardWrapper"
      className="flex flex-wrap flex-col sm:flex-row sm:items-center md:items-center bg-gray-100 my-2 p-2 border-gray-200 shadow-inner border-8"
    >
      {children}
    </div>
  );
}
