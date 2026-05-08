import React, { useEffect, useRef, useState } from 'react'
import { GatsbyImage } from 'gatsby-plugin-image'
import { graphql, useStaticQuery } from 'gatsby'
import useWindowSize from '../utils/useWindowSize'

const FADE = 1200
const OVERLAP = 0.6

const HomeSlider = () => {
  const data = useStaticQuery(graphql`
    query {
      contentfulHomePage {
        carouselImages {
          ... on ContentfulImageWrapper {
            id
            imageCredit

            image {
              gatsbyImageData
              file {
                url
                contentType
              }
            }
          }
        }
      }
    }
  `)

  const rawSlides =
    data?.contentfulHomePage?.carouselImages || []

  const { width, height } = useWindowSize()
  const isMobile = width < 601

  const [h, setH] = useState(800)

  const videoRefs = useRef([])
  const indexRef = useRef(0)
  const runningRef = useRef(false)

  useEffect(() => {
    setH(height)
  }, [height])

  // -------------------------
  // 1. NORMALISE CONTENTFUL
  // -------------------------
  const slides = rawSlides
    .map((item) => {
      const file =
        item?.image?.file ||
        item?.image?.image?.file

      const isVideo =
        file?.contentType?.startsWith('video')

      return {
        id: item.id,
        credit: item.imageCredit,
        url: file?.url ? `https:${file.url}` : null,
        type: file?.contentType,
        isVideo,
        gatsbyImageData:
          item?.image?.gatsbyImageData,
      }
    })
    .filter((s) => s.url || s.gatsbyImageData)

  // -------------------------
  // 2. PRELOAD VIDEO
  // -------------------------
  const preload = (video) =>
    new Promise((res) => {
      if (!video) return res()

      if (video.readyState >= 3) return res()

      video.load()
      video.oncanplaythrough = () => res()
    })

  // -------------------------
  // 3. PLAY ENGINE (NO STATE DEPENDENCY)
  // -------------------------
  useEffect(() => {
    if (!slides.length || runningRef.current) return

    runningRef.current = true
    let cancelled = false

    const run = async () => {
      while (!cancelled) {
        const i = indexRef.current
        const next = (i + 1) % slides.length

        const current = slides[i]
        const nextSlide = slides[next]

        const currentVideo =
          videoRefs.current[i]

        const nextVideo =
          videoRefs.current[next]

        // -------------------
        // IMAGE MODE
        // -------------------
        if (!current.isVideo) {
          await new Promise((r) =>
            setTimeout(r, 5000)
          )
          indexRef.current = next
          continue
        }

        // -------------------
        // VIDEO MODE SAFETY
        // -------------------
        if (!currentVideo) {
          indexRef.current = next
          continue
        }

        await preload(currentVideo)

        currentVideo.currentTime = 0

        try {
          await currentVideo.play()
        } catch (e) {}

        if (
          nextSlide.isVideo &&
          nextVideo
        ) {
          preload(nextVideo)
        }

        // -------------------
        // WAIT FOR OVERLAP POINT
        // -------------------
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

            if (remaining <= OVERLAP) {
              resolve()
            } else {
              requestAnimationFrame(check)
            }
          }

          check()
        })

        // -------------------
        // CROSSFADE
        // -------------------
        if (
          nextSlide.isVideo &&
          nextVideo
        ) {
          nextVideo.currentTime = 0
          nextVideo.play()
        }

        setTimeout(() => {
          currentVideo?.pause()
        }, FADE)

        indexRef.current = next
      }
    }

    run()

    return () => {
      cancelled = true
      runningRef.current = false
    }
  }, [slides])

  // -------------------------
  // 4. RENDER
  // -------------------------
  return (
    <div
      className="home-slider-container"
      style={{
        height: isMobile
          ? `${h}px`
          : '100vh',
      }}
    >
      {slides.map((s, i) => {
        const active =
          i === indexRef.current

        return (
          <div
            key={s.id}
            className="cinema-slide"
            style={{
              position: 'absolute',
              inset: 0,
              opacity: active ? 1 : 0,
              transition:
                'opacity 1.2s ease',
            }}
          >
            {/* IMAGE */}
            {!s.isVideo && (
              <GatsbyImage
                image={s.gatsbyImageData}
                alt=""
                className="home-slide-image"
              />
            )}

            {/* VIDEO */}
            {s.isVideo && (
              <video
                ref={(el) =>
                  (videoRefs.current[i] = el)
                }
                className="home-slide-image"
                muted
                playsInline
                preload={
                  i === 0
                    ? 'auto'
                    : 'none'
                }
              >
                <source
                  src={s.url}
                  type={s.type}
                />
              </video>
            )}

            {/* OVERLAY */}
            <div className="image-overlay" />

            {/* CREDIT */}
            <p className="home-credit">
              {s.credit}
            </p>
          </div>
        )
      })}
    </div>
  )
}

export default HomeSlider
