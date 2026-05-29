import React, { useRef } from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'
import HomeSlider from '../components/homeSlider'
import Seo from '../components/seo'

const Index = ({ data }) => {
  const sliderRef = useRef()

  const aboutText = data.contentfulAboutPage?.aboutText
  const artists   = data.allContentfulArtist?.nodes || []
  const contact   = data.contentfulContactPage

  return (
    <Layout onAdvance={() => sliderRef.current?.advance()}>

      <section id="home" className="page-section">
        <HomeSlider
          ref={sliderRef}
          onReady={() => {}}
        />
      </section>

      <section id="artists" className="page-section">
        <div className="artists-page">
          {artists.map((artist) => (
            <a
              key={artist.id}
              href={artist.slug}
              target="_blank"
              rel="noreferrer"
              className="artist-listing-item"
            >
              {artist.artist}
            </a>
          ))}
        </div>
      </section>

      <section id="about" className="page-section">
        <div
          className="about-text"
          dangerouslySetInnerHTML={{ __html: aboutText?.childMarkdownRemark?.html }}
        />
      </section>

      <section id="contact" className="page-section">
        <div className="contact-page">
          {contact?.email && (
            <a href={`mailto:${contact.email}`} className="contact-email">
              {contact.email}
            </a>
          )}
          {contact?.instagram && (
            <a
              href={contact.instagram}
              target="_blank"
              rel="noreferrer"
              className="contact-instagram"
            >
              Instagram
            </a>
          )}
        </div>
      </section>

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
    allContentfulArtist(sort: { artist: ASC }) {
      nodes {
        id
        artist
        slug
      }
    }
    contentfulContactPage {
      email
      instagram
    }
  }
`

export const Head = () => <Seo />
export default Index
