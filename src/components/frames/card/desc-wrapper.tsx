import React from "react";

export default function DescWrapper({
  name,
  des,
  flexBasis,
  Button,
  headingSize,
  children,
}: {
  name: string;
  des: string;
  flexBasis: string;
  headingSize: string;
  Button: JSX.Element;
  children: React.ReactElement;
}) {
  return (
    <div className={`flex flex-col ${flexBasis} text-center font-poppins`}>
      <h2 className={`flex-10 ${headingSize}`}>{name}</h2>
      <div className="flex-50 justify-center flex flex-col px-16">
        <p>{des ? des : "No description available."}</p>
      </div>
      <div className="flex-30">{children}</div>
      <div className="flex-10">{Button}</div>
    </div>
  );
}
