import gsap from "gsap";

export function getHeaderAnimation(header) {
  return gsap.to(header, {
    y: "0",
    duration: 0.5,
    ease: "ease",
    paused: true,
  });
}
