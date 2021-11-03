import React from "react";

export default function DescWrapper({
  name,
  des,
  flexBasis,
  Button,
  headingSize,
}) {
  return (
    <div className={`flex flex-col ${flexBasis} text-center font-poppins`}>
      <h2 className={`flex-10 ${headingSize}`}>{name}</h2>
      <div className="flex-80 justify-center flex flex-col px-16">
        <p>{des ? des : "No description available."}</p>
      </div>
      <div className="flex-10">{Button}</div>
    </div>
  );
}
