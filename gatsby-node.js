const _ = require(`lodash`)
const Promise = require(`bluebird`)
const path = require(`path`)
const slug = require(`slug`)
const slash = require(`slash`)

// Implement the Gatsby API “createNode”. This is
// called whenever a new node is created (or updated).
// exports.onCreateNode = ({ node }) => {
//   console.log(node.internal.type)
// }


// Implement the Gatsby API “createPages”. This is
// called to create pages.
exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators
  return new Promise((resolve, reject) => {
    graphql(`
      {
        allPostsJson(limit: 1000) {
          edges {
            node {
              title
              body
            }
          }
        }
      }
    `).then(result => {
      if (result.errors) {
        reject(new Error(result.errors))
      }

      const postTemplate = path.resolve(`src/templates/symptom-page.js`)

      _.each(result.data.allPostsJson.edges, edge => {
        // Gatsby uses Redux to manage its internal state.
        // Plugins and sites can use functions like "createPage"
        // to interact with Gatsby.
        createPage({
          // Each page is required to have a `path` as well
          // as a template component. The `context` is
          // optional but is often necessary so the template
          // can query data specific to each page.
          path: `/${slug(edge.node.title)}/`,
          component: slash(postTemplate),
          context: {
            title: edge.node.title,
            body: edge.node.body
          },
        })
      })

      resolve()
    })
  })
}