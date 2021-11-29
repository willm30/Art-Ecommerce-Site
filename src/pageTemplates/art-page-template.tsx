import { graphql } from "gatsby";
import { getImage } from "gatsby-plugin-image";
import React, { useEffect } from "react";
import Filter from "../components/filter/filter";
import ThumbnailWrapper from "../components/frames/card/individual/thumbnail-wrapper";
import Layout from "../components/layout/layout";
import FooterNav from "../components/navigation/footerNav";

export default function ArtAll({ data, pageContext, location }) {
  const pictures = data.allContentfulPicture.edges;

  useEffect(() => {
    document.querySelector(".tl-edges").scrollTop = 0;
  }, []);

  const styles = {
    desktop: {
      filter:
        "row-span-1 flex justify-center items-center md:text-xl font-ogirema my-8",
      frame: "md:flex-33 mb-8",
    },
    mobile: {
      filter: "text-md",
      frame: "flex-100",
    },
  };
  return (
    <Layout
      title="Art"
      childStyles="col-span-full row-start-2 grid grid-cols-all grid-rows-all"
      location={location}
    >
      <div className={`${styles.desktop.filter} ${styles.mobile.filter}`}>
        <Filter />
      </div>
      <div className="flex flex-wrap my-8">
        {pictures.map((pic, i) => {
          const data = pic.node;
          const image = getImage(data.image);
          return (
            <ThumbnailWrapper
              key={data.name}
              to={`/art/${data.slug}`}
              alt={data.alternativeText}
              img={image}
              title={data.name}
              artist={data.artist}
              id={`img${i + 1}`}
              width={`${styles.desktop.frame} ${styles.mobile.frame}`}
              canvasType={data.canvasType}
              mediaType={data.mediaType}
            />
          );
        })}
      </div>
      <FooterNav pageContext={pageContext} pictures={pictures} />
    </Layout>
  );
}

export const query = graphql`
  query AllPicture($skip: Int!, $limit: Int!) {
    allContentfulPicture(
      limit: $limit
      skip: $skip
      sort: { fields: name, order: ASC }
    ) {
      edges {
        node {
          id
          image {
            gatsbyImageData(
              placeholder: DOMINANT_COLOR
              layout: CONSTRAINED
              width: 300
            )
          }
          artist
          name
          alternativeText
          slug
          canvasType
          mediaType
        }
      }
    }
  }
`;
