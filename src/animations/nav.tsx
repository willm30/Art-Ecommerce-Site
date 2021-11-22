import gsap from "gsap";

export function getNavAnimation(nav) {
  return gsap.to(nav, {
    xPercent: 0,
    duration: 0.7,
    paused: true,
  });
}

export function setNavInitial(nav) {
  return gsap.set(nav, {
    xPercent: -100,
  });
}

export function getNavLiTextAnimation(navLiText) {
  return {
    forward: gsap.to(navLiText, {
      color: "white",
      paddingLeft: "2.5rem",
      duration: 0.7,
      paused: true,
    }),
    backward: gsap.to(navLiText, {
      color: "black",
      paddingLeft: "1.5rem",
      duration: 0.7,
      ease: "power3.out",
      paused: true,
    }),
    set: gsap.set(navLiText, {
      color: "white",
      paused: true,
    }),
  };
}

export function getNavLiUnderlineAnimation(navLiUnderline, width) {
  return {
    forward: gsap.to(navLiUnderline, {
      width,
      marginLeft: "2.5rem",
      borderColor: "white",
      backgroundColor: "white",
      duration: 0.7,
      paused: true,
    }),
    backward: gsap.to(navLiUnderline, {
      width: "0px",
      marginLeft: "1.5rem",
      borderColor: "black",
      backgroundColor: "black",
      duration: 0.7,
      ease: "power3.out",
      paused: true,
    }),
    set: gsap.set(navLiUnderline, {
      width,
      borderColor: "white",
      backgroundColor: "white",
      paused: true,
    }),
  };
}

export function getNavLiBgAnimation(navLiBg, width) {
  return {
    forward: gsap.to(navLiBg, {
      width,
      duration: 0.7,
      paused: true,
    }),
    backward: gsap.to(navLiBg, {
      width: "0px",
      duration: 0.7,
      ease: "power3.out",
      paused: true,
    }),
    set: gsap.set(navLiBg, {
      width,
      paused: true,
    }),
  };
}
