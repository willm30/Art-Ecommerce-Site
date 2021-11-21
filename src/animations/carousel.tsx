import gsap from "gsap";
import {
  getMaxX,
  getMinX,
  isFirstOffLeft,
  isFirstOffRight,
  isInViewport,
} from "../utilities/carousel";

export function getDownArrowScrollAnimation(arrow) {
  return gsap.to(arrow, {
    opacity: "0",
    duration: 0.33,
    ease: "linear",
    paused: true,
  });
}

export function invalidateAndRestart(
  tweens: gsap.core.Tween | gsap.core.Tween[]
) {
  const t = Array.isArray(tweens) ? tweens : [tweens];
  t.forEach((t) => {
    t.invalidate();
    t.restart();
  });
}

export function getLeftAnimation(slides) {
  return {
    active: gsap.to(slides, {
      xPercent: function (i, t, all) {
        const activeSlides = all.filter((s) => {
          const rect = s.getBoundingClientRect();
          return (
            isInViewport(s, rect.width / 4) || isFirstOffLeft(s, rect.width / 4)
          );
        });
        if (activeSlides.some((acs) => acs == t)) return "+=100";
      },
      paused: true,
      duration: 1.2,
    }),
    unactive: gsap.set(slides, {
      xPercent: function (i, t, all) {
        const unactiveSlides = all.filter((s) => {
          const rect = s.getBoundingClientRect();
          return (
            !isInViewport(s, rect.width / 4) &&
            !isFirstOffLeft(s, rect.width / 4)
          );
        });

        if (unactiveSlides.some((nas) => nas == t)) {
          const maxX = getMaxX(all);
          if (maxX.i == i) return `-=${(slides.length - 1) * 100}`;
          return "+=100";
        }
      },
      paused: true,
    }),
  };
}

export function getRightAnimation(slides) {
  return {
    active: gsap.to(slides, {
      xPercent: function (i, t, all) {
        const activeSlides = all.filter((s) => {
          const rect = s.getBoundingClientRect();
          return (
            isInViewport(s, rect.width / 4) ||
            isFirstOffRight(s, rect.width / 4)
          );
        });
        if (activeSlides.some((acs) => acs == t)) return "-=100";
      },
      paused: true,
      duration: 1.2,
    }),
    unactive: gsap.set(slides, {
      xPercent: function (i, t, all) {
        const unactiveSlides = all.filter((s) => {
          const rect = s.getBoundingClientRect();
          return (
            !isInViewport(s, rect.width / 4) &&
            !isFirstOffRight(s, rect.width / 4)
          );
        });

        if (unactiveSlides.some((nas) => nas == t)) {
          const minX = getMinX(all);
          if (minX.i == i) return `+=${(slides.length - 1) * 100}`;
          return "-=100";
        }
      },
      paused: true,
    }),
  };
}
