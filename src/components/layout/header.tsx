import { Link } from "gatsby";
import React from "react";
import Logo from "../logo/logo";
import NavMenu from "../navigation/nav-menu";

export default function Header() {
  return (
    <header className="flex flex-100 bg-gray-300 text-md md:text-xl font-secular row-start-1 col-span-full max-h-16 justify-evenly">
      <NavMenu />
    </header>
  );
}
