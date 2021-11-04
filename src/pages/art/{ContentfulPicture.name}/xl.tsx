import { graphql } from "gatsby";
import { getImage } from "gatsby-plugin-image";
import React from "react";
import LayoutXL from "../../../components/layout/layoutXL";
import IndFeature from "../../../components/frames/ind-feature";

export default function XLArt({ data, location }) {
  const picture = data.contentfulPicture;
  const image = getImage(picture.image);
  const orientation = image.height > image.width ? "Portrait" : "Landscape";
  const path = location.pathname;

  return (
    <LayoutXL
      title={`${picture.name} XL`}
      location={location}
      orientation={orientation}
    >
      <IndFeature
        image={image}
        des={picture.image.description}
        alt={picture.alternativeText}
        name={picture.name}
        media={picture.mediaType}
        canvas={picture.canvasType}
        orientation={orientation}
        xl={true}
        path={path}
      />
    </LayoutXL>
  );
}

export const query = graphql`
  query EnlargedPicture($id: String!) {
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
          width: 1200
        )
        description
      }
    }
  }
`;
