import React from 'react'
import { Link } from 'gatsby'

const ArtistListing = ({ artist }) => {
  return (
    <Link
      to={`${artist.slug}`}
      className='artist-listing-item'
    >
      {artist.artist}
    </Link>
  )
}

export default ArtistListing
