import React from 'react'
import Slider from 'react-slick'
import { GatsbyImage } from 'gatsby-plugin-image'

function NextArrow(props) {
  const { onClick } = props
  return (
    <div
      className={props.addClassName}
      onClick={onClick}
      onKeyDown={onClick}
      role='button'
      tabIndex={0}
      aria-label='go to next'
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 30 30'
        className='hero-svg'
      >
        <path
          id='Path_118'
          data-name='Path 118'
          d='M0,8,5.436,0,11,8'
          transform='translate(19.688 9.5) rotate(90)'
          fill='none'
        />
        <g id='Ellipse_184' data-name='Ellipse 184' fill='none'>
          <circle cx='15' cy='15' r='14.5' />
        </g>
      </svg>
    </div>
  )
}

function PrevArrow(props) {
  const { onClick } = props
  return (
    <div
      className={props.addClassName}
      onClick={onClick}
      onKeyDown={onClick}
      role='button'
      tabIndex={0}
      aria-label='go to previous'
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 30 30'
        className='hero-svg'
      >
        <path
          id='Path_118'
          data-name='Path 118'
          d='M0,0,5.436,8,11,0'
          transform='translate(18.313 9.5) rotate(90)'
          fill='none'
        />
        <g id='Ellipse_184' data-name='Ellipse 184' fill='none'>
          <circle cx='15' cy='15' r='14.5' />
        </g>
      </svg>
    </div>
  )
}

const ImageSlider = ({ images }) => {
  const settings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    nextArrow: <NextArrow addClassName='next-button home-next-button' />,
    prevArrow: <PrevArrow addClassName='prev-button home-prev-button' />,
    useTransform: false,
  }

  return (
    <Slider {...settings}>
      {images.map((image) => (
        <div key={image.id}>
          <GatsbyImage
            image={image.image.gatsbyImageData}
            alt={image.image.description}
          ></GatsbyImage>
          <p className='image-credit'>{image.imageCredit}</p>
        </div>
      ))}
    </Slider>
  )
}

export default ImageSlider
