import { Link } from "gatsby";
import React, { useContext, useState } from "react";
import { CartContext } from "../../context/CartContext";
import ShoppingCartIcon from "../../icons/cartIcon";
import CartItem, { CartItemShape } from "./cartItem";
import CartItemMini from "./cartItemMini";

export default function Cart({ isMini }) {
  const [cart]: [CartItemShape[], (newCart: CartItemShape[]) => void] =
    useContext(CartContext);
  const [isCardVisible, setIsCardVisible] = useState(false);

  function handleMouseEnter() {
    setIsCardVisible(true);
  }

  function handleMouseLeave() {
    setIsCardVisible(false);
  }
  return (
    <div className="relative mt-1.5">
      <Link
        to="/collection"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <ShoppingCartIcon />
      </Link>
      <div
        className={`absolute top-0 right-10 w-96 bg-gray-100 p-2 border-gray-200 shadow-inner border-8 font-poppins ${
          isCardVisible ? "" : "hidden"
        }`}
        onMouseLeave={() => setIsCardVisible(false)}
        onMouseEnter={() => setIsCardVisible(true)}
      >
        <Link to="/collection" className="hover:underline">
          <h3 className="mb-2">Your Collection</h3>
        </Link>
        <div className="text-sm">
          {cart.length ? (
            <ul className="flex flex-col">
              {cart?.map((item, i) =>
                isMini ? (
                  <CartItemMini
                    title={item.title}
                    quantity={item.quantity}
                    type={item.productName}
                    image={item.image}
                    price={item.price}
                    slug={item.slug}
                    alt={item.alt}
                    key={`${item.title}${i}`}
                    handleMouseEnter={handleMouseEnter}
                  />
                ) : (
                  <CartItem
                    title={item.title}
                    quantity={item.quantity}
                    type={item.productName}
                    image={item.image}
                    price={item.price}
                    alt={item.alt}
                    key={`${item.title}${i}`}
                  />
                )
              )}
            </ul>
          ) : (
            <p>
              Your collection is currently empty.{" "}
              <Link to="/art" className="hover:underline">
                Click here to view the latest artwork.
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

/*
const pointer =
  "after:block after:border-[12px] after:border-transparent after:border-l-gray-200 after:-top-2 after:left-[23.5rem] after:absolute";
*/
