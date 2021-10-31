import React from "react";
import ListItem from "./list-item";

export default function NavMenu() {
  return (
    <nav className="w-1/4 bg-gradient-to-br from-gray-300 via-gray-200 to-white h-screen flex flex-initial flex-col flex-nowrap items-center justify-center font-poppins text-xl">
      <ul className="flex flex-initial flex-col flex-nowrap items-center">
        <ListItem text="Home" to=""></ListItem>
      </ul>
    </nav>
  );
}
