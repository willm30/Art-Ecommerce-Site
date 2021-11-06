import React, { useEffect, useState } from "react";
import { getElementById } from "../../utilities/dom";
import {
  getBackgroundPosition,
  getBackgroundSize,
  getCursorPosition,
  getMagnifierLeftPosition,
  getMagnifierTopPosition,
} from "../../utilities/magnify";

export default function Magnifier({
  zoom,
  children,
  backgroundImage,
  imageContainerId,
}) {
  const [cursor, setCursor] = useState({ x: undefined, y: undefined });
  const [display, setDisplay] = useState("none");
  const [left, setLeft] = useState("");
  const [top, setTop] = useState("");
  const [backgroundPosition, setBackgroundPosition] = useState("");
  const [imageContainer, setImageContainer] = useState(undefined);
  const [cardContainer, setCardContainer] = useState(undefined);
  const magnifierWidth = 192;
  const magnifierHeight = 192;
  const backgroundSize = getBackgroundSize(imageContainer, zoom);
  const [bodyHeight, setBodyHeight] = useState(undefined);

  useEffect(() => {
    setCardContainer(getElementById("CardWrapper"));
    setImageContainer(getElementById(imageContainerId));
    setCursor(JSON.parse(window.sessionStorage.getItem("cursorPosition")));

    document.body.addEventListener("mouseleave", hideMagnifier);
    setBodyHeight(document.body.clientHeight);
    const greyZone = getElementById("GreyZone");
    greyZone.addEventListener("mouseenter", hideMagnifier);
    const pictureDescription = getElementById("PictureDescription");
    pictureDescription.addEventListener("mouseenter", hideMagnifier);
    return () => {
      document.body.removeEventListener("mouseleave", hideMagnifier);
      greyZone.removeEventListener("mouseenter", hideMagnifier);
      pictureDescription.removeEventListener("mouseenter", hideMagnifier);
    };
  }, []);

  return (
    <div onMouseMove={handleMouseMoveCard}>
      <div>
        {React.cloneElement(children, {
          handleMagnify,
        })}
      </div>
      <div
        style={{
          backgroundRepeat: "no-repeat",
          backgroundImage,
          backgroundSize,
          backgroundPosition,
          left,
          top,
          display,
          width: `${magnifierWidth}px`,
          height: `${magnifierHeight}px`,
        }}
        className="absolute top-2/4 border-2 border-black"
        onMouseMove={handleMouseMoveMagnifier}
        onMouseDown={hideMagnifier}
      />
    </div>
  );

  function handleMouseMoveCard(e) {
    setCursor({ x: getCursorPosition(e).x, y: getCursorPosition(e).y });
    setMagnifierPosition();
  }

  function handleMouseMoveMagnifier() {
    handleBackgroundPosition(
      magnifierWidth,
      imageContainer,
      cursor?.x,
      cursor?.y,
      zoom
    );
    setMagnifierPosition();
    if (hasMouseExitedImage()) {
      hideMagnifier();
    }
    if (isMagnifierAtBottom()) {
    }
  }

  function hasMouseExitedImage() {
    const imageRight = imageContainer.getBoundingClientRect().right;
    const imageBottom = imageContainer.getBoundingClientRect().bottom;
    const imageTop = imageContainer.getBoundingClientRect().top;

    /* Card left gives uses a fraction more space for viewing than would image left */
    const cardLeft = cardContainer.getBoundingClientRect().left;

    const cursorX = cursor?.x;
    const cursorY = cursor?.y;

    return (
      cursorX < cardLeft ||
      cursorX > imageRight ||
      cursorY > imageBottom ||
      cursorY < imageTop
    );
  }

  function isMagnifierAtBottom() {
    const magnifierBottom = cursor.y + magnifierHeight / 2;
    return bodyHeight - magnifierBottom < 5;
  }

  function handleBackgroundPosition(
    magnifierDiameter: number,
    imageContainer: HTMLElement,
    cursorX: number,
    cursorY: number,
    zoom: number
  ) {
    const backgroundPosition = getBackgroundPosition(
      magnifierDiameter,
      imageContainer,
      cursorX,
      cursorY,
      zoom
    );

    setBackgroundPosition(
      `${-backgroundPosition.x}px ${-backgroundPosition.y}px`
    );
  }

  function setMagnifierPosition() {
    setLeft(`${getMagnifierLeftPosition(magnifierWidth, cursor?.x)}px`);

    const topPosition = getMagnifierTopPosition(magnifierHeight, cursor?.y);
    const bottomPosition = topPosition + magnifierHeight;
    if (bodyHeight - bottomPosition > 5) {
      setTop(`${topPosition}px`);
    } else {
      setTop(`${bodyHeight - 5 - magnifierHeight}px`);
    }
  }

  function hideMagnifier() {
    setDisplay("none");
  }

  function handleMagnify() {
    setDisplay("block");
    handleMouseMoveMagnifier();
  }
}
