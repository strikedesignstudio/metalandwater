import React from 'react'

const ArtistListing = ({ artist }) => {
  return (
    <span className='artist-listing-item'>
      {artist.artist}
    </span>
  )
}

export default ArtistListing
