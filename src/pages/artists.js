import React from 'react'
import Layout from '../components/layout'
import Seo from '../components/seo'
import { graphql } from 'gatsby'
import ArtistListing from '../components/artistListing'

const Artists = ({ data }) => {
  const artists = data.contentfulArtistsPage.artistListing

  return (
    <Layout>
      <div className='artists-page'>
        {artists.map((artist) => (
          <ArtistListing artist={artist} key={artist.id}></ArtistListing>
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
            gatsbyImageData(width: 1000)
          }
        }
      }
    }
  }
`

export const Head = () => <Seo title='Artists' />

export default Artists
