import { Link } from "gatsby";
import React, { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { CartItemShape } from "./cartItem";
import CartItemMini from "./cartItemMini";

export default function ShoppingCartMini({ handleCartOpen, setCartOpen }) {
  const [cart]: [CartItemShape[], (newCart: CartItemShape[]) => void] =
    useContext(CartContext);

  const menuRightPosition = handleCartOpen();

  return (
    <div
      className={`absolute top-20 transition-right ${menuRightPosition} duration-1000 border-4 border-transparent border-t-gray-100 w-1/3 h-[90vh] bg-white z-50`}
      onMouseLeave={() => setCartOpen(false)}
    >
      <Link
        to="/collection"
        className="hover:underline flex justify-center items-center"
      >
        <h3 className="my-2 text-2xl font-ogirema">Your Collection</h3>
      </Link>
      {cart.length ? (
        <ul className="flex flex-col">
          {cart?.map((item, i) => (
            <CartItemMini
              title={item.title}
              quantity={item.quantity}
              type={item.productName}
              image={item.image}
              price={item.price}
              slug={item.slug}
              alt={item.alt}
              key={`${item.title}${i}`}
              setCartOpen={setCartOpen}
            />
          ))}
        </ul>
      ) : (
        <p className="font-poppins flex justify-center items-center pl-6">
          <span>
            Your collection is currently empty.{" "}
            <Link to="/art" className="hover:underline">
              Click here to view the latest artwork.
            </Link>
          </span>
        </p>
      )}
    </div>
  );
}

/*
const pointer =
  "after:block after:border-[12px] after:border-transparent after:border-l-gray-200 after:-top-2 after:left-[23.5rem] after:absolute";
*/
