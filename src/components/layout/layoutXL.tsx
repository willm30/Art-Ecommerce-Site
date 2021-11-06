import { Link } from "gatsby";
import React from "react";
import { getParentFromXLPath } from "../../utilities/strings";
import Seo from "../seo/seo";
import Header from "./header";

export default function LayoutXL({
  children,
  title,
  orientation,
  location,
}: {
  children: React.ReactElement | React.ReactElement[];
  title: string;
  orientation: "Portrait" | "Landscape";
  location: { pathname: string };
}) {
  const landscapeContainerMargin = "my-24";
  const portraitContainerMargin = "my-6";

  const path = getParentFromXLPath(location.pathname);

  const landscapeCols = "grid-cols-8";
  const portraitCols = "grid-cols-6";
  const landscapeColEnd = "col-end-8";
  const portraitColEnd = "col-end-6";
  return (
    <div
      className={`grid gap-8 ${
        orientation == "Portrait" ? portraitCols : landscapeCols
      } grid-rows-feature h-screen`}
    >
      <Seo title={title} />
      <Header></Header>
      <Link
        to={path}
        className="bg-gray-400 w-full h-full row-span-full col-span-full bg-opacity-75"
        id="GreyZone"
      ></Link>
      <div
        className={`col-start-2 ${
          orientation == "Portrait" ? portraitColEnd : landscapeColEnd
        } max-w-screen-md row-span-full ${
          orientation == "Portrait"
            ? portraitContainerMargin
            : landscapeContainerMargin
        }`}
      >
        {children}
      </div>
    </div>
  );
}
