import React, {useState} from 'react'
import { Link } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'

const ArtistListing = ({artist}) => {
 const [active, setActive] = useState(false)

 const showTip = () => {
     setActive(true) 
 }

 const hideTip = () => {
   setActive(false)
 }
  return (
    <Link
      to={`/artist/${artist.slug}`}
      className='artist-listing-item'
      onMouseEnter={showTip}
      onMouseLeave={hideTip}
    >
      {artist.artist}
      {active && (
        <Link to={`/artist/${artist.slug}`} className='artist-tooltip'>
          <GatsbyImage
            image={artist.featuredImage.image?.gatsbyImageData}
          ></GatsbyImage>
        </Link>
      )}
    </Link>
  )
}

export default ArtistListing