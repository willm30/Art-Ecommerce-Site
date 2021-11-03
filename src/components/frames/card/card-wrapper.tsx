import React from "react";

export default function CardWrapper({
  children,
}: {
  children: React.ReactElement | React.ReactElement[];
}) {
  return (
    <div className="flex flex-wrap filter drop-shadow-lg bg-gray-100 my-2 p-2">
      {children}
    </div>
  );
}
