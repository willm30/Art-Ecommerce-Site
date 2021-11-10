import { Link } from "gatsby";
import React, { useState } from "react";
import ShoppingCartButton from "../../icons/cart";
import Cross from "../../icons/cross";
import Hamburger from "../../icons/hamburger";
import NavMenu from "../navigation/nav-menu";
import AniLink from "gatsby-plugin-transition-link/AniLink";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  function handleMenuOpen() {
    console.log("Menu left changing!");
    return menuOpen ? "left-0" : "-left-1/2";
  }

  return (
    <header className="relative flex flex-100 text-md row-start-1 col-span-full h-16 justify-evenly">
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="flex-5 flex justify-center items-center"
      >
        {menuOpen ? <Cross /> : <Hamburger />}
      </button>
      <Link
        to="/"
        className="font-copperplate md:text-4xl flex-90 flex justify-center items-center"
      >
        <h1>Purple Orchard</h1>
      </Link>
      <NavMenu handleMenuOpen={handleMenuOpen} />
      <div className="flex justify-center items-center flex-5">
        <ShoppingCartButton />
      </div>
    </header>
  );
}
