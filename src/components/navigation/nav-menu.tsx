import React from "react";
import ListItem from "./list-item";
import Logo from "../logo/logo";

export default function NavMenu() {
  return (
    <div className="flex flex-col bg-gradient-to-br from-gray-300 via-gray-200 to-white col-span-1 row-span-6 h-screen">
      <Logo></Logo>
      <nav className="flex flex-nav font-poppins text-xl justify-center">
        <ul className="flex flex-auto flex-col justify-evenly text-center">
          <ListItem text="Art" to=""></ListItem>
          <ListItem text="Artists" to=""></ListItem>
          <ListItem text="About" to=""></ListItem>
          <ListItem text="Contact" to=""></ListItem>
          <ListItem text="For Sale" to=""></ListItem>
        </ul>
      </nav>
    </div>
  );
}
