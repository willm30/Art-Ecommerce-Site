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
        artist: itemToIncrement.artist,
        canvasType: itemToIncrement.canvasType,
        mediaType: itemToIncrement.mediaType,
      };
    }
    return item;
  });
}

export function decrementQuantity(cart, itemToDecrement) {
  return cart.map((item) => {
    if (item === itemToDecrement && itemToDecrement.quantity > 0) {
      return {
        productName: itemToDecrement.productName,
        price: itemToDecrement.price,
        title: itemToDecrement.title,
        image: itemToDecrement.image,
        alt: itemToDecrement.alt,
        quantity: itemToDecrement.quantity - 1,
        artist: itemToDecrement.artist,
        canvasType: itemToDecrement.canvasType,
        mediaType: itemToDecrement.mediaType,
      };
    }
    return item;
  });
}
