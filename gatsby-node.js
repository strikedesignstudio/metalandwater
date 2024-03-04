const path = require('path')
exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions

  const result = await graphql(
    `
      query GetData {
        allContentfulArtist {
          edges {
            node {
              slug
            }
          }
        }
      }
    `
  )

  const artists = result.data.allContentfulArtist.edges

  artists.forEach(({ node }, index) => {
    const artistSlug = node.slug
    createPage({
      path: `/artist/${artistSlug}`,
      component: path.resolve(`./src/templates/singleArtist.js`),
      context: {
        slug: artistSlug,
      },
    })
  })
}
