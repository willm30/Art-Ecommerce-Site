import React from "react";
import ListItem from "./list-item";
import { graphql, Link, useStaticQuery } from "gatsby";
import { pathNameToPageName } from "../../utilities/strings";
import { getDirectories } from "../../utilities/graphQL";
import ShoppingCartButton from "../../icons/cart";
import Logo from "../logo/logo";

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
  return (
    <ul className="flex flex-100 flex-row items-center justify-around text-center">
      <Link
        to="/"
        className="hidden sm:flex sm:flex-15 sm:justify-evenly sm:items-center"
      >
        <h1>Purple Orchard</h1>
        <Logo />
      </Link>
      <div className="flex flex-85 justify-evenly">
        {getDirectories(pages).map((dir) => {
          const pageName = pathNameToPageName(dir);
          return (
            <ListItem
              key={dir}
              text={pageName}
              to={dir}
              hover="hover:text-white"
            />
          );
        })}
        <ShoppingCartButton />
      </div>
    </ul>
  );
}
