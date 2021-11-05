import { Link } from "gatsby";
import React from "react";
import Logo from "../logo/logo";
import NavMenu from "../navigation/nav-menu";

export default function Header() {
  return (
    <div className="flex bg-gray-300 text-md md:text-xl font-secular row-start-1 col-span-full max-h-16">
      <header className="flex flex-100">
        <Logo flexBasis="flex-10 sm:flex-20" />
        <NavMenu flexBasis="flex-90 sm:flex-60" />
        <h1 className="hidden sm:flex sm:flex-20 sm:items-center sm:justify-center">
          <Link to="/">Lovely Fart Art</Link>
        </h1>
      </header>
    </div>
  );
}
