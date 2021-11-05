import React from "react";

export default function IndDesc({
  name,
  des,
  Button,
  children,
}: {
  name: string;
  des: string;
  Button: JSX.Element;
  children: React.ReactElement | React.ReactElement[];
}) {
  return (
    <div className="flex flex-col flex-40 text-center font-poppins">
      <h2 className="my-2 sm:my-4 flex items-center justify-center flex-10 text-2xl md:text-3xl font-secular">
        {name}
      </h2>
      <div className="my-2 sm:my-4 flex-50 justify-center flex flex-col sm:px-4 md:px-16">
        <p>{des ? des : "No description available."}</p>
      </div>
      <div className="my-2 sm:hidden md:block md:my-4 flex-30">{children}</div>
      <div className="my-4 flex-10">{Button}</div>
    </div>
  );
}
