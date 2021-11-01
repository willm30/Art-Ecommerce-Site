import { graphql, useStaticQuery } from "gatsby";
import React from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

export default function Feature() {
  const data = useStaticQuery(graphql`
    query Picture {
      contentfulPicture(name: { eq: "Butter Tits" }) {
        id
        name
        image {
          gatsbyImageData
          file {
            url
          }
          description
        }
      }
    }
  `);
  const image = getImage(data.contentfulPicture.image);

  console.log(data);
  /*

*/
  return (
    <div className="border-8 border-black">
      <GatsbyImage
        image={image}
        alt={data.contentfulPicture.descriptiongeDescription}
      ></GatsbyImage>
    </div>
  );
}
