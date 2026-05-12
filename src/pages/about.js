import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import Seo from '../components/seo'

const About = ({ data }) => {
  const { aboutText } = data.contentfulAboutPage
  return (
    <Layout className='about-page'>
      <div
        className='about-text'
        dangerouslySetInnerHTML={{ __html: aboutText?.childMarkdownRemark?.html }}
      />
    </Layout>
  )
}

export const query = graphql`
  query {
    contentfulAboutPage {
      aboutText {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`

export const Head = () => <Seo title='About' />
export default About
