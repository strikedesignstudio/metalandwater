import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import ArtistListing from './artistListing'

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
      allContentfulArtist(sort: { artist: ASC }) {
        nodes {
          id
          artist
          slug
        }
      }
    }
  `)

  const { mission } = data.contentfulAboutPage
  const artists = data.allContentfulArtist.nodes

  return (
    <div className='about-mission'>
      <div
        dangerouslySetInnerHTML={{ __html: mission?.childMarkdownRemark?.html }}
      />
      <div className='artist-listing'>
        {artists.map((artist) => (
          <ArtistListing key={artist.id} artist={artist} />
        ))}
      </div>
    </div>
  )
}

export default Mission
