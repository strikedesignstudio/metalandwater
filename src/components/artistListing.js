import React from 'react'

const ArtistListing = ({ artist }) => {
  return (
    <a href={artist.slug} target='_blank' rel='noreferrer' className='artist-listing-item' >
      {artist.artist}
  </a>
  )
}

export default ArtistListing
