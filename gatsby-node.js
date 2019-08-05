const path = require("path");
const { createFilePath } = require("gatsby-source-filesystem");

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions;

  const result = await graphql(`
    {
      allMarkdownRemark(
        sort: { order: ASC, fields: [frontmatter___date] }
        filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
      ) {
        edges {
          previous {
            id
          }
          node {
            id
            fields {
              slug
            }
            frontmatter {
              title
              templateKey
              date(formatString: "MMMM DD, YYYY")
              description
              tags
            }
          }
          next {
            id
          }
        }
      }
    }
  `);
  if (result.errors) {
    result.errors.forEach(e => console.error(e.toString()));
    return Promise.reject(result.errors);
  }

  const posts = result.data.allMarkdownRemark.edges;

  posts.forEach(edge => {
    const { node, previous, next } = edge;
    const id = node.id;

    createPage({
      path: node.fields.slug,
      tags: node.frontmatter.tags,
      component: path.resolve(
        `src/templates/${String(node.frontmatter.templateKey)}.tsx`
      ),
      // additional data can be passed via context
      context: {
        id,
        previousId: previous != null ? previous.id : null,
        hasPrevious: previous != null,
        nextId: next != null ? next.id : null,
        hasNext: next != null,
        latestPosts: posts.slice(0, 3).map(p => p.node)
      }
    });
  });

  // Tag pages:
  let tags = [];
  // Iterate through each post, putting all found tags into `tags`
  posts.forEach(edge => {
    if (edge.node.frontmatter.tags) {
      tags = tags.concat(edge.node.frontmatter.tags);
    }
  });
  // Eliminate duplicate tags
  tags = [...new Set(tags)];

  // Make tag pages
  tags.forEach(tag => {
    const tagPath = `/tags/${tag}/`;

    createPage({
      path: tagPath,
      component: path.resolve(`src/templates/tags.tsx`),
      context: {
        tag
      }
    });
  });

  // Make BlogList Page
  const postsPerPage = 10;
  const numPages = Math.ceil(posts.length / postsPerPage);
  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? "/" : `/blogs/${i + 1}`,
      component: path.resolve("./src/templates/blog-list-template.tsx"),
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1,
        latestPosts: posts.slice(0, 3).map(p => p.node)
      }
    });
  });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: `slug`,
      node,
      value
    });
  }
};
