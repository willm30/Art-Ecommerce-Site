export function incrementQuantity(cart, itemToIncrement) {
  return cart.map((item) => {
    if (item === itemToIncrement) {
      const newObj = Object.assign({}, itemToIncrement);
      newObj.quantity += 1;
      return newObj;
    }
    return item;
  });
}

export function decrementQuantity(cart, itemToDecrement) {
  return cart.map((item) => {
    if (item === itemToDecrement && itemToDecrement.quantity > 0) {
      const newObj = Object.assign({}, itemToDecrement);
      newObj.quantity -= 1;
      return newObj;
    }
    return item;
  });
}
