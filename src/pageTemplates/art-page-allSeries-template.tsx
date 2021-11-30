import { graphql } from "gatsby";
import React, { useEffect } from "react";
import Filter from "../components/filter/filter";
import Layout from "../components/layout/layout";
import FooterNav from "../components/navigation/footerNav";
import SeriesCard from "../components/series/seriesCard";

export default function AllSeries({ data, pageContext, location }) {
  const seriesTitles = [
    pageContext.series1,
    pageContext.series2,
    pageContext.series3,
    pageContext.series4,
    pageContext.series5,
  ];

  const series = Object.values(data);

  const styles = {
    desktop: {
      filter:
        "row-span-1 flex justify-center items-center md:text-xl font-ogirema my-8",
      title: "font-ogirema md:text-5xl mt-8 text-center",
    },
    mobile: {
      filter: "text-md",
      title: "text-4xl",
    },
  };
  return (
    <Layout
      title="Art"
      childStyles="col-span-full row-start-2 grid grid-cols-all grid-rows-all"
      location={location}
    >
      <h1 className={`${styles.desktop.title} ${styles.mobile.title}`}>
        All Series
      </h1>
      <div className={`${styles.desktop.filter} ${styles.mobile.filter}`}>
        <Filter />
      </div>
      <div className="flex flex-col">
        {series.map((series, index) => {
          const edges = series.edges.map((n) => n.node);
          return <SeriesCard title={seriesTitles[index]} edges={edges} />;
        })}
      </div>
      <FooterNav pageContext={pageContext} pictures={series} path="series/" />
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
