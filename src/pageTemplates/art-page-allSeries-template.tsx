import { Link } from "gatsby";
import { graphql } from "gatsby";
import { getImage } from "gatsby-plugin-image";
import React, { useEffect } from "react";
import Filter from "../components/filter/filter";
import ThumbnailWrapper from "../components/frames/card/individual/thumbnail-wrapper";
import Copyright from "../components/layout/copyright";
import Layout from "../components/layout/layout";
import { placeOddOrientationInMiddle } from "../utilities/images";
import { slugify } from "../utilities/strings";

export default function AllSeries({ data, pageContext, location }) {
  const seriesTitles = [
    pageContext.series1,
    pageContext.series2,
    pageContext.series3,
    pageContext.series4,
    pageContext.series5,
  ];
  const series = Object.values(data);
  const { currentPage, numPages, totalPosts } = pageContext;
  const allPages = Array.from({ length: numPages }, (x, i) => i + 1);

  const isFirst = currentPage === 1;
  const isLast = currentPage === numPages;
  const prevPage =
    currentPage - 1 === 1 ? "/art/series" : `/art/series/${currentPage - 1}`;
  const nextPage = `/art/series/${currentPage + 1}`;

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
      <div className="flex flex-col">
        {series.map((series, index) => {
          const edges = series.edges.map((n) => n.node);
          return (
            seriesTitles[index] && (
              <div key={seriesTitles[index]} className="shadow-xl my-4">
                <hr />
                <div className="flex flex-col">
                  <h1 className="flex justify-center items-center font-ogirema text-4xl my-8">
                    <Link
                      to={`/art/series/${slugify(seriesTitles[index])}`}
                      className="hover:underline"
                    >
                      {seriesTitles[index]}
                    </Link>
                  </h1>
                  <div className="flex">
                    {placeOddOrientationInMiddle(edges.slice(0, 3)).map(
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
                </div>
                <hr />
              </div>
            )
          );
        })}
      </div>
      <footer>
        <div className="flex justify-center font-poppins text-lg my-4">
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
            Viewing {isLast ? totalPosts : series.length * currentPage} of{" "}
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
          <div className="flex justify-center font-poppins text-lg my-4">
            Skip to page:{" "}
            {allPages.map((p) => (
              <Link
                to={`/art/series${p == 1 ? "" : `/${p}`}`}
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
  query AllSeries(
    $series1: String!
    $series2: String!
    $series3: String!
    $series4: String!
    $series5: String!
  ) {
    series1: allContentfulPicture(
      filter: { seriesTitle: { eq: $series1 } }
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
            file {
              details {
                image {
                  height
                  width
                }
              }
            }
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
    series2: allContentfulPicture(
      filter: { seriesTitle: { eq: $series2 } }
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
            file {
              details {
                image {
                  height
                  width
                }
              }
            }
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
    series3: allContentfulPicture(
      filter: { seriesTitle: { eq: $series3 } }
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
            file {
              details {
                image {
                  height
                  width
                }
              }
            }
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
    series4: allContentfulPicture(
      filter: { seriesTitle: { eq: $series4 } }
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
            file {
              details {
                image {
                  height
                  width
                }
              }
            }
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
    series5: allContentfulPicture(
      filter: { seriesTitle: { eq: $series5 } }
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
            file {
              details {
                image {
                  height
                  width
                }
              }
            }
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
