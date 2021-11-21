export function isInViewport(element, offset) {
  const rect = element.getBoundingClientRect();
  return (
    Math.floor(rect.left - offset) >= 0 &&
    Math.floor(rect.right + offset) <=
      (window.innerWidth || document.documentElement.clientWidth)
  );
}

export function isFirstOffRight(element, offset) {
  const rect = element.getBoundingClientRect();
  return (
    Math.floor(rect.left) + Math.ceil(offset) ==
    (window.innerWidth || document.documentElement.clientWidth)
  );
}

export function isFirstOffLeft(element, offset) {
  const rect = element.getBoundingClientRect();
  return Math.floor(rect.right - offset) == 0;
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

export function getoffsetAsPercentageOfWidth(cardWidth: number) {
  const cardZeroPosition = getCardZeroPosition(cardWidth);
  return (cardZeroPosition / cardWidth) * 100;
}

export function getOddPictures(pictures) {
  return pictures.length % 2 == 0
    ? pictures.slice(0, pictures.length - 1)
    : pictures;
}

export function getInitialTransform(cardWidth, length) {
  const noOfVisibleCards = getNoOfVisibleCards(cardWidth);
  const offsetAsPercentageOfWidth = getoffsetAsPercentageOfWidth(cardWidth);
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
