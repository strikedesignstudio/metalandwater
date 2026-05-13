import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import Seo from '../components/seo'

const Contact = ({ data }) => {
  const { email, instagram } = data.contentfulContact
  return (
    <Layout>
      <div className='contact-page'>
        {email && (
          <a href={`mailto:${email}`} className='contact-email'>
            {email}
          </a>
        )}
        {instagram && (
          <a 
            href={instagram}
            target='_blank'
            rel='noreferrer'
            className='contact-instagram'
          >
            Instagram
          </a>
        )}
      </div>
    </Layout>
  )
}

export const query = graphql`
  query {
    contentfulContactPage {
      email
      instagram
    }
  }
`

export const Head = () => <Seo title='Contact' />
export default Contact
