/**
 * SEO component that queries for data with
 * Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/how-to/querying-data/use-static-query/
 */

import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"

function Seo({ description, title, keywords, image, children }) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
            keywords
          }
        }
      }
    `
  )

  const metaDescription = description || site.siteMetadata.description
  const defaultTitle = site.siteMetadata?.title
  const metaKeywords = keywords
    ? site.siteMetadata?.keywords.concat(", ", keywords)
    : site.siteMetadata?.keywords

  return (
    <>
      <title>{title ? `${title} | ${defaultTitle}` : `${defaultTitle}`}</title>
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={metaKeywords} />
      <meta
        property="og:title"
        content={title ? `${title} | ${defaultTitle}` : `${defaultTitle}`}
      />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={`https:${image}`} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:creator" content={site.siteMetadata?.author || ``} />
      <meta
        name="twitter:title"
        content={title ? `${title} | ${defaultTitle}` : `${defaultTitle}`}
      />
      <meta name="twitter:description" content={metaDescription} />
      <meta property="twitter:image" content={`https:${image}`} />
      {children}
    </>
  )
}

export default Seo
