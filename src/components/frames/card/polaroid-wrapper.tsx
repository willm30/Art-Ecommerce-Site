import React from "react";

export default function PolaroidWrapper({
  children,
}: {
  children: React.ReactElement | React.ReactElement[];
}) {
  return (
    <div className="flex flex-wrap justify-center bg-gray-100 my-2 p-2">
      {children}
    </div>
  );
}
