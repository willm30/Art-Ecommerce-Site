import React from "react";
import Logo from "../logo/logo";
import NavMenu from "../navigation/nav-menu";

export default function Header() {
  return (
    <div className="flex filter drop-shadow bg-gray-300 text-md font-secular col-start-1 col-end-7">
      <header className="flex flex-100 items-center">
        <Logo flexBasis="flex-10" />
        <NavMenu flexBasis="flex-80" />
        <h1 className="flex-10 text-centre">Lovely Fart Art</h1>
      </header>
    </div>
  );
}
