import React, { useState, useEffect } from 'react'
import { useStaticQuery, graphql } from 'gatsby'

const HomeVideo = () => {
  const data = useStaticQuery(graphql`
    query {
      contentfulHomePage {
        heroVideoLink
      }
    }
  `)
  const [width, setWidth] = useState('100vw')
  const [height, setHeight] = useState('100vh')

  useEffect(() => {
    setWidth(window.innerWidth)
    setHeight(window.innerHeight)
  }, [])

  useEffect(() => {
    const handleWindowResize = () => {
      if (window.innerWidth > 600) {
        setWidth(window.innerWidth)
        setHeight(window.innerHeight)
      } else {
        setWidth(window.innerWidth)
      }
    }
    window.addEventListener('resize', handleWindowResize)

    return () => window.removeEventListener('resize', handleWindowResize)
  }, [])

  const minHorizontalHeight = (width / 9) * 16

  const minHorizontalWidth = (height * 16) / 9

  const minVerticalHeight = (width / 9) * 16

  const minVerticalWidth = (height * 16) / 9

  return (
    <div style={{ height: height, width: width }} className='hero-container'>
      {width < height / 1.5 ? (
        <div
          className='hero-video-container'
          style={{ height: height, width: width }}
        >
          <iframe
            style={
              height / width >= 1.77
                ? { minHeight: height, minWidth: minVerticalWidth }
                : { minHeight: minVerticalHeight, minWidth: width }
            }
            src={`${data.contentfulHomePage.heroVideoLink}?autoplay=1&muted=1&playsinline=1&controls=0&loop=1&autopause=0`}
            title='Pacific reel'
          />
        </div>
      ) : (
        <div
          className='hero-video-container'
          style={{ height: height, width: width }}
        >
          <iframe
            style={
              height / width >= 0.56
                ? { minHeight: height, minWidth: minHorizontalWidth }
                : { minHeight: minHorizontalHeight, minWidth: width }
            }
            src={`${data.contentfulHomePage.heroVideoLink}?autoplay=1&muted=1&playsinline=1&controls=0&loop=1&autopause=0`}
            title='Pacific reel'
          />
        </div>
      )}
    </div>
  )
}

export default HomeVideo
