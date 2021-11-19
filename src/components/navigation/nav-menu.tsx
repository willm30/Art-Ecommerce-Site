import React from "react";
import ListItem from "./list-item";
import { graphql, useStaticQuery } from "gatsby";
import { pathNameToPageName } from "../../utilities/strings";
import { getDirectories } from "../../utilities/graphQL";

export default function NavMenu({ navMenuOpen, handleLeave }) {
  const menuLeftPosition = navMenuOpen
    ? {
        transform: "translateX(-100%)",
        transitionProperty: "transform",
        transitionDuration: "700ms",
        transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
        willChange: "transform",
      }
    : {
        transform: "translateX(-200%)",
        transitionProperty: "transform",
        transitionDuration: "700ms",
        transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
        willChange: "transform",
      };
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
      className={`absolute top-[4.7rem] border-t-4 border-t-gray-100 flex flex-col justify-around items-stretch w-1/3 h-[90vh] bg-white z-50`}
      style={menuLeftPosition}
    >
      {getDirectories(pages).map((dir) => {
        const pageName = pathNameToPageName(dir);
        return <ListItem key={dir} text={pageName} to={dir} />;
      })}
    </ul>
  );
}
