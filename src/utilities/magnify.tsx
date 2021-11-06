export function getCursorPosition(e) {
  return { x: e.clientX, y: e.clientY };
}

export function getMagnifierLeftPosition(
  magnifierWidth: number,
  cursorX: number
) {
  const halfMagnifierWidth = magnifierWidth / 2;

  return cursorX - halfMagnifierWidth;
}

export function getMagnifierTopPosition(
  magnifierHeight: number,
  cursorY: number
) {
  const halfMagnifierHeight = magnifierHeight / 2;

  return cursorY - halfMagnifierHeight;
}

export function getBackgroundSize(container: HTMLElement, zoom: number) {
  const backgroundSizeX = container?.clientWidth * zoom;
  const backgroundSizeY = container?.clientHeight * zoom;
  return `${backgroundSizeX}px ${backgroundSizeY}px`;
}

export function getBackgroundPosition(
  magnifierDiameter: number, // magnifier width
  container: HTMLElement,
  cursorX: number,
  cursorY: number,
  zoom: number
) {
  const containerOffsetX =
    getMagnifierPositionFromCursor(cursorX, magnifierDiameter) -
    getContainerLeftPosition(container);

  const containerOffsetY =
    getMagnifierPositionFromCursor(cursorY, magnifierDiameter) -
    getContainerTopPosition(container);

  const backgroundPositionX = getBackgroundDimension(
    containerOffsetX,
    magnifierDiameter / 2,
    zoom
  );
  const backgroundPositionY = getBackgroundDimension(
    containerOffsetY,
    magnifierDiameter / 2,
    zoom
  );
  return { x: backgroundPositionX, y: backgroundPositionY };
}

function getBackgroundDimension(
  containerOffset: number,
  cursorOffset: number,
  zoom: number
) {
  return containerOffset * zoom + cursorOffset;
}

function getContainerLeftPosition(container: HTMLElement) {
  return container.getBoundingClientRect().left;
}

function getContainerTopPosition(container: HTMLElement) {
  return container.getBoundingClientRect().top;
}

function getMagnifierPositionFromCursor(
  cursorPosition: number,
  magnifierDiameter: number
) {
  /* Returns the left or top position of the magnifier, depending on whether you give it
  the x or y value of the cursor */
  return cursorPosition - magnifierDiameter / 2;
}
