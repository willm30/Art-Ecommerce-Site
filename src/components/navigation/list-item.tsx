import React from "react";
import { Link } from "gatsby";

export default function ListItem({
  text,
  to,
  hover,
}: {
  text: string;
  to: string;
  hover: string;
}) {
  return (
    <li className={`${hover}`}>
      <Link to={`/${to}`}>{text}</Link>
    </li>
  );
}
