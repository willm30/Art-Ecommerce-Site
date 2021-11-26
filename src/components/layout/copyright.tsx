import React from "react";

export default function Copyright({ layout }: { layout: string }) {
  return (
    <div
      className={`${layout} col-span-full row-start-3 flex justify-center items-center font-poppins text-lg`}
    >
      <span>Copyright © Purple Orchard Art. 2021 All Rights Reserved.</span>
    </div>
  );
}
