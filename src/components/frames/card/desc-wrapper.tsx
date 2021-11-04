import React from "react";

export default function DescWrapper({
  name,
  des,
  flexBasis,
  Button,
  headingSize,
  children,
  orientation,
}: {
  name: string;
  des: string;
  flexBasis: string;
  headingSize: string;
  Button: JSX.Element;
  orientation: "Portrait" | "Landscape";
  children: React.ReactElement | React.ReactElement[];
}) {
  const margin = orientation == "Portrait" ? "" : "my-2";
  return (
    <div className={`flex flex-col ${flexBasis} text-center font-poppins`}>
      <h2
        className={`${margin} flex items-center justify-center flex-10 ${headingSize}`}
      >
        {name}
      </h2>
      <div className={`${margin} flex-50 justify-center flex flex-col px-16`}>
        <p>{des ? des : "No description available."}</p>
      </div>
      <div className={`${margin} flex-30`}>{children}</div>
      <div className={`${margin} flex-10`}>{Button}</div>
    </div>
  );
}
