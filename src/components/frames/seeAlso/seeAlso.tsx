import { getImage } from "gatsby-plugin-image";
import React, { useEffect, useState } from "react";
import { getRandomImages } from "../../../utilities/images";
import ThumbnailWrapper from "../card/individual/thumbnail-wrapper";

export default function SeeAlso({ images, headingText }) {
  const [seeMore, setSeeMore] = useState(undefined);

  useEffect(() => {
    setSeeMore(getRandomImages(images, 3));
  }, []);

  const styles = {
    desktop: {
      h1: "md:text-6xl md:px-0",
      p: "font-poppins my-4 md:text-4xl md:px-0",
      seeMore: "flex md:flex-row md:flex-wrap",
    },
    mobile: {
      h1: "text-4xl px-4",
      p: "text-2xl px-4",
      seeMore: "flex-col",
    },
  };
  return (
    <div>
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
            />
          );
        })}
      </div>
    </div>
  );
}
