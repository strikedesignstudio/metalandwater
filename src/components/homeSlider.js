import React, { useEffect, useRef, useState } from 'react'
import { GatsbyImage, StaticImage } from 'gatsby-plugin-image'
import { graphql, useStaticQuery } from 'gatsby'
import useWindowSize from '../utils/useWindowSize'

const FADE_DURATION = 1200
const OVERLAP_TIME = 0.6

const HomeSlider = () => {
  const data = useStaticQuery(graphql`
    query {
      contentfulHomePage {
        carouselImages {
          id
          image {
            description
            gatsbyImageData
            file {
              url
              contentType
            }
          }
          imageCredit
        }
      }
    }
  `)

  const slides = data.contentfulHomePage.carouselImages

  const { width, height } = useWindowSize()

  const isMobile = width < 601

  const [initialHeight, setInitialHeight] = useState(800)
  const [activeIndex, setActiveIndex] = useState(0)

  const videoRefs = useRef([])

  useEffect(() => {
    setInitialHeight(height)
  }, [height])

  // PRELOAD VIDEO
  const preloadVideo = (video) => {
    return new Promise((resolve) => {
      if (!video) return resolve()

      if (video.readyState >= 3) {
        resolve()
      } else {
        video.load()

        video.addEventListener(
          'canplaythrough',
          () => resolve(),
          { once: true }
        )
      }
    })
  }

  // PLAY SEQUENCE
  useEffect(() => {
    let animationFrame

    const playSequence = async () => {
      const currentVideo = videoRefs.current[activeIndex]

      if (!currentVideo) return

      await preloadVideo(currentVideo)

      currentVideo.currentTime = 0

      try {
        await currentVideo.play()
      } catch (err) {
        console.log(err)
      }

      // preload NEXT video
      const nextIndex =
        (activeIndex + 1) % slides.length

      const nextVideo =
        videoRefs.current[nextIndex]

      preloadVideo(nextVideo)

      const monitor = () => {
        if (!currentVideo.duration) {
          animationFrame =
            requestAnimationFrame(monitor)

          return
        }

        const remaining =
          currentVideo.duration -
          currentVideo.currentTime

        // CROSSFADE
        if (
          remaining <= OVERLAP_TIME &&
          remaining > 0
        ) {
          if (nextVideo) {
            nextVideo.currentTime = 0

            nextVideo.play()

            setTimeout(() => {
              currentVideo.pause()

              setActiveIndex(nextIndex)
            }, FADE_DURATION)
          }

          return
        }

        animationFrame =
          requestAnimationFrame(monitor)
      }

      monitor()
    }

    playSequence()

    return () => {
      cancelAnimationFrame(animationFrame)
    }
  }, [activeIndex, slides.length])

  return (
    <div
      className="home-slider-container"
      style={{
        height: isMobile
          ? `${initialHeight}px`
          : '100vh',
      }}
    >
      {slides?.map((item, index) => {
        const isVideo =
          item?.image?.file?.contentType ===
          'video/webm'

        const isActive = index === activeIndex

        return (
          <div
            key={item.id}
            className={`cinema-slide ${
              isActive ? 'active' : ''
            }`}
            style={{
              height: isMobile
                ? `${initialHeight}px`
                : '100vh',
            }}
          >
            <StaticImage
              src="../images/overlay.png"
              className="image-overlay"
              alt=""
              style={{
                height: isMobile
                  ? `${initialHeight}px`
                  : '100vh',
              }}
            />

            {isVideo ? (
              <video
                ref={(el) =>
                  (videoRefs.current[index] = el)
                }
                className="home-slide-image"
                src={item.image.file.url}
                muted
                playsInline
                preload={index === 0 ? 'auto' : 'none'}
              />
            ) : (
              <GatsbyImage
                image={item.image.gatsbyImageData}
                alt={
                  item.image.description || ''
                }
                className="home-slide-image"
              />
            )}

            <p className="home-credit">
              {item.imageCredit}
            </p>
          </div>
        )
      })}
    </div>
  )
}

export default HomeSlider
