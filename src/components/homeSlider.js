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

  const isVideo = (item) =>
    item?.image?.file?.contentType?.startsWith('video')

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

    let cancelled = false

    const run = async () => {
      while (!cancelled) {
        const currentIndex = indexRef.current
        const nextIndex =
          (currentIndex + 1) % slides.length

        const currentItem = slides[currentIndex]
        const nextItem = slides[nextIndex]

        const currentVideo =
          videoRefs.current[currentIndex]

        const nextVideo =
          videoRefs.current[nextIndex]

        const currentIsVideo = isVideo(currentItem)
        const nextIsVideo = isVideo(nextItem)

        // ---------------------------
        // IMAGE MODE
        // ---------------------------
        if (!currentIsVideo) {
          await new Promise((r) =>
            setTimeout(r, 5000)
          )

          indexRef.current = nextIndex
          continue
        }

        // ---------------------------
        // VIDEO MODE SAFETY CHECK
        // ---------------------------
        if (!currentVideo) {
          indexRef.current = nextIndex
          continue
        }

        // preload + reset
        await preloadVideo(currentVideo)
        currentVideo.currentTime = 0

        try {
          await currentVideo.play()
        } catch (e) {
          console.log('play error:', e)
        }

        // preload next
        if (nextIsVideo && nextVideo) {
          preloadVideo(nextVideo)
        }

        // ---------------------------
        // WAIT FOR CROSSFADE MOMENT
        // ---------------------------
        await new Promise((resolve) => {
          const check = () => {
            if (cancelled) return resolve()

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

        // ---------------------------
        // CROSSFADE
        // ---------------------------
        if (nextIsVideo && nextVideo) {
          nextVideo.currentTime = 0

          try {
            await nextVideo.play()
          } catch (e) {
            console.log(e)
          }
        }

        setTimeout(() => {
          if (currentVideo) currentVideo.pause()
        }, FADE_DURATION)

        indexRef.current = nextIndex
      }
    }

    run()

    return () => {
      cancelled = true
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
        const isActive =
          index === indexRef.current

        const video = isVideo(item)

        return (
          <div
            key={item.id}
            className="cinema-slide"
            style={{
              position: 'absolute',
              inset: 0,
              opacity: isActive ? 1 : 0,
              transition:
                'opacity 1.2s ease',
            }}
          >
            {/* OVERLAY */}
            <StaticImage
              src="../images/overlay.png"
              alt=""
              className="image-overlay"
            />

            {/* MEDIA */}
            {video ? (
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
                alt={item.image.description || ''}
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
