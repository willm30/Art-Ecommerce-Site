import { Link } from "gatsby";
import { graphql } from "gatsby";
import { getImage } from "gatsby-plugin-image";
import React, { useEffect } from "react";
import Filter from "../components/filter/filter";
import ThumbnailWrapper from "../components/frames/card/individual/thumbnail-wrapper";
import Copyright from "../components/layout/copyright";
import Layout from "../components/layout/layout";
import { slugify } from "../utilities/strings";

export default function ArtSeries({ data, pageContext, location }) {
  const { currentPage, numPages, totalPosts, series } = pageContext;
  const pictures = data.allContentfulPicture.edges;
  const allPages = Array.from({ length: numPages }, (x, i) => i + 1);
  const isFirst = currentPage === 1;
  const isLast = currentPage === numPages;
  const prevPage =
    currentPage - 1 === 1
      ? `/art/series/${slugify(series)}`
      : `/art/series/${slugify(series)}/${currentPage - 1}`;
  const nextPage = `/art/${slugify(series)}/${currentPage + 1}`;

  useEffect(() => {
    document.querySelector(".tl-edges").scrollTop = 0;
  });

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
      <footer>
        <div className="flex justify-center font-poppins text-lg mb-4">
          {!isFirst && (
            <Link
              to={prevPage}
              rel="prev"
              className="mx-2 hover:text-indigo-900"
            >
              ← Previous Page
            </Link>
          )}
          <span>
            Viewing {isLast ? totalPosts : pictures.length * currentPage} of{" "}
            {totalPosts}
          </span>
          {!isLast && (
            <Link
              to={nextPage}
              rel="next"
              className="mx-2 hover:text-indigo-900"
            >
              Next Page →
            </Link>
          )}
        </div>
        {numPages != 1 && (
          <div className="flex justify-center font-poppins text-lg mb-4">
            Skip to page:{" "}
            {allPages.map((p) => (
              <Link
                to={`/art/series/${slugify(series)}${p == 1 ? "" : `/${p}`}`}
                className="underline mx-2 hover:text-indigo-900"
                key={`link${p}`}
              >
                {p}
              </Link>
            ))}
          </div>
        )}
        <Copyright />
      </footer>
    </Layout>
  );
}

export const query = graphql`
  query SeriesPicture($skip: Int!, $limit: Int!, $series: String!) {
    allContentfulPicture(
      limit: $limit
      skip: $skip
      filter: { seriesTitle: { eq: $series } }
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
