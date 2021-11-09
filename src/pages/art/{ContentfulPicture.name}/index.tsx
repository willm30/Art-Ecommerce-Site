import React from "react";
import Layout from "../../../components/layout/layout";
import { graphql } from "gatsby";
import { getImage } from "gatsby-plugin-image";
import IndFeature from "../../../components/frames/ind-feature";
import { getCursorPosition } from "../../../utilities/magnify";

export default function Art({ data, location }) {
  const picture = data.contentfulPicture;
  const image = getImage(picture.image);
  const path = location.pathname;
  const orientation = image.height > image.width ? "Portrait" : "Landscape";

  function handleMouseMove(e) {
    const cursor = getCursorPosition(e);
    window.sessionStorage.setItem("cursorPosition", JSON.stringify(cursor));
  }

  return (
    <Layout title={picture.name}>
      <IndFeature
        image={image}
        des={picture.image.description}
        alt={picture.alternativeText}
        name={picture.name}
        media={picture.mediaType}
        canvas={picture.canvasType}
        path={path}
        orientation={orientation}
        title={picture.name}
        slug={picture.slug}
        type={null} // TODO: Pull in from product shape
        price={null} // TODO: Pull in from product shape
        handleMouseMove={handleMouseMove}
        handleMagnify={null}
      >
        {null}
      </IndFeature>
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
          width: 1200
        )
        description
        file {
          url
        }
        resize {
          aspectRatio
        }
      }
    }
  }
`;