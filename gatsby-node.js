const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `content` })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return graphql(`
    {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              tags
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `).then(result => {

    // Create bug notes pages
    let bugNotesNodes = result.data.allMarkdownRemark.edges.filter(e => {
      let { node: n } = e;
      return n.frontmatter && n.frontmatter.tags && n.frontmatter.tags.includes('bug-notes');
    })
    bugNotesNodes.forEach(({ node }) => {
      createPage({
        path: node.fields.slug,
        component: path.resolve(`./src/templates/bug-notes.js`),
        context: {
          // Data passed to context is available
          // in page queries as GraphQL variables.
          slug: node.fields.slug,
        },
      })
    })
  })
}

