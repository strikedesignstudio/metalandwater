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
            gatsbyImageData
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

  const videoRefs = useRef([])
  const indexRef = useRef(0)
  const runningRef = useRef(false)

  useEffect(() => {
    setInitialHeight(height)
  }, [height])

  const preloadVideo = (video) =>
    new Promise((resolve) => {
      if (!video) return resolve()

      if (video.readyState >= 3) return resolve()

      video.load()
      video.oncanplaythrough = () => resolve()
    })

  useEffect(() => {
    if (!slides.length || runningRef.current) return

    runningRef.current = true

    const play = async () => {
      while (runningRef.current) {
        const currentIndex = indexRef.current
        const nextIndex =
          (currentIndex + 1) % slides.length

        const currentVideo =
          videoRefs.current[currentIndex]

        const nextVideo =
          videoRefs.current[nextIndex]

        const currentSlide =
          slides[currentIndex]

        const nextSlide =
          slides[nextIndex]

        const currentIsVideo =
          currentSlide?.image?.file?.contentType?.startsWith(
            'video'
          )

        const nextIsVideo =
          nextSlide?.image?.file?.contentType?.startsWith(
            'video'
          )

        // IMAGE MODE (simple timeout)
        if (!currentIsVideo) {
          await new Promise((r) =>
            setTimeout(r, 5000)
          )
          indexRef.current = nextIndex
          continue
        }

        // VIDEO MODE
        if (!currentVideo) {
          indexRef.current = nextIndex
          continue
        }

        await preloadVideo(currentVideo)

        currentVideo.currentTime = 0

        try {
          await currentVideo.play()
        } catch (e) {
          console.log(e)
        }

        if (nextIsVideo && nextVideo) {
          preloadVideo(nextVideo)
        }

        // WAIT UNTIL CROSSFADE MOMENT
        await new Promise((resolve) => {
          const check = () => {
            if (
              !currentVideo.duration ||
              currentVideo.paused
            ) {
              requestAnimationFrame(check)
              return
            }

            const remaining =
              currentVideo.duration -
              currentVideo.currentTime

            if (remaining <= OVERLAP_TIME) {
              resolve()
            } else {
              requestAnimationFrame(check)
            }
          }

          check()
        })

        // CROSSFADE
        if (nextIsVideo && nextVideo) {
          nextVideo.currentTime = 0
          nextVideo.play()
        }

        setTimeout(() => {
          currentVideo.pause()
        }, FADE_DURATION)

        indexRef.current = nextIndex
      }
    }

    play()

    return () => {
      runningRef.current = false
    }
  }, [slides])

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
        const isVideo =
          item?.image?.file?.contentType?.startsWith(
            'video'
          )

        const isActive =
          index === indexRef.current

        return (
          <div
            key={item.id}
            className="cinema-slide"
            style={{
              opacity: isActive ? 1 : 0,
              transition:
                'opacity 1.2s ease',
              position: 'absolute',
              inset: 0,
            }}
          >
            <StaticImage
              src="../images/overlay.png"
              alt=""
              className="image-overlay"
            />

            {isVideo ? (
              <video
                ref={(el) =>
                  (videoRefs.current[index] = el)
                }
                className="home-slide-image"
                muted
                playsInline
                preload="auto"
              >
                <source
                  src={`https:${item.image.file.url}`}
                  type={
                    item.image.file
                      .contentType
                  }
                />
              </video>
            ) : (
              <GatsbyImage
                image={
                  item.image.gatsbyImageData
                }
                alt={item.image.description}
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
