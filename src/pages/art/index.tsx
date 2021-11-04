import React from "react";
import { graphql } from "gatsby";
import { getImage } from "gatsby-plugin-image";
import GroupFeature from "../../components/frames/group-feature";
import Layout from "../../components/layout/layout";

export default function ArtPage({ data }) {
  const pictures = data.allContentfulPicture.edges;
  return (
    <Layout title="Art">
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
              key={data.id}
              to={data.slug}
            ></GroupFeature>
          );
        })}
      </div>
    </Layout>
  );
}

export const query = graphql`
  query PicturesList {
    allContentfulPicture {
      edges {
        node {
          id
          name
          image {
            gatsbyImageData(
              layout: CONSTRAINED
              placeholder: DOMINANT_COLOR
              width: 300
            )
            description
          }
          alternativeText
          slug
        }
      }
    }
  }
`;
