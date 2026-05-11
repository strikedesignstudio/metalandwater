import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'

const Mission = () => {
  const data = useStaticQuery(graphql`
    query {
      allContentfulArtist(sort: { fields: [artist], order: ASC }) {
        nodes {
          id
          artist
          externalUrl
        }
      }
    }
  `)

  const artists = data.allContentfulArtist.nodes

  return (
    <div className='about-mission'>
      {artists.map((artist) => (
        
          key={artist.id}
          href={artist.externalUrl}
          target='_blank'
          rel='noreferrer'
          className='artist-listing-item'
        >
          {artist.artist}
        </a>
      ))}
    </div>
  )
}

export default Mission
