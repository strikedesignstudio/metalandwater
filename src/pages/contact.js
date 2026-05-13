import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import Seo from '../components/seo'

const Contact = ({ data }) => {
  const { contactText } = data.contentfulContactPage
  return (
    <Layout>
      <div
        className='contact-text'
        dangerouslySetInnerHTML={{ __html: contactText?.childMarkdownRemark?.html }}
      />
    </Layout>
  )
}

export const query = graphql`
  query {
    contentfulContactPage {
      contactText {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`

export const Head = () => <Seo title='Contact' />
export default Contact
