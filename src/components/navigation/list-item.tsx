import React from "react";
import { Link } from "gatsby";

export default function ListItem({ text, to }: { text: string; to: string }) {
  return (
    <li>
      <Link to={`/${to}`}>{text}</Link>
    </li>
  );
}
