import { graphql } from "gatsby";
import { getImage } from "gatsby-plugin-image";
import React from "react";
import Filter from "../components/filter/filter";
import ThumbnailWrapper from "../components/frames/card/individual/thumbnail-wrapper";
import Layout from "../components/layout/layout";
import FooterNav from "../components/navigation/footerNav";
import { capitaliseFirstLetterOfEachWord, slugify } from "../utilities/strings";

export default function ArtType({ data, pageContext, location }) {
  const pictures = data.allContentfulPicture.edges;
  const { filterCondition } = pageContext;
  const styles = {
    desktop: {
      filter:
        "row-span-1 flex justify-center items-center md:text-xl font-ogirema my-8",
      frame: "md:flex-33 mb-8",
      title: "font-ogirema md:text-5xl mt-8 text-center",
    },
    mobile: {
      filter: "text-md",
      frame: "flex-100",
      title: "text-4xl",
    },
  };

  return (
    <Layout
      title={`${capitaliseFirstLetterOfEachWord(filterCondition)}`}
      childStyles="col-span-full row-start-2 grid grid-cols-all grid-rows-all"
      location={location}
    >
      <h1 className={`${styles.desktop.title} ${styles.mobile.title}`}>
        {capitaliseFirstLetterOfEachWord(filterCondition)}
      </h1>
      <div className={`${styles.desktop.filter} ${styles.mobile.filter}`}>
        <Filter />
      </div>
      <div className="flex flex-wrap">
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
      <FooterNav
        pageContext={pageContext}
        pictures={pictures}
        path={`${slugify(filterCondition)}/`}
      />
    </Layout>
  );
}

export const query = graphql`
  query Picture(
    $skip: Int!
    $limit: Int!
    $filter: ContentfulPictureFilterInput!
  ) {
    allContentfulPicture(
      filter: $filter
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
