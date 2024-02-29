import React, { useState, useEffect } from 'react'
import Slider from 'react-slick'
import { GatsbyImage, StaticImage } from 'gatsby-plugin-image'
import { Link, graphql, useStaticQuery } from 'gatsby'
import useWindowSize from '../utils/useWindowSize'

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

const HomeSlider = () => {
  const data = useStaticQuery(graphql`
    query {
      contentfulHomePage {
        carouselImages {
          id
          gatsbyImageData
          description
        }
      }
    }
  `)
  const [initialHeight, setInitialHeight] = useState(800)
  const { width, height } = useWindowSize()
  const isMobile = width < 601
  const images = data.contentfulHomePage.carouselImages

  useEffect(() => {
    setInitialHeight(height)
  }, [])

  const settings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    nextArrow: <NextArrow addClassName='next-button home-next-button' />,
    prevArrow: <PrevArrow addClassName='prev-button home-prev-button' />,
    useTransform: false,
    autoplay: true,
    autoplaySpeed: 5000,
  }

  return (
    <div
      className='home-slider-container'
      style={{ height: `${isMobile ? initialHeight + 'px' : '100vh'}` }}
    >
      <Slider
        {...settings}
        className='home-slider'
        style={{ height: `${isMobile ? initialHeight + 'px' : '100vh'}` }}
      >
        {images?.map((image, index) => (
          <div className='home-slide-container' key={index}>
            <StaticImage
              src='../images/overlay.png'
              className='image-overlay'
              style={{ height: height + 'px' }}
            ></StaticImage>
            <GatsbyImage
              image={image?.gatsbyImageData}
              alt={image?.description}
              className='home-slide-image'
              style={{ height: height + 'px' }}
            ></GatsbyImage>
          </div>
        ))}
      </Slider>
    </div>
  )
}

export default HomeSlider
