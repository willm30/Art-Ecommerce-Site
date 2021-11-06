import { Link } from "gatsby";
import React from "react";

export default function CustomLink({ path, children }) {
  if (path) return <Link to={path}>{children}</Link>;
  return <a href={path}>{children}</a>;
}
