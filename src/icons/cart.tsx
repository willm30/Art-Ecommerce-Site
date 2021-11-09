import { Link } from "gatsby";
import React from "react";
import { useContext } from "react";
import { useState } from "react";
import Cart from "../components/cart/cart";
import { CartContext } from "../context/CartContext";

export default function ShoppingCartButton() {
  const [cart]: any[] = useContext(CartContext);
  const [hover, setHover] = useState(false);
  const [isCardVisible, setIsCardVisible] = useState(false);

  function reduceCartQuantity(cart: any[]): number {
    return cart.reduce((prev, current) => prev + current.quantity, 0);
  }

  function handleMouseEnter() {
    setHover(true);
    setIsCardVisible(true);
  }

  function handleMouseLeave() {
    setHover(false);
    setIsCardVisible(false);
  }

  return (
    <div className="relative mt-1.5">
      <Link
        to="/collection"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <button className="flex flex-col w-8">
          <div
            className={`absolute -top-3.5 -right-1 rounded-full w-5 h-5 text-xs flex items-center justify-center border-2 self-end ${
              hover ? "border-white text-white" : "border-black"
            }`}
          >
            <span className="pt-0.5">{reduceCartQuantity(cart)}</span>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              d="M4.558 7l4.701-4.702c.199-.198.46-.298.721-.298.613 0 1.02.505 1.02 1.029 0 .25-.092.504-.299.711l-3.26 3.26h-2.883zm12.001 0h2.883l-4.701-4.702c-.199-.198-.46-.298-.721-.298-.613 0-1.02.505-1.02 1.029 0 .25.092.504.299.711l3.26 3.26zm3.703 4l-.016.041-3.598 8.959h-9.296l-3.597-8.961-.016-.039h16.523zm3.738-2h-24v2h.643c.534 0 1.021.304 1.256.784l4.101 10.216h12l4.102-10.214c.233-.481.722-.786 1.256-.786h.642v-2z"
              className={`fill-current ${hover ? "text-white" : ""}`}
            />
          </svg>
        </button>
      </Link>
      <div
        className={`absolute top-11 -left-32 w-72 bg-gray-100 p-2 border-gray-200 shadow-inner border-8 after:block after:border-[12px] after:border-transparent after:border-b-gray-200 after:-top-8 after:left-[7.5rem] after:absolute ${
          isCardVisible ? "" : "hidden"
        }`}
        onMouseLeave={() => setIsCardVisible(false)}
        onMouseEnter={() => setIsCardVisible(true)}
      >
        <Link to="/collection" className="hover:underline">
          <h3 className="mb-2">Your Collection</h3>
        </Link>
        <div className="text-sm">
          <Cart cart={cart} isMini={true} handleMouseEnter={setIsCardVisible} />
        </div>
      </div>
    </div>
  );
}
