import React from 'react'
import Layout from '../components/layout'
import Seo from '../components/seo'
import { graphql, Link } from 'gatsby'
import { Tooltip } from 'react-tooltip'
import { GatsbyImage } from 'gatsby-plugin-image'

const Artists = ({ data }) => {
  const artists = data.allContentfulArtist.nodes
  return (
    <Layout>
      <div className='artists-container'>
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
        {artists.map((artist) => (
          <Tooltip
            id={artist.id}
            key={artist.id}
            place='right'
            float={true}
            clickable
            className='artist-tooltip'
          >
            <GatsbyImage
              image={artist.featuredImage.image.gatsbyImageData}
            ></GatsbyImage>
          </Tooltip>
        ))}
      </div>
    </Layout>
  )
}

export const query = graphql`
  query {
    allContentfulArtist {
      nodes {
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
