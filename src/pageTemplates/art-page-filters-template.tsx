import { Link } from "gatsby";
import { graphql } from "gatsby";
import { getImage } from "gatsby-plugin-image";
import React from "react";
import Filter from "../components/filter/filter";
import ThumbnailWrapper from "../components/frames/card/individual/thumbnail-wrapper";
import Layout from "../components/layout/layout";
import { slugify } from "../utilities/strings";

export default function ArtOil({ data, pageContext, location }) {
  const pictures = data.allContentfulPicture.edges;
  const { currentPage, numPages, media } = pageContext;
  const isFirst = currentPage === 1;
  const isLast = currentPage === numPages;
  const prevPage =
    currentPage - 1 === 1
      ? `/art/${slugify(media)}`
      : `/art/${slugify(media)}/${currentPage - 1}`;
  const nextPage = `/art/${slugify(media)}/${currentPage + 1}`;
  return (
    <Layout
      title="Art"
      childStyles="col-span-full row-start-2 grid grid-cols-all grid-rows-all relative top-20"
      location={location}
    >
      <div className="row-span-1 flex justify-center items-center text-xl font-ogirema mb-8">
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
              width="flex-33 mb-8"
            />
          );
        })}
      </div>
      <div className="flex justify-center font-poppins text-lg mb-4">
        {!isFirst && (
          <Link to={prevPage} rel="prev" className="mx-2 hover:text-indigo-900">
            ← Previous Page
          </Link>
        )}
        {!isLast && (
          <Link to={nextPage} rel="next" className="mx-2 hover:text-indigo-900">
            Next Page →
          </Link>
        )}
      </div>
    </Layout>
  );
}

export const query = graphql`
  query Picture($skip: Int!, $limit: Int!, $media: String!) {
    allContentfulPicture(
      filter: { mediaType: { eq: $media } }
      limit: $limit
      skip: $skip
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
        }
      }
    }
  }
`;
