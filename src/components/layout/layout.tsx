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
  const rows =
    location.pathname == "/" ? "grid-rows-index" : "grid-rows-feature";
  useEffect(() => {
    window.addEventListener("touchstart", handleTouch);
    return () => window.removeEventListener("touchstart", handleTouch);
  }, []);

  function handleTouch() {
    setIsTouch(true);
  }
  return (
    <div className={`grid sm:grid-cols-10 md:grid-cols-6 ${rows} h-screen`}>
      <Seo title={title} />
      <Header location={location}></Header>
      <div className={`${childStyles}`}>{children}</div>
    </div>
  );
}
