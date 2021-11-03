import React from "react";
import ListItem from "./list-item";
import { graphql, useStaticQuery } from "gatsby";
import { pathNameToPageName } from "../../utilities/strings";
import { getDirectories } from "../../utilities/graphQL";
import ShoppingCart from "../../icons/cart";

export default function NavMenu({ flexBasis }: { flexBasis: string }) {
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
      className={`flex ${flexBasis} flex-row justify-evenly items-center text-center`}
    >
      {getDirectories(pages).map((dir) => {
        const pageName = pathNameToPageName(dir);
        return <ListItem text={pageName} to={dir} hover="hover:text-white" />;
      })}
      <button className="">
        <ShoppingCart />
      </button>
    </ul>
  );
}
