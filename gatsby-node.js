const path = require("path"); //eslint-disable-line
// const { createFilePath } = require("gatsby-source-filesystem"); //eslint-disable-line

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;
  const result = await graphql(
    `
      {
        allContentfulPicture {
          edges {
            node {
              id
              image {
                gatsbyImageData(
                  placeholder: DOMINANT_COLOR
                  layout: CONSTRAINED
                  width: 300
                )
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
  const posts = result.data.allContentfulPicture.edges;
  const postsPerPage = 15;
  const numPages = Math.ceil(posts.length / postsPerPage);
  const mediaTypes = getUnique(
    result.data.allContentfulPicture.edges,
    "mediaType"
  );
  const series = getUnique(
    result.data.allContentfulPicture.edges,
    "seriesTitle"
  );

  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/art` : `/art/${i + 1}`,
      component: path.resolve("./src/pageTemplates/art-page-template.tsx"),
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1,
      },
    });
  });
  posts.forEach((post) => {
    const slug = post.node.slug;
    const id = post.node.id;
    const type = post.node.mediaType;
    createPage({
      path: `/art/${slug}`,
      component: path.resolve("./src/pageTemplates/ind-art-page-template.tsx"),
      context: {
        id,
        media: type,
      },
    });
  });
  mediaTypes.forEach((type) => {
    const mediaTypePosts = posts.filter((post) => post.node.mediaType == type);
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
          media: type,
          numPages,
          currentPage: i + 1,
        },
      });
    });
  });
  series.forEach((series) => {
    const seriesPosts = posts.filter((post) => post.node.seriesTitle == series);
    const postsPerPage = 15;
    const numPages = Math.ceil(seriesPosts.length / postsPerPage);
    Array.from({ length: numPages }).forEach((_, i) => {
      createPage({
        path:
          i === 0
            ? `/art/series/${slugify(series)}`
            : `/art/series/${slugify(series)}/${i + 1}`,
        component: path.resolve("./src/pageTemplates/art-page-template.tsx"),
        context: {
          limit: postsPerPage,
          skip: i * postsPerPage,
          series,
          numPages,
          currentPage: i + 1,
        },
      });
    });
  });
};

/*
exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;
  const result = await graphql(
    `
      {
        allContentfulPicture(filter: { mediaType: { eq: "Oil" } }) {
          edges {
            node {
              id
              image {
                gatsbyImageData(
                  placeholder: DOMINANT_COLOR
                  layout: CONSTRAINED
                  width: 300
                )
              }
              artist
              name
              alternativeText
              slug
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
  const posts = result.data.allContentfulPicture.edges;
  const postsPerPage = 15;
  const numPages = Math.ceil(posts.length / postsPerPage);
  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/art/oil` : `/art/oil/${i + 1}`,
      component: path.resolve("./src/pageTemplates/art-page-filters/oil.tsx"),
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1,
      },
    });
  });
};
*/
/*
exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}
*/
