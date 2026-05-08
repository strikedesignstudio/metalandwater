import React, { useEffect, useRef, useState } from 'react'
import { GatsbyImage } from 'gatsby-plugin-image'
import { graphql, useStaticQuery } from 'gatsby'
import useWindowSize from '../utils/useWindowSize'

const FADE_DURATION = 1200
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

  const raw =
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
  // NORMALISE CONTENTFUL DATA
  // -------------------------
  const slides = raw
    .map((item) => {
      const file =
        item?.image?.file ||
        item?.image?.image?.file

      const isVideo =
        file?.contentType?.startsWith('video')

      return {
        id: item.id,
        credit: item.imageCredit,
        url: file?.url
          ? `https:${file.url}`
          : null,
        type: file?.contentType,
        isVideo,
        image:
          item?.image?.gatsbyImageData || null,
      }
    })
    .filter((s) => s.url || s.image)

  // -------------------------
  // PRELOAD VIDEO
  // -------------------------
  const preloadVideo = (video) =>
    new Promise((resolve) => {
      if (!video) return resolve()

      if (video.readyState >= 3)
        return resolve()

      video.load()
      video.oncanplaythrough = () => resolve()
    })

  // -------------------------
  // PRIME FIRST VIDEO (IMPORTANT FIX)
  // -------------------------
  useEffect(() => {
    const first = videoRefs.current[0]
    if (!first) return

    const run = async () => {
      try {
        first.currentTime = 0
        await first.play()
      } catch (e) {
        // autoplay may be blocked — ignore
        console.log(
          'initial autoplay blocked'
        )
      }
    }

    const t = setTimeout(run, 250)
    return () => clearTimeout(t)
  }, [])

  // -------------------------
  // MAIN PLAY ENGINE
  // -------------------------
  useEffect(() => {
    if (!slides.length || runningRef.current)
      return

    runningRef.current = true
    let cancelled = false

    const run = async () => {
      while (!cancelled) {
        const i = indexRef.current
        const next =
          (i + 1) % slides.length

        const current = slides[i]
        const nextSlide = slides[next]

        const currentVideo =
          videoRefs.current[i]

        const nextVideo =
          videoRefs.current[next]

        const currentIsVideo =
          current.isVideo

        const nextIsVideo =
          nextSlide.isVideo

        // -------------------------
        // IMAGE MODE
        // -------------------------
        if (!currentIsVideo) {
          await new Promise((r) =>
            setTimeout(r, 5000)
          )
          indexRef.current = next
          continue
        }

        // -------------------------
        // VIDEO SAFETY CHECK
        // -------------------------
        if (!currentVideo) {
          indexRef.current = next
          continue
        }

        await preloadVideo(currentVideo)

        currentVideo.currentTime = 0

        // SAFE PLAY (FIXES YOUR ISSUE)
        try {
          const p =
            currentVideo.play()
          if (p !== undefined)
            await p
        } catch (e) {
          console.log('play blocked', e)
        }

        // preload next
        if (nextIsVideo && nextVideo) {
          preloadVideo(nextVideo)
        }

        // -------------------------
        // WAIT FOR CROSSFADE POINT
        // -------------------------
        await new Promise((resolve) => {
          const check = () => {
            if (cancelled)
              return resolve()

            if (
              !currentVideo.duration ||
              currentVideo.paused
            ) {
              requestAnimationFrame(
                check
              )
              return
            }

            const remaining =
              currentVideo.duration -
              currentVideo.currentTime

            if (remaining <= OVERLAP) {
              resolve()
            } else {
              requestAnimationFrame(
                check
              )
            }
          }

          check()
        })

        // -------------------------
        // CROSSFADE START
        // -------------------------
        if (nextIsVideo && nextVideo) {
          nextVideo.currentTime = 0

          try {
            const p =
              nextVideo.play()
            if (p !== undefined)
              await p
          } catch (e) {}
        }

        setTimeout(() => {
          currentVideo?.pause()
        }, FADE_DURATION)

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
  // RENDER
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
                image={s.image}
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
