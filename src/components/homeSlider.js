import React, { useState, useEffect } from 'react'
import Slider from 'react-slick'
import { GatsbyImage, StaticImage } from 'gatsby-plugin-image'
import { graphql, useStaticQuery } from 'gatsby'
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
        viewBox='0 0 200 200'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        className='hero-svg'
      >
        <path
          fill-rule='evenodd'
          clip-rule='evenodd'
          d='M100 0C44.7715 0 0 44.7715 0 100C0 155.229 44.7715 200 100 200C155.229 200 200 155.229 200 100C200 44.7715 155.229 0 100 0ZM65.5967 154.604L144.097 108.104L158.86 99.3574L143.973 90.8242L65.4731 45.8242L55.5269 63.1758L119.14 99.6426L55.4033 137.396L65.5967 154.604Z'
          fill='white'
        />
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
        className='hero-svg'
        viewBox='0 0 200 200'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          fill-rule='evenodd'
          clip-rule='evenodd'
          d='M100 200C155.229 200 200 155.229 200 100C200 44.7715 155.229 0 100 0C44.7715 0 0 44.7715 0 100C0 155.229 44.7715 200 100 200ZM134.403 45.3965L55.9033 91.8965L41.1396 100.643L56.0269 109.176L134.527 154.176L144.473 136.824L80.8604 100.357L144.597 62.6035L134.403 45.3965Z'
          fill='white'
        />
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
      <StaticImage
        src='../images/overlay.png'
        className='image-overlay'
        style={{ height: height + 'px' }}
      ></StaticImage>
      <Slider
        {...settings}
        className='home-slider'
        style={{ height: `${isMobile ? initialHeight + 'px' : '100vh'}` }}
      >
        {images?.map((image, index) => (
          <div className='home-slide-container' key={index}>
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
