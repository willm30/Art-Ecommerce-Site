import React from "react";
import Logo from "../logo/logo";
import NavMenu from "../navigation/nav-menu";

export default function Header() {
  return (
    <div className="flex  bg-gray-300 text-md font-secular col-start-1 col-end-7">
      <header className="flex flex-100">
        <Logo flexBasis="flex-20" />
        <NavMenu flexBasis="flex-60" />
        <h1 className="flex-20 flex items-center justify-center">
          Lovely Fart Art
        </h1>
      </header>
    </div>
  );
}
