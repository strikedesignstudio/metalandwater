import React, { useEffect, useRef, useState, useCallback } from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import useWindowSize from '../utils/useWindowSize'

const FADE_MS = 900

// Props:
//   placeholder : URL of a JPEG shown while the first video loads
//   onReady     : callback fired once the first video starts playing
const HomeSlider = ({ placeholder, onReady }) => {
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

  const [current,      setCurrent]      = useState(0)
  const [fadingFrom,   setFadingFrom]   = useState(null)
  const [videoReady,   setVideoReady]   = useState(false)
  const [nextUnlocked, setNextUnlocked] = useState(false)

  const videoRefs     = useRef([])
  const isFadingRef   = useRef(false)
  const fadeTimerRef  = useRef(null)
  const readyFiredRef = useRef(false)

  // Boot: play first video only
  useEffect(() => {
    const v = videoRefs.current[0]
    if (!v) return
    const attempt = () => {
      v.currentTime = 0
      v.play().catch(() => {
        const resume = () => { v.play().catch(() => {}); document.removeEventListener('click', resume) }
        document.addEventListener('click', resume, { once: true })
      })
    }
    const t = setTimeout(attempt, 150)
    return () => clearTimeout(t)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slides.length])

  // Preload next video — only after first has started playing
  useEffect(() => {
    if (!nextUnlocked || !slides.length) return
    const nextIdx   = (current + 1) % slides.length
    const nextVideo = videoRefs.current[nextIdx]
    if (nextVideo && nextVideo.preload !== 'auto') {
      nextVideo.preload = 'auto'
      nextVideo.load()
    }
  }, [current, nextUnlocked, slides.length])

  // First video starts playing: reveal it, unlock next preload, notify parent
  const handleFirstPlaying = useCallback(() => {
    if (readyFiredRef.current) return
    readyFiredRef.current = true
    setVideoReady(true)
    setNextUnlocked(true)
    onReady?.()
  }, [onReady])

  // Advance to next slide
  const advance = useCallback(() => {
    if (isFadingRef.current) return
    isFadingRef.current = true
    clearTimeout(fadeTimerRef.current)

    const fromIdx   = current
    const nextIdx   = (fromIdx + 1) % slides.length
    const nextVideo = videoRefs.current[nextIdx]

    if (nextVideo) {
      nextVideo.currentTime = 0
      nextVideo.play().catch(() => {})
    }

    setFadingFrom(fromIdx)
    setCurrent(nextIdx)

    fadeTimerRef.current = setTimeout(() => {
      const oldVideo = videoRefs.current[fromIdx]
      if (oldVideo) { oldVideo.pause(); oldVideo.currentTime = 0 }
      setFadingFrom(null)
      isFadingRef.current = false
    }, FADE_MS + 50)
  }, [current, slides.length])

  useEffect(() => () => clearTimeout(fadeTimerRef.current), [])

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
      {/* Placeholder JPEG — covers everything until first video plays */}
      {placeholder && (
        <div
          style={{
            position:      'absolute',
            inset:          0,
            zIndex:         20,
            opacity:        videoReady ? 0 : 1,
            transition:    `opacity ${FADE_MS}ms ease`,
            pointerEvents: 'none',
          }}
        >
          <img
            src={placeholder}
            alt=""
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        </div>
      )}

      {/* Next arrow */}
      <button
        onClick={advance}
        aria-label="Next video"
        onMouseEnter={e => e.currentTarget.style.opacity = 1}
        onMouseLeave={e => e.currentTarget.style.opacity = 0.7}
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <polyline points="6,3 12,9 6,15" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Slides */}
      {slides.map((s, i) => {
        const isActive    = i === current
        const isFadingOut = i === fadingFrom
        const opacity     = isActive ? 1 : isFadingOut ? 0 : 0
        const zIndex      = isActive ? 2 : isFadingOut ? 1 : 0

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
            <video
              ref={(el) => (videoRefs.current[i] = el)}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              muted
              playsInline
              loop
              preload={i === 0 ? 'auto' : 'none'}
              onPlaying={i === 0 ? handleFirstPlaying : undefined}
            >
              <source src={s.url} type={s.type} />
            </video>
            <div className="image-overlay" />
            <p className="home-credit">{s.credit}</p>
          </div>
        )
      })}
    </div>
  )
}

export default HomeSlider

