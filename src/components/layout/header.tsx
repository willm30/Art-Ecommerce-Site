import { Link } from "gatsby";
import React, { useEffect, useRef, useState } from "react";
import Cross from "../../icons/cross";
import Hamburger from "../../icons/hamburger";
import NavMenu from "../navigation/nav-menu";
import ShoppingCartIcon from "../../icons/cartIcon";
import ShoppingCartMini from "../cart/shoppingCartMini";
import { getHeaderAnimation } from "../../animations/header";
import { getNavAnimation } from "../../animations/nav";
import { getCartAnimation } from "../../animations/cart";
import AllPictures from "../../icons/all-pictures";

export default function Header({ location }) {
  const [cartOpen, setCartOpen] = useState(false);
  const [navMenuOpen, setNavMenuOpen] = useState(false);
  const [display, setDisplay] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const translateY = isMobile
    ? ""
    : location.pathname == "/"
    ? "-translate-y-full"
    : "";
  const headerTranslation = useRef(null);
  const navAnimation = useRef(null);
  const cartAnimation = useRef(null);

  useEffect(() => {
    if (window.innerWidth < 668) {
      setIsMobile(true);
      //window.addEventListener("scroll", handleMobileScroll, true);
    } else {
      window.addEventListener("scroll", handleScroll, true);
    }
    const header = document.getElementById("header");
    headerTranslation.current = getHeaderAnimation(header);
    const nav = document.getElementById("nav");
    navAnimation.current = getNavAnimation(nav);
    const cart = document.getElementById("cart");
    cartAnimation.current = getCartAnimation(cart);
    return () => {
      window.removeEventListener("scroll", handleScroll, true);
      window.removeEventListener("scroll", handleMobileScroll, true);
    };
  }, []);

  function handleScroll() {
    if (location.pathname == "/") {
      const scrollTop = window.scrollY;
      const headerY = headerTranslation.current;
      if (scrollTop > 150) {
        headerY.play();
      } else {
        headerY.reverse();
        navAnimation.current.reverse();
        cartAnimation.current.reverse();
        setNavMenuOpen(false);
        setCartOpen(false);
      }
    }
  }

  function handleMobileScroll() {
    if (!display) {
      console.log("fixing display");
      setDisplay("fixed");
    }
  }

  function toggleNav() {
    setNavMenuOpen(!navMenuOpen);
    if (!navAnimation.current.isActive()) {
      if (navMenuOpen) {
        navAnimation.current.reverse();
      } else {
        navAnimation.current.play();
      }
    }
  }

  function toggleCart() {
    setCartOpen(!cartOpen);
    if (!cartAnimation.current.isActive()) {
      if (cartOpen) {
        cartAnimation.current.reverse();
      } else {
        cartAnimation.current.play();
      }
    }
  }

  const styles = {
    desktop: {
      header: `fixed ${translateY} flex flex-100 row-start-1 w-screen min-h-[80px] h-[10vh] justify-evenly z-30 bg-white shadow-md`,
      hamburger: "flex-5 flex justify-center items-center md:pl-0 md:mr-4",
      cart: "flex justify-center items-center flex-5",
      allPics: "flex justify-center items-center",
    },
    mobile: {
      header: `${display}`,
      hamburger: "pl-2",
      cart: "pr-4",
    },
  };

  return (
    <header
      id="header"
      className={`${styles.desktop.header} ${styles.mobile.header}`}
    >
      <button
        onClick={toggleNav}
        className={`${styles.desktop.hamburger} ${styles.mobile.hamburger}`}
      >
        {navMenuOpen ? <Cross /> : <Hamburger />}
      </button>
      {!isMobile && (
        <Link to="/art" className={`${styles.desktop.allPics}`}>
          <AllPictures />
        </Link>
      )}
      <Link
        to="/"
        className="font-copperplate text-2xl md:text-4xl flex-90 flex justify-center items-center"
      >
        <h1>Purple Orchard</h1>
      </Link>
      <NavMenu />
      <button
        className={`${styles.desktop.cart} ${styles.mobile.cart}`}
        onClick={toggleCart}
      >
        <ShoppingCartIcon />
      </button>
      <ShoppingCartMini />
    </header>
  );
}
