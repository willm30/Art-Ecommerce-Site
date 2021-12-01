require("dotenv").config(); //eslint-disable-line

module.exports = {
  siteMetadata: {
    siteUrl: "https://www.purpleorchard.art",
    title: "Purple Orchard",
    description:
      "Founded in 2021, Purple Orchard is an online gallery that seeks to bring beautiful and interesting art to the public in a range of styles and emotions.",
    image:
      "https://images.ctfassets.net/ei7twg2jyh6q/2vLb4nQh0HVas6v5owsaVW/25b83ca8a7c6b21bd7eb246d449f6b2a/IMG_20211009_183732.jpg?w=150&h=205&fl=progressive&q=50&fm=jpg",
  },
  plugins: [
    "gatsby-plugin-gatsby-cloud",
    "gatsby-plugin-image",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
    "gatsby-plugin-mdx",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    "gatsby-plugin-postcss",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: "./src/pages/",
      },
      __key: "pages",
    },
    {
      resolve: "gatsby-source-contentful",
      options: {
        spaceId: "ei7twg2jyh6q",
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
      },
    },
    {
      resolve: `gatsby-source-stripe`,
      options: {
        objects: ["Price", "Product"],
        secretKey: process.env.STRIPE_SECRET_KEY,
        downloadFiles: false,
      },
    },
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    "gatsby-plugin-smoothscroll",
  ],
};
