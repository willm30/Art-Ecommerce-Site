import React from "react";

export default function DescWrapper({
  name,
  des,
  Button,
}: {
  name: string;
  des: string;
  Button: JSX.Element;
}) {
  return (
    <div className="hidden sm:flex flex-col flex-40 text-center font-poppins">
      <h2 className="flex items-center justify-center flex-10 sm:text-2xl md:text-3xl font-secular my-4">
        {name}
      </h2>
      <div className="hidden sm:flex flex-50 justify-center sm:px-4 md:px-16 sm:my-4">
        <p>{des ? des : "No description available."}</p>
      </div>
      <div className="hidden sm:block flex-10 sm:my-4">{Button}</div>
    </div>
  );
}
