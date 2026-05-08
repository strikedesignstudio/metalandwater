import React, { useEffect, useRef, useState, useCallback } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import useWindowSize from '../utils/useWindowSize'

// Crossfade duration in ms — tweak to taste
const FADE_MS = 900

const HomeSlider = () => {
  const data = useStaticQuery(graphql`
    query {
      contentfulHomePage {
        carouselImages {
          ... on ContentfulImageWrapper {
            id
            imageCredit
            image {
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

  const raw = data?.contentfulHomePage?.carouselImages || []
  const { width, height } = useWindowSize()
  const isMobile = width < 601

  // ─── Normalise slides ───────────────────────────────────────────────────────
  const slides = raw
    .map((item) => {
      const file = item?.image?.file || item?.image?.image?.file
      return {
        id:     item.id,
        credit: item.imageCredit,
        url:    file?.url ? `https:${file.url}` : null,
        type:   file?.contentType,
      }
    })
    .filter((s) => s.url)

  // ─── State ──────────────────────────────────────────────────────────────────
  // `current`    – the slide now visible / fading IN
  // `fadingFrom` – the slide fading OUT (null when stable)
  const [current,    setCurrent]    = useState(0)
  const [fadingFrom, setFadingFrom] = useState(null)

  const videoRefs      = useRef([])
  const isFadingRef    = useRef(false)   // guard against double-triggers
  const fadeTimerRef   = useRef(null)

  // ─── Boot: play first video ─────────────────────────────────────────────────
  useEffect(() => {
    const v = videoRefs.current[0]
    if (!v) return

    const attempt = () => {
      v.currentTime = 0
      v.play().catch(() => {
        // Autoplay blocked — wait for user gesture then retry
        const resume = () => { v.play().catch(() => {}); document.removeEventListener('click', resume) }
        document.addEventListener('click', resume, { once: true })
      })
    }

    // Small delay lets the DOM settle
    const t = setTimeout(attempt, 150)
    return () => clearTimeout(t)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slides.length])

  // ─── Preload: always keep the NEXT video buffered ───────────────────────────
  useEffect(() => {
    if (!slides.length) return
    const nextIdx  = (current + 1) % slides.length
    const nextVideo = videoRefs.current[nextIdx]
    if (nextVideo && nextVideo.preload !== 'auto') {
      nextVideo.preload = 'auto'
      nextVideo.load()
    }
  }, [current, slides.length])

  // ─── Transition to next slide ───────────────────────────────────────────────
  const advance = useCallback((fromIdx) => {
    if (isFadingRef.current) return
    if (fromIdx !== current)  return   // stale onEnded from a previous slide

    isFadingRef.current = true
    clearTimeout(fadeTimerRef.current)

    const nextIdx   = (fromIdx + 1) % slides.length
    const nextVideo = videoRefs.current[nextIdx]

    // Start the incoming video immediately so it's playing behind the fade
    if (nextVideo) {
      nextVideo.currentTime = 0
      nextVideo.play().catch(() => {})
    }

    // Swap state in one batch → CSS transitions fire simultaneously
    setFadingFrom(fromIdx)
    setCurrent(nextIdx)

    // After fade completes, clean up
    fadeTimerRef.current = setTimeout(() => {
      const oldVideo = videoRefs.current[fromIdx]
      if (oldVideo) {
        oldVideo.pause()
        oldVideo.currentTime = 0
      }
      setFadingFrom(null)
      isFadingRef.current = false
    }, FADE_MS + 50) // slight buffer past the CSS transition
  }, [current, slides.length])

  // ─── Cleanup on unmount ─────────────────────────────────────────────────────
  useEffect(() => () => clearTimeout(fadeTimerRef.current), [])

  // ─── Render ─────────────────────────────────────────────────────────────────
  return (
    <div
      className="home-slider-container"
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: '#000',
        height: isMobile ? `${height}px` : '100vh',
      }}
    >
      {slides.map((s, i) => {
        /*
         * Opacity rules:
         *   stable  →  current = 1,  everything else = 0
         *   fading  →  fadingFrom = 0 (animates out),  current = 1 (animates in)
         */
        const isActive   = i === current
        const isFadingOut = i === fadingFrom

        const opacity = isActive || isFadingOut
          ? isActive ? 1 : 0
          : 0

        const zIndex = isActive ? 2 : isFadingOut ? 1 : 0

        return (
          <div
            key={s.id}
            style={{
              position:   'absolute',
              inset:       0,
              opacity,
              zIndex,
              transition: `opacity ${FADE_MS}ms ease`,
            }}
          >
            {/* Video */}
            <video
              ref={(el) => (videoRefs.current[i] = el)}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              muted
              playsInline
              preload={i === 0 ? 'auto' : 'none'}
              onEnded={() => advance(i)}
            >
              <source src={s.url} type={s.type} />
            </video>

            {/* PNG overlay (sits between video and credit via z-index in CSS) */}
            <div className="image-overlay" />

            {/* Credit */}
            <p className="home-credit">{s.credit}</p>
          </div>
        )
      })}
    </div>
  )
}

export default HomeSlider
