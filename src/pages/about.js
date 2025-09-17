import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import Seo from '../components/seo'
import DropdownText from '../components/dropdownText'
import AboutImgSlider from '../components/aboutImgSlider'

const About = ({ data }) => {
  const { aboutText, contact, images } =
    data.contentfulAboutPage
  return (
    <Layout>
      <div className='about-carousel-container'>
        <AboutImgSlider images={images}></AboutImgSlider>
      </div>
      <div
        className='about-text'
        dangerouslySetInnerHTML={{ __html: aboutText?.childMarkdownRemark?.html }}
      ></div>
      
      <div className='about-contact'>
        <p>Contact</p>{' '}
        <div className='about-contact-emails'>
          {contact.map((contact) => (
            <div key={contact.id}>
              <p>{contact.name}</p>
              <p>{contact.role}</p>
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
              <a href={`mailto:${contact.xemail}`}>{contact.xemail}</a>
            </div>
          ))}
        </div>
      </div>
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
      contact {
        id
        name
        role
        email
        xemail
      }
     
      images {
        id
        imageCredit
        image {
          gatsbyImageData
          description
        }
      }
    }
  }
`

export const Head = () => <Seo title='About' />

export default About
