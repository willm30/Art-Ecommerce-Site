export function incrementQuantity(cart, itemToIncrement) {
  return cart.map((item) => {
    if (item === itemToIncrement) {
      return {
        productName: itemToIncrement.productName,
        price: itemToIncrement.price,
        title: itemToIncrement.title,
        image: itemToIncrement.image,
        alt: itemToIncrement.alt,
        quantity: itemToIncrement.quantity + 1,
      };
    }
    return item;
  });
}

export function decrementQuantity(cart, itemToIncrement) {
  return cart.map((item) => {
    if (item === itemToIncrement && itemToIncrement.quantity > 0) {
      return {
        productName: itemToIncrement.productName,
        price: itemToIncrement.price,
        title: itemToIncrement.title,
        image: itemToIncrement.image,
        alt: itemToIncrement.alt,
        quantity: itemToIncrement.quantity - 1,
      };
    }
    return item;
  });
}
