import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'

const Mission = () => {
  const data = useStaticQuery(graphql`
    query {
      contentfulAboutPage {
        mission {
          childMarkdownRemark {
            html
          }
        }
      }
    }
  `)
  const {mission} = data.contentfulAboutPage
  return (
    <div
      className='about-mission'
      dangerouslySetInnerHTML={{ __html: mission?.childMarkdownRemark?.html }}
    ></div>
  )
}

export default Mission
