import { Link } from "gatsby";
import { getImage } from "gatsby-plugin-image";
import React, { useEffect, useState } from "react";
import { placeOddOrientationInMiddle } from "../../utilities/images";
import { slugify } from "../../utilities/strings";
import StandardButton from "../frames/buttons/standard-btn";
import ThumbnailWrapper from "../frames/card/individual/thumbnail-wrapper";

export default function SeriesCard({ title, edges }) {
  const [isMobile, setIsMobile] = useState(false);
  const imgSlice = isMobile ? 2 : 3;

  useEffect(() => {
    if (window.innerWidth < 668) {
      setIsMobile(true);
    }
  });

  const styles = {
    desktop: {
      frame: "md:flex-33 mb-8",
    },
    mobile: {
      frame: "flex-100",
    },
  };
  return (
    title && (
      <div key={title} className="shadow-xl my-4">
        <hr />
        <div className="flex flex-col items-center">
          <h1 className="flex justify-center items-center font-ogirema text-4xl my-8">
            <Link
              to={`/art/series/${slugify(title)}`}
              className="hover:underline"
            >
              {title}
            </Link>
          </h1>
          <div className="flex md:flex-row flex-col md:min-w-full">
            {placeOddOrientationInMiddle(edges.slice(0, imgSlice)).map(
              (node, i) => {
                const image = getImage(node.image);
                return (
                  <ThumbnailWrapper
                    key={node.name}
                    to={`/art/${node.slug}`}
                    alt={node.alternativeText}
                    img={image}
                    title={node.name}
                    artist={null}
                    id={`img${i + 1}`}
                    width={`${styles.desktop.frame} ${styles.mobile.frame}`}
                    canvasType={null}
                    mediaType={null}
                  />
                );
              }
            )}
          </div>
          <StandardButton to={`/art/series/${slugify(title)}`} text="See All" />
        </div>
        <hr />
      </div>
    )
  );
}
