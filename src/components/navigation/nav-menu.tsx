import React from "react";
import ListItem from "./list-item";
import { graphql, useStaticQuery } from "gatsby";
import { pathNameToPageName } from "../../utilities/strings";
import { getDirectories, orderNavMenuItems } from "../../utilities/graphQL";

export default function NavMenu() {
  const data = useStaticQuery(graphql`
    query RootPages {
      allFile {
        edges {
          node {
            relativeDirectory
          }
        }
      }
    }
  `);
  const pages = data.allFile.edges;
  const styles = {
    desktop:
      "absolute -translate-x-full left-0 md:top-[4.7rem] border-t-4 border-t-gray-100 flex flex-col justify-around items-stretch md:w-1/3 h-[90vh] bg-white z-50",
    mobile: "top-[4.1rem] w-screen",
  };
  return (
    <ul id="nav" className={`${styles.desktop} ${styles.mobile}`}>
      {orderNavMenuItems(pages).map((dir) => {
        let to = dir;
        if (dir == "series") to = `art/series`;
        if (dir == "contact") to = `#contact`;
        const pageName = pathNameToPageName(dir);
        return <ListItem key={dir} text={pageName} to={to} />;
      })}
    </ul>
  );
}
