import { graphql } from "gatsby";
import { getImage } from "gatsby-plugin-image";
import React from "react";
import IndFeature from "../../../components/frames/ind-feature";
import Magnifier from "../../../components/frames/magnifier";
import LayoutXL from "../../../components/layout/layoutXL";
import MagnifyingGlass from "../../../icons/magnifyingGlass";
import { getResizedImgUrl } from "../../../utilities/graphQL";

export default function XLArt({ data, location }) {
  const picture = data.contentfulPicture;
  const image = getImage(picture.image);
  const orientation = image.height > image.width ? "Portrait" : "Landscape";
  const path = location.pathname;
  const resizedUrl = getResizedImgUrl(
    picture.image.file.url,
    1200,
    picture.image.resize.aspectRatio
  );

  return (
    <LayoutXL
      title={`${picture.name} XL`}
      location={location}
      orientation={orientation}
    >
      <Magnifier
        zoom={2}
        backgroundImage={`url(${resizedUrl})`}
        imageContainerId={picture.name}
      >
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
          type={null}
          price={null}
          handleMouseMove={null}
          handleMagnify={null}
        >
          <p className="flex font-poppins justify-center mb-1">
            <MagnifyingGlass />
            Click image to magnify
          </p>
        </IndFeature>
      </Magnifier>
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
