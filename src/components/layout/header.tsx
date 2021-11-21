import { Link } from "gatsby";
import React, { useEffect, useRef, useState } from "react";
import Cross from "../../icons/cross";
import Hamburger from "../../icons/hamburger";
import NavMenu from "../navigation/nav-menu";
import ShoppingCartIcon from "../../icons/cartIcon";
import ShoppingCartMini from "../cart/shoppingCartMini";
import { getHeaderAnimation } from "../../animations/header";

export default function Header({ location, isMobile }) {
  const [navMenuOpen, setNavMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const translateY = isMobile
    ? ""
    : location.pathname == "/"
    ? "-translate-y-20"
    : "";
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

  const styles = {
    desktop: {
      header: `fixed ${translateY} flex flex-100 row-start-1 w-screen h-[10vh] justify-evenly z-20 bg-white`,
      hamburger: "flex-5 flex justify-center items-center md:pl-0",
      cart: "flex justify-center items-center flex-5 md:pr-0",
    },
    mobile: {
      hamburger: "pl-2",
      cart: "pr-4",
    },
  };

  return (
    <header id="header" className={styles.desktop.header}>
      <button
        onClick={() => setNavMenuOpen(!navMenuOpen)}
        className={`${styles.desktop.hamburger} ${styles.mobile.hamburger}`}
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
        className={`${styles.desktop.cart} ${styles.mobile.cart}`}
        onClick={() => setCartOpen(!cartOpen)}
      >
        <ShoppingCartIcon />
      </button>
      <ShoppingCartMini cartOpen={cartOpen} />
    </header>
  );
}
