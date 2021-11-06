import React from "react";

export default function Magnifier({
  id,
  backgroundImage,
  backgroundSize,
  backgroundPosition,
  display,
  left,
  top,
}) {
  const styles = {
    backgroundRepeat: "no-repeat",
    backgroundImage,
    backgroundSize,
    backgroundPosition,
    left,
    top,
  };
  return (
    <div
      style={styles}
      className={`${display} absolute top-2/4 w-48 h-48`}
      id={id}
    ></div>
  );
}
