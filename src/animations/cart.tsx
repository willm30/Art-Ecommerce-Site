import gsap from "gsap";

export function getCartAnimation(cart) {
  return gsap.to(cart, {
    xPercent: -100,
    duration: 0.7,
    paused: true,
  });
}

export function setCartInitial(cart) {
  return gsap.set(cart, {
    xPercent: 100,
  });
}
