const path = require("path"); //eslint-disable-line
require("dotenv").config({ //eslint-disable-line
  path: `.env.${process.env.NODE_ENV}`,
});

// Set your secret key. Remember to switch to your live secret key in production.
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY); //eslint-disable-line

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;
  const result = await graphql(
    `
      {
        allContentfulPicture(sort: { fields: name, order: ASC }) {
          edges {
            node {
              id
              image {
                gatsbyImageData(
                  placeholder: DOMINANT_COLOR
                  layout: CONSTRAINED
                  width: 300
                )
                file {
                  url
                }
              }
              artist
              name
              alternativeText
              slug
              mediaType
              seriesTitle
            }
          }
        }
        allContentfulProduct {
          edges {
            node {
              description {
                raw
              }
              price
              productName
            }
          }
        }
        allStripeProduct(sort: { fields: name, order: ASC }) {
          edges {
            node {
              name
              id
            }
          }
        }
      }
    `
  );

  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }
  // ...
  // Create blog-list pages
  function getUnique(edges, param) {
    const uniqueEntries = new Set();
    edges.forEach((node) => {
      const data = node.node[param];

      if (data) uniqueEntries.add(data.trim());
    });
    return [...uniqueEntries].sort();
  }

  function slugify(string) {
    return replaceSpacesWithDashes(string.toLowerCase());
  }

  function replaceSpacesWithDashes(string) {
    return string.replace(/ /g, "-");
  }
  const pictures = result.data.allContentfulPicture.edges;
  const productModels = result.data.allContentfulProduct.edges;
  const postsPerPage = 15;
  const numPages = Math.ceil(pictures.length / postsPerPage);
  const mediaTypes = getUnique(
    result.data.allContentfulPicture.edges,
    "mediaType"
  );
  const series = getUnique(
    result.data.allContentfulPicture.edges,
    "seriesTitle"
  );
  const products = result.data.allStripeProduct.edges;

  const picturesToBeAddedAsProducts = pictures.filter((picture) => {
    const pictureIsAlsoAProduct = products.find(
      (product) => product.node.name.trim() == picture.node.name.trim()
    );
    return !pictureIsAlsoAProduct;
  });

  picturesToBeAddedAsProducts.forEach(async (picture) => {
    const imageUrl = picture.node.image.gatsbyImageData.images.fallback.src;

    const newProduct = await stripe.products.create({
      images: [imageUrl],
      name: picture.node.name.trim(),
    });

    productModels.forEach(async (model) => {
      const productData = model.node;
      const price = await stripe.prices.create({
        product: newProduct.id,
        unit_amount: productData.price * 100,
        currency: "gbp",
        nickname: productData.productName,
      });
    });

    console.log(`Created new product for ${picture.node.name}`);
  });

  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/art` : `/art/${i + 1}`,
      component: path.resolve("./src/pageTemplates/art-page-template.tsx"),
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1,
        totalPosts: pictures.length,
      },
    });
  });

  pictures.forEach((post) => {
    const product = products.find(
      (product) => product.node.name.trim() == post.node.name.trim()
    );
    const slug = post.node.slug;
    const id = post.node.id;
    const type = post.node.mediaType;
    const productId = product && product.node.id;

    createPage({
      path: `/art/${slug}`,
      component: path.resolve("./src/pageTemplates/ind-art-page-template.tsx"),
      context: {
        id,
        productId,
        media: type,
      },
    });
  });
  mediaTypes.forEach((type) => {
    const mediaTypePosts = pictures.filter(
      (post) => post.node.mediaType == type
    );
    const postsPerPage = 15;
    const numPages = Math.ceil(mediaTypePosts.length / postsPerPage);
    Array.from({ length: numPages }).forEach((_, i) => {
      createPage({
        path:
          i === 0 ? `/art/${slugify(type)}` : `/art/${slugify(type)}/${i + 1}`,
        component: path.resolve(
          "./src/pageTemplates/art-page-filters-template.tsx"
        ),
        context: {
          limit: postsPerPage,
          skip: i * postsPerPage,
          filter: { mediaType: { eq: type } },
          filterCondition: type,
          numPages,
          currentPage: i + 1,
          totalPosts: mediaTypePosts.length,
        },
      });
    });
  });
  series.forEach((series) => {
    const seriesPosts = pictures.filter(
      (post) => post.node.seriesTitle == series
    );
    const postsPerPage = 15;
    const numPages = Math.ceil(seriesPosts.length / postsPerPage);
    Array.from({ length: numPages }).forEach((_, i) => {
      createPage({
        path:
          i === 0
            ? `/art/series/${slugify(series)}`
            : `/art/series/${slugify(series)}/${i + 1}`,
        component: path.resolve(
          "./src/pageTemplates/art-page-filters-template.tsx"
        ),
        context: {
          limit: postsPerPage,
          skip: i * postsPerPage,
          filter: { seriesTitle: { eq: series } },
          filterCondition: series,
          numPages,
          currentPage: i + 1,
          totalPosts: seriesPosts.length,
        },
      });
    });
  });
  series.forEach((s) => {
    const seriesPerPage = 5;
    const numPages = Math.ceil(series.length / seriesPerPage);
    Array.from({ length: numPages }).forEach((_, i) => {
      createPage({
        path: i === 0 ? "/art/series" : `/art/series/${i + 1}`,
        component: path.resolve(
          "./src/pageTemplates/art-page-allSeries-template.tsx"
        ),
        context: {
          limit: postsPerPage,
          skip: i * postsPerPage,
          series: s,
          numPages,
          currentPage: i + 1,
          totalPosts: series.length,
          series1: series[i * 5 + 0] || "",
          series2: series[i * 5 + 1] || "",
          series3: series[i * 5 + 2] || "",
          series4: series[i * 5 + 3] || "",
          series5: series[i * 5 + 4] || "",
        },
      });
    });
  });
};
