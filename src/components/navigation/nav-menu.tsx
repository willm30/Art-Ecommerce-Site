import React from "react";
import ListItem from "./list-item";
import Logo from "../logo/logo";

export default function NavMenu() {
  return (
    <div className="flex bg-gradient-to-l from-gray-300 to-gray-200 text-md font-secular col-start-1 col-end-7">
      <header className="flex flex-100 items-center">
        <Logo></Logo>
        <ul className="flex flex-100 flex-row justify-evenly text-center">
          <ListItem text="Art" to=""></ListItem>
          <ListItem text="Artists" to=""></ListItem>
          <ListItem text="About" to=""></ListItem>
          <ListItem text="Contact" to=""></ListItem>
          <ListItem text="For Sale" to=""></ListItem>
          <h1 className="text-right">Lovely Fart Art</h1>
          <div className="flex justify-center">
            <button className="border-2 px-4">B</button>
          </div>
        </ul>
      </header>
    </div>
  );
}
