import React from "react";
import ListItem from "./list-item";
import { graphql, useStaticQuery } from "gatsby";
import { pathNameToPageName } from "../../utilities/strings";
import { getDirectories } from "../../utilities/graphQL";

export default function NavMenu({ handleMenuOpen, handleLeave }) {
  const menuLeftPosition = handleMenuOpen();
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
  return (
    <ul
      className={`absolute top-20 transition-left ${menuLeftPosition} duration-1000 border-4 border-transparent border-t-gray-100 flex flex-col justify-around items-stretch w-1/3 h-[90vh] bg-white z-50`}
      onMouseLeave={() => handleLeave(false)}
    >
      {getDirectories(pages).map((dir) => {
        const pageName = pathNameToPageName(dir);
        return <ListItem key={dir} text={pageName} to={dir} />;
      })}
    </ul>
  );
}
