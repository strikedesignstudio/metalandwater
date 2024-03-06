import React from 'react'
import Layout from '../components/layout'
import Seo from '../components/seo'
import { graphql, Link } from 'gatsby'
import { Tooltip } from 'react-tooltip'
import { GatsbyImage } from 'gatsby-plugin-image'
import useWindowSize from '../utils/useWindowSize'

const Artists = ({ data }) => {
  const artists = data.contentfulArtistsPage.artistListing
  const { width } = useWindowSize()
  const isMobile = width < 750
  return (
    <Layout>
      <div className='page-container artists-page'>
        {artists.map((artist) => (
          <Link
            key={artist.id}
            to={`/artist/${artist.slug}`}
            className='artist-listing-item'
            data-tooltip-id={artist.id}
          >
            {artist.artist}
          </Link>
        ))}
        {!isMobile &&
          artists.map((artist) => (
            <Tooltip
              id={artist.id}
              key={artist.id}
              noArrow
              place='bottom'
              clickable
              className='artist-tooltip'
            >
              <Link to={`/artist/${artist.slug}`}>
                <GatsbyImage
                  image={artist.featuredImage.image.gatsbyImageData}
                ></GatsbyImage>
              </Link>
            </Tooltip>
          ))}
      </div>
    </Layout>
  )
}

export const query = graphql`
  query {
    contentfulArtistsPage {
      artistListing {
        artist
        slug
        id
        featuredImage {
          image {
            gatsbyImageData
          }
        }
      }
    }
  }
`

export const Head = () => <Seo title='Artists' />

export default Artists
