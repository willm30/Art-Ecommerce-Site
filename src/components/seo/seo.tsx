import { graphql, useStaticQuery } from "gatsby";
import React from "react";
import { Helmet } from "react-helmet";

export default function Seo(props) {
  const data = useStaticQuery(graphql`
    query MetaData {
      site {
        siteMetadata {
          title
          description
          siteUrl
          image
        }
      }
    }
  `);

  const defaults = data?.site?.siteMetadata;

  const pageTitle = props.title
    ? `${props.title} || ${defaults.title} `
    : defaults.title;
  const description = props.description || defaults.description;
  const image = new URL(props.image || defaults.image);
  const url = new URL(props.path || "/", defaults.siteUrl);
  console.log(image, "img");
  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url.toString()} />
      {image && <meta name="image" content={image.toString()} />}

      <meta property="og:url" content={url.toString()} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      {image && <meta name="og:image" content={image.toString()} />}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={image.toString()} />}
    </Helmet>
  );
}
