export function getCursorPosition(e) {
  return { x: e.clientX, y: e.clientY };
}

export function getBackgroundPosition(
  containerOffset: number,
  cursorOffset: number,
  zoom: number
) {
  return containerOffset * zoom + cursorOffset;
}

export function getXOffset(
  element: HTMLDivElement | number,
  container: HTMLDivElement
) {
  if (typeof element == "number")
    return element - container.getBoundingClientRect().left;

  return (
    element.getBoundingClientRect().left -
    container.getBoundingClientRect().left
  );
}

export function getYOffset(
  element: HTMLDivElement | number,
  container: HTMLDivElement
) {
  if (typeof element == "number")
    return element - container.getBoundingClientRect().top;

  return (
    element.getBoundingClientRect().top - container.getBoundingClientRect().top
  );
}

export function getLeftPosition(
  magnifier: HTMLDivElement,
  container: HTMLDivElement,
  cursorX: number
) {
  const halfMagnifierWidth = magnifier.getBoundingClientRect().width / 2;
  const leftPosition = isXWithinBounds(cursorX, halfMagnifierWidth, container)
    ? cursorX - halfMagnifierWidth
    : magnifier.getBoundingClientRect().left;

  return leftPosition;
}

export function getTopPosition(
  magnifier: HTMLDivElement,
  container: HTMLDivElement,
  cursorY: number
) {
  const halfMagnifierHeight = magnifier.getBoundingClientRect().height / 2;
  const topPosition = isYWithinBounds(cursorY, halfMagnifierHeight, container)
    ? cursorY - halfMagnifierHeight
    : magnifier.getBoundingClientRect().top;

  return topPosition;
}

function isXWithinBounds(cursorX: number, offset: number, container) {
  if (
    cursorX + offset <= container.getBoundingClientRect().right &&
    cursorX - offset >= container.getBoundingClientRect().left
  )
    return true;

  return false;
}

function isYWithinBounds(cursorY: number, offset: number, container) {
  if (
    cursorY + offset <= container.getBoundingClientRect().bottom &&
    cursorY - offset >= container.getBoundingClientRect().top
  )
    return true;

  return false;
}
