function getNumberFromPositionString(positionString: string) {
  return Number(positionString.match(/-?[0-9]*\.?[0-9]+/)[0]);
}

function getCurrentPosition(style) {
  return getNumberFromPositionString(style);
}

function getNextTranslationX(style, amount: number) {
  const newPosition: number = getCurrentPosition(style.transform) + amount;

  return newPosition;
}

function translateX(slide, amount) {
  slide.style.transition = "transform 1200ms cubic-bezier(0.4, 0, 0.2, 1)";
  slide.style.transform = `translateX(${getNextTranslationX(
    slide.style,
    amount
  )}%)`;
}

function getPositionFarthestRight(style, length: number) {
  const currentPosition = getCurrentPosition(style.transform);
  const farthestRightPosition = currentPosition + (length - 1) * 100;
  return farthestRightPosition;
}

export function getPositionFarthestLeft(style, length: number) {
  const currentPosition = getCurrentPosition(style.transform);
  const farthestLeftPosition = currentPosition - (length - 1) * 100;

  return farthestLeftPosition;
}

function movePositionFarthestLeft(slide: HTMLElement, length) {
  slide.style.transition = "";
  slide.style.transform = `translateX(${getPositionFarthestLeft(
    slide.style,
    length
  )}%)`;
}

function movePositionFarthestRight(slide: HTMLElement, length) {
  slide.style.transition = "";
  slide.style.transform = `translateX(${getPositionFarthestRight(
    slide.style,
    length
  )}%)`;
}

export function isInViewport(element, offset) {
  const rect = element.getBoundingClientRect();
  return (
    rect.left + offset >= 0 &&
    Math.floor(rect.right - offset) <=
      (window.innerWidth || document.documentElement.clientWidth)
  );
}

export function isFirstOffRight(element, offset) {
  const rect = element.getBoundingClientRect();
  return (
    Math.ceil(rect.left - offset) ==
    (window.innerWidth || document.documentElement.clientWidth)
  );
}

export function isFirstOffLeft(element, offset) {
  const rect = element.getBoundingClientRect();
  return Math.floor(rect.right + offset) == 0;
}

export function slideCarouselRight(slides) {
  const minX = getMinX(slides);
  slides.forEach((slide, i) => {
    if (i == minX.i) movePositionFarthestRight(slide, slides.length);
    else translateX(slide, -100);
  });
}

export function slideCarouselLeft(slides) {
  const maxX = getMaxX(slides);
  slides.forEach((slide, i) => {
    if (i == maxX.i) movePositionFarthestLeft(slide, slides.length);
    else translateX(slide, 100);
  });
}

export function getMinX(slides) {
  let min;
  slides.forEach((slide, i) => {
    const x = slide.getBoundingClientRect().x;
    if (min == undefined || x < min.x) min = { x, i };
  });
  return min;
}

export function getMaxX(slides) {
  let max;
  slides.forEach((slide, i) => {
    const x = slide.getBoundingClientRect().x;
    if (max == undefined || x > max.x) max = { x, i };
  });
  return max;
}

function getNoOfVisibleCards(cardWidth: number) {
  return Math.ceil(100 / cardWidth);
}

function getCardZeroPosition(cardWidth: number) {
  const noOfVisibleCards = getNoOfVisibleCards(cardWidth);
  const combinedWidth = noOfVisibleCards * cardWidth;
  const overhang = (combinedWidth - 100) / 2;
  return 0 - overhang;
}

export function getOddPictures(pictures) {
  return pictures.length % 2 == 0
    ? pictures.slice(0, pictures.length - 1)
    : pictures;
}

export function getTransfromProperty(cardWidth, length) {
  const cardZeroPosition = getCardZeroPosition(cardWidth);
  const noOfVisibleCards = getNoOfVisibleCards(cardWidth);
  const offsetAsPercentageOfWidth = (cardZeroPosition / cardWidth) * 100;
  const noOffScreenCardsLeft = (length - noOfVisibleCards) / 2;
  return `translateX(${
    offsetAsPercentageOfWidth - 100 * noOffScreenCardsLeft
  }%)`;
}

export function getInitialTransform(cardWidth, length) {
  const cardZeroPosition = getCardZeroPosition(cardWidth);
  const noOfVisibleCards = getNoOfVisibleCards(cardWidth);
  const offsetAsPercentageOfWidth = (cardZeroPosition / cardWidth) * 100;
  const noOffScreenCardsLeft = (length - noOfVisibleCards) / 2;
  return offsetAsPercentageOfWidth - 100 * noOffScreenCardsLeft;
}

export function sortImages(images) {
  let pictures = [...images];
  let sorted = [];
  sorted.push(pictures.find((image) => image.node.slug == "nightclubbers-3"));
  pictures = pictures.filter((pic) => pic.node.slug != "nightclubbers-3");
  sorted.push(pictures.find((image) => image.node.slug == "skye-climbers"));
  pictures = pictures.filter((pic) => pic.node.slug != "skye-climbers");
  sorted.push(pictures.find((image) => image.node.slug == "together-clinging"));
  pictures = pictures.filter((pic) => pic.node.slug != "together-clinging");
  sorted = [...sorted, ...pictures];
  return sorted;
}

export function sortStyles(styles) {
  let pStyles = [...styles];
  let sorted = [];
  sorted.push(pStyles.find((style) => style.transform == "translateX(-25%)"));
  pStyles = pStyles.filter((style) => style.transform != "translateX(-25%)");
  sorted.push(pStyles.find((style) => style.transform == "translateX(75%)"));
  pStyles = pStyles.filter((style) => style.transform != "translateX(75%)");
  sorted.push(pStyles.find((style) => style.transform == "translateX(175%)"));
  pStyles = pStyles.filter((style) => style.transform != "translateX(175%)");
  sorted = [...sorted, ...pStyles];
  return sorted;
}
