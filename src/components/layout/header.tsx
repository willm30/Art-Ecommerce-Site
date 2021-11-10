import { Link } from "gatsby";
import React, { useState } from "react";
import Cross from "../../icons/cross";
import Hamburger from "../../icons/hamburger";
import NavMenu from "../navigation/nav-menu";
import ShoppingCartIcon from "../../icons/cartIcon";
import ShoppingCartMini from "../cart/shoppingCartMini";

export default function Header() {
  const [navMenuOpen, setNavMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [allowMouseEnter, setAllowMouseEnter] = useState(true);

  function handleNavMenuOpen() {
    return navMenuOpen ? "left-0" : "-left-1/2";
  }

  function handleCartOpen() {
    return cartOpen ? "right-0" : "-right-1/2";
  }

  function handleClick() {
    setNavMenuOpen(!navMenuOpen);
    setAllowMouseEnter(false);
    setTimeout(() => setAllowMouseEnter(true), 0);
  }

  function handleMouseEnter() {
    if (allowMouseEnter) {
      setNavMenuOpen(!navMenuOpen);
    }
  }

  return (
    <header className="relative flex flex-100 row-start-1 col-span-full h-[10vh] justify-evenly">
      <button
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        className="flex-5 flex justify-center items-center"
      >
        {navMenuOpen ? <Cross /> : <Hamburger />}
      </button>
      <Link
        to="/"
        className="font-copperplate text-md md:text-4xl flex-90 flex justify-center items-center"
      >
        <h1>Purple Orchard</h1>
      </Link>
      <NavMenu
        handleMenuOpen={handleNavMenuOpen}
        handleLeave={setNavMenuOpen}
      />
      <button
        className="flex justify-center items-center flex-5"
        onMouseEnter={() => setCartOpen(!cartOpen)}
        onClick={() => setCartOpen(!cartOpen)}
      >
        <ShoppingCartIcon />
      </button>
      <ShoppingCartMini
        handleCartOpen={handleCartOpen}
        setCartOpen={setCartOpen}
      />
    </header>
  );
}
