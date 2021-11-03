import React from "react";
import Layout from "../components/layout/layout";
import GroupFeature from "../components/frames/group-feature";
import { graphql } from "gatsby";
import { getImage } from "gatsby-plugin-image";

export default function Index({ data }) {
  const pictures = data.allContentfulPicture.edges;
  return (
    <Layout>
      <div className="flex flex-col">
        {pictures.map((picture) => {
          const data = picture.node;
          const image = getImage(data.image);

          return (
            <GroupFeature
              image={image}
              des={data.image.description}
              alt={data.alternativeText}
              name={data.name}
              id={data.id}
              to={data.slug}
            ></GroupFeature>
          );
        })}
      </div>
    </Layout>
  );
}

export const query = graphql`
  query Picture {
    allContentfulPicture {
      edges {
        node {
          id
          name
          image {
            gatsbyImageData
            description
          }
          alternativeText
          slug
        }
      }
    }
  }
`;
