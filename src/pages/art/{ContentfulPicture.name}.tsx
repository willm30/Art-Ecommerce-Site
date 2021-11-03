import React from "react";
import IndFeature from "../../components/frames/ind-feature";
import Layout from "../../components/layout/layout";
import { graphql } from "gatsby";
import { getImage } from "gatsby-plugin-image";

export default function Art({ data }) {
  const picture = data.contentfulPicture;
  const image = getImage(picture.image);

  return (
    <Layout title={picture.name}>
      <IndFeature
        image={image}
        des={picture.image.description}
        alt={picture.alternativeText}
        name={picture.name}
        media={picture.mediaType}
        canvas={picture.canvasType}
      ></IndFeature>
    </Layout>
  );
}

export const query = graphql`
  query IndividualPicture($id: String!) {
    contentfulPicture(id: { eq: $id }) {
      id
      name
      slug
      alternativeText
      canvasType
      mediaType
      image {
        gatsbyImageData
        description
      }
    }
  }
`;
