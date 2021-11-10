import React from "react";
import { graphql } from "gatsby";
import { getImage } from "gatsby-plugin-image";
import GroupFeature from "../../components/frames/group-feature";
import Layout from "../../components/layout/layout";

export default function ArtPage({ data }) {
  const pictures = data.allContentfulPicture.edges;
  const title = "Art";
  return (
    <Layout title={title}>
      <div>
        <h1 className="text-center text-2xl font-secular my-4 md:my-0 md:mb-8 md:text-4xl">
          {title}
        </h1>
        {pictures.map((picture) => {
          const data = picture.node;
          const image = getImage(data.image);
          const orientation = image
            ? image.height > image.width
              ? "Portrait"
              : "Landscape"
            : undefined;

          return (
            <GroupFeature
              image={image}
              des={data.image?.description}
              alt={data.alternativeText}
              name={data.name}
              key={data.id}
              to={data.slug}
              orientation={orientation}
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
              width: 700
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
