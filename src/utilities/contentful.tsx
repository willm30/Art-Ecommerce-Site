import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";
import React from "react";

export function paragraphsToReactComponent(rawParagraphs, className: string) {
  const renderOptions = styleParagraphReactComponent(className);
  return rawToReactComponent(JSON.parse(rawParagraphs), renderOptions);
}
export function rawToReactComponent(raw, renderOptions) {
  return documentToReactComponents(raw, renderOptions);
}

export function styleParagraphReactComponent(className: string) {
  const Text = ({ children }) => <span className={className}>{children}</span>;

  const renderOptions = {
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node, children) => <Text>{children}</Text>,
    },
  };
  return renderOptions;
}

export function getRaw(edges, title: string) {
  const filtered = edges.filter((n) => n.node.title == title);
  return JSON.parse(filtered[0].node.textEntry.raw);
}
