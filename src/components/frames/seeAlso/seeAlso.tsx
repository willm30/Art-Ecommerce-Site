import { getImage } from "gatsby-plugin-image";
import React, { useEffect, useState } from "react";
import { getRandomImages } from "../../../utilities/images";
import StandardButton from "../buttons/standard-btn";
import ThumbnailWrapper from "../card/individual/thumbnail-wrapper";

export default function SeeAlso({ images, headingText }) {
  const [seeMore, setSeeMore] = useState(undefined);

  useEffect(() => {
    setSeeMore(getRandomImages(images, 3));
  }, []);

  const styles = {
    desktop: {
      p: "font-poppins my-4 md:text-4xl md:px-0 md:text-left",
      seeMore: "flex md:flex-row md:flex-wrap",
    },
    mobile: {
      p: "text-2xl px-4 text-center",
      seeMore: "flex-col",
    },
  };
  return (
    <div className="flex flex-col">
      <p className={`${styles.desktop.p} ${styles.mobile.p}`}>{headingText}</p>
      <div className={`${styles.desktop.seeMore} ${styles.mobile.seeMore}`}>
        {seeMore?.map((i) => {
          const data = i.node;
          const image = getImage(data.image);
          return (
            <ThumbnailWrapper
              to={`/art/${data.slug}`}
              alt={data.alternativeText}
              img={image}
              title={data.name}
              artist={data.artist}
              id={null}
              width="flex-20 m-8"
              canvasType={data.canvasType}
              mediaType={data.mediaType}
              key={data.name}
            />
          );
        })}
      </div>
      <div className="self-center">
        <StandardButton to="/art" text="View All Artwork" />
      </div>
    </div>
  );
}
