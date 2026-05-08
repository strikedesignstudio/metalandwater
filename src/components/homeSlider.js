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
          imageCredit

          image {
            description

            gatsbyImageData(
              placeholder: NONE
              layout: FULL_WIDTH
            )

            file {
              url
              contentType
            }
          }
        }
      }
    }
  `)

  const slides =
    data?.contentfulHomePage?.carouselImages || []

  const { width, height } = useWindowSize()

  const isMobile = width < 601

  const [initialHeight, setInitialHeight] =
    useState(800)

  const [activeIndex, setActiveIndex] =
    useState(0)

  const videoRefs = useRef([])

  useEffect(() => {
    setInitialHeight(height)
  }, [height])

  // PRELOAD VIDEO
  const preloadVideo = (video) => {
    return new Promise((resolve) => {
      if (!video) {
        resolve()
        return
      }

      if (video.readyState >= 3) {
        resolve()
        return
      }

      video.load()

      video.addEventListener(
        'canplaythrough',
        () => resolve(),
        { once: true }
      )
    })
  }

  // PLAYBACK SEQUENCE
  useEffect(() => {
    if (!slides.length) return

    let animationFrame

    const playSequence = async () => {
      const currentSlide = slides[activeIndex]

      const currentVideo =
        videoRefs.current[activeIndex]

      // skip if not video
      const isCurrentVideo =
        currentSlide?.image?.file?.contentType?.startsWith(
          'video'
        )

      // preload next
      const nextIndex =
        (activeIndex + 1) % slides.length

      const nextSlide = slides[nextIndex]

      const nextVideo =
        videoRefs.current[nextIndex]

      const isNextVideo =
        nextSlide?.image?.file?.contentType?.startsWith(
          'video'
        )

      // VIDEO LOGIC
      if (isCurrentVideo && currentVideo) {
        await preloadVideo(currentVideo)

        currentVideo.currentTime = 0

        try {
          await currentVideo.play()
        } catch (err) {
          console.log(err)
        }

        // preload next video while current plays
        if (isNextVideo && nextVideo) {
          preloadVideo(nextVideo)
        }

        const monitor = () => {
          if (
            !currentVideo.duration ||
            currentVideo.paused
          ) {
            animationFrame =
              requestAnimationFrame(monitor)

            return
          }

          const remaining =
            currentVideo.duration -
            currentVideo.currentTime

          // START CROSSFADE
          if (
            remaining <= OVERLAP_TIME &&
            remaining > 0
          ) {
            // next is video
            if (isNextVideo && nextVideo) {
              nextVideo.currentTime = 0

              nextVideo.play()
            }

            setTimeout(() => {
              currentVideo.pause()

              setActiveIndex(nextIndex)
            }, FADE_DURATION)

            return
          }

          animationFrame =
            requestAnimationFrame(monitor)
        }

        monitor()
      } else {
        // IMAGE LOGIC
        setTimeout(() => {
          setActiveIndex(nextIndex)
        }, 5000)
      }
    }

    playSequence()

    return () => {
      cancelAnimationFrame(animationFrame)
    }
  }, [activeIndex, slides])

  return (
    <div
      className="home-slider-container"
      style={{
        height: isMobile
          ? `${initialHeight}px`
          : '100vh',
      }}
    >
      {slides.map((item, index) => {
        const contentType =
          item?.image?.file?.contentType || ''

        const isVideo =
          contentType.startsWith('video')

        const isActive =
          index === activeIndex

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
            {/* OVERLAY */}
            <StaticImage
              src="../images/overlay.png"
              alt=""
              className="image-overlay"
              style={{
                height: isMobile
                  ? `${initialHeight}px`
                  : '100vh',
              }}
            />

            {/* VIDEO */}
            {isVideo ? (
              <video
                ref={(el) =>
                  (videoRefs.current[index] = el)
                }
                className="home-slide-image"
                muted
                playsInline
                preload={
                  index === 0
                    ? 'auto'
                    : 'none'
                }
              >
                <source
                  src={`https:${item.image.file.url}`}
                  type={contentType}
                />
              </video>
            ) : (
              // IMAGE
              <GatsbyImage
                image={
                  item?.image?.gatsbyImageData
                }
                alt={
                  item?.image?.description ||
                  ''
                }
                className="home-slide-image"
              />
            )}

            {/* CREDIT */}
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
