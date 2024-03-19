import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import Seo from '../components/seo'
import DropdownText from '../components/dropdownText'
import AboutImgSlider from '../components/aboutImgSlider'

const About = ({ data }) => {
  const { aboutText, contact, dropdownFields, images, images2 } =
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
      <div className='about-dropdown-container'>
        {dropdownFields.map((text) => (
          <DropdownText text={text} key={text.id}></DropdownText>
        ))}
      </div>
      <div className='about-carousel-container'>
        <AboutImgSlider images={images2}></AboutImgSlider>
      </div>
      <div className='about-contact'>
        <p>Contact</p>{' '}
        <div className='about-contact-emails'>
          {contact.map((contact) => (
            <div key={contact.id}>
              <p>{contact.name}</p>
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
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
        email
      }
      dropdownFields {
        id
        heading
        text {
          childMarkdownRemark {
            html
          }
        }
      }
      images {
        id
        imageCredit
        image {
          gatsbyImageData
          description
        }
      }
      images2 {
        id
        image {
          gatsbyImageData
          description
        }
        imageCredit
      }
    }
  }
`

export const Head = () => <Seo title='About' />

export default About
