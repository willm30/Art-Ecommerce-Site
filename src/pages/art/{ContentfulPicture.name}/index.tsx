import React from "react";
import IndFeature from "../../../components/frames/ind-feature";
import Layout from "../../../components/layout/layout";
import { graphql, Link } from "gatsby";
import { getImage } from "gatsby-plugin-image";

export default function Art({ data, location }) {
  const picture = data.contentfulPicture;
  const image = getImage(picture.image);
  const path = location.pathname;
  const orientation = image.height > image.width ? "Portrait" : "Landscape";

  return (
    <Layout title={picture.name}>
      <IndFeature
        image={image}
        des={picture.image.description}
        alt={picture.alternativeText}
        name={picture.name}
        media={picture.mediaType}
        canvas={picture.canvasType}
        orientation={orientation}
        xl={false}
        path={path}
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
        gatsbyImageData(
          layout: CONSTRAINED
          placeholder: DOMINANT_COLOR
          width: 700
        )
        description
      }
    }
  }
`;
