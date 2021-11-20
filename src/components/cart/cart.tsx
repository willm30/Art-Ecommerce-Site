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
    <div className="mt-1.5 font-poppins">
      <div className="text-sm">
        {cart.length ? (
          <ul className="flex flex-col">
            {cart?.map((item, i) => (
              <div key={`${item.title}${i}`}>
                <hr />
                <CartItem
                  title={item.title}
                  quantity={item.quantity}
                  type={item.productName}
                  image={item.image}
                  price={item.price}
                  alt={item.alt}
                  artist={item.artist}
                />
                <hr />
              </div>
            ))}
          </ul>
        ) : (
          <p className="font-poppins text-xl">
            Your collection is currently empty.{" "}
            <Link to="/art" className="hover:underline">
              Click here to view the latest artwork.
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}

/*
const pointer =
  "after:block after:border-[12px] after:border-transparent after:border-l-gray-200 after:-top-2 after:left-[23.5rem] after:absolute";
*/
