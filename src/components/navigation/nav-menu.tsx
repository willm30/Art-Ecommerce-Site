import React from "react";
import ListItem from "./list-item";
import Logo from "../logo/logo";
import { graphql, useStaticQuery } from "gatsby";
import { capitalizeFirstLetter } from "../../utilities/strings";
import { getDirectories } from "../../utilities/graphQL";

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
    <div className="flex filter drop-shadow bg-gray-300 text-md font-secular col-start-1 col-end-7">
      <header className="flex flex-100 items-center">
        <Logo></Logo>
        <ul className="flex flex-100 flex-row justify-evenly text-center">
          {getDirectories(pages).map((dir) => {
            const capitalized = capitalizeFirstLetter(dir);
            return (
              <ListItem text={capitalized} to={dir} hover="hover:text-white" />
            );
          })}
          <h1 className="text-right">Lovely Fart Art</h1>
          <div className="flex justify-center">
            <button className="border-2 px-4">B</button>
          </div>
        </ul>
      </header>
    </div>
  );
}
