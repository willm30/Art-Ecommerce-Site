import React, { useContext, useEffect } from "react";
import { TouchContext } from "../../context/TouchContext";
import Seo from "../seo/seo";
import Header from "./header";

export default function Layout({
  children,
  childStyles,
  title,
  location,
}: {
  children: React.ReactElement | React.ReactElement[];
  childStyles: string;
  title: string;
  location: any;
}) {
  const [isTouch, setIsTouch] = useContext(TouchContext);

  useEffect(() => {
    window.addEventListener("touchstart", handleTouch);
    return () => window.removeEventListener("touchstart", handleTouch);
  }, []);

  function handleTouch() {
    setIsTouch(true);
  }
  return (
    <div className="grid sm:grid-cols-10 md:grid-cols-6 grid-rows-feature h-screen overflow-x-hidden">
      <Seo title={title} />
      <Header location={location}></Header>
      <div className={`${childStyles}`}>{children}</div>
    </div>
  );
}
