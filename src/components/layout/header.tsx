import { Link } from "gatsby";
import React, { useEffect, useState } from "react";
import Cross from "../../icons/cross";
import Hamburger from "../../icons/hamburger";
import NavMenu from "../navigation/nav-menu";
import ShoppingCartIcon from "../../icons/cartIcon";
import ShoppingCartMini from "../cart/shoppingCartMini";

export default function Header() {
  const [navMenuOpen, setNavMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [allowMouseEnter, setAllowMouseEnter] = useState(true);
  const [descOpen, setDescOpen] = useState(false);
  const [headerStyle, setHeaderStyle] = useState({});
  const [url, setUrl] = useState(undefined);
  const path = url.match(/\/\w*$/) ? url.match(/\/\w*$/)[0] : "";
  const translateY = path == "" ? "-translate-y-20" : "";
  function handleScroll() {
    const scrollTop = document.querySelector(".tl-edges").scrollTop;
    if (scrollTop > 150) {
      setHeaderStyle({
        transform: "translateY(0px)",
        transitionProperty: "transform",
        transitionDuration: "700ms",
        transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
        willChange: "transform",
      });
    }
  }

  useEffect(() => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    setUrl(url);
    window.addEventListener("scroll", handleScroll, true);

    return () => {
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, []);

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

  function handleCartOpen() {
    setCartOpen(!cartOpen);
    if (descOpen) setDescOpen(false);
  }

  return (
    <header
      id="header"
      className={`fixed ${translateY} flex flex-100 row-start-1 w-screen h-[10vh] justify-evenly z-20 bg-white`}
      style={headerStyle}
    >
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
      <NavMenu navMenuOpen={navMenuOpen} handleLeave={setNavMenuOpen} />
      <button
        className="flex justify-center items-center flex-5"
        onMouseEnter={handleCartOpen}
        onClick={handleCartOpen}
      >
        <ShoppingCartIcon />
      </button>
      <ShoppingCartMini
        cartOpen={cartOpen}
        setCartOpen={setCartOpen}
        descOpen={descOpen}
        setDescOpen={setDescOpen}
      />
    </header>
  );
}
