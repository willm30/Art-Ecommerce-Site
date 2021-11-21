import { Link } from "gatsby";
import React, { useEffect, useRef, useState } from "react";
import Cross from "../../icons/cross";
import Hamburger from "../../icons/hamburger";
import NavMenu from "../navigation/nav-menu";
import ShoppingCartIcon from "../../icons/cartIcon";
import ShoppingCartMini from "../cart/shoppingCartMini";
import { getHeaderAnimation } from "../../animations/header";

export default function Header({ location }) {
  const [navMenuOpen, setNavMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const translateY = location.pathname == "/" ? "-translate-y-20" : "";
  const headerTranslation = useRef(null);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, true);
    const header = document.getElementById("header");
    headerTranslation.current = getHeaderAnimation(header);
    return () => {
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, []);

  function handleScroll() {
    const scrollTop = document.querySelector(".tl-edges").scrollTop;
    const headerY = headerTranslation.current;
    if (scrollTop > 150) {
      headerY.play();
    } else {
      headerY.reverse();
    }
  }

  return (
    <header
      id="header"
      className={`fixed ${translateY} flex flex-100 row-start-1 w-screen h-[10vh] justify-evenly z-20 bg-white`}
    >
      <button
        onClick={() => setNavMenuOpen(!navMenuOpen)}
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
      <NavMenu navMenuOpen={navMenuOpen} handleLeave={setNavMenuOpen} />
      <button
        className="flex justify-center items-center flex-5"
        onClick={() => setCartOpen(!cartOpen)}
      >
        <ShoppingCartIcon />
      </button>
      <ShoppingCartMini cartOpen={cartOpen} />
    </header>
  );
}
