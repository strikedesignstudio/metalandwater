import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useImperativeHandle,
  forwardRef,
} from 'react'
import { graphql, useStaticQuery } from 'gatsby'

const FADE_MS = 900

const HomeSlider = forwardRef(({ onReady }, ref) => {
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
  const [nextUnlocked, setNextUnlocked] = useState(false)

  const videoRefs     = useRef([])
  const isFadingRef   = useRef(false)
  const fadeTimerRef  = useRef(null)
  const readyFiredRef = useRef(false)

  // Boot: play first video as soon as it has enough data
  useEffect(() => {
    const v = videoRefs.current[0]
    if (!v) return

    const tryPlay = () => {
      const p = v.play()
      if (p !== undefined) {
        p.catch(() => {
          const onGesture = () => {
            v.play().catch(() => {})
            document.removeEventListener('touchstart', onGesture)
            document.removeEventListener('click', onGesture)
          }
          document.addEventListener('touchstart', onGesture, { once: true })
          document.addEventListener('click', onGesture, { once: true })
        })
      }
    }

    if (v.readyState >= 3) {
      tryPlay()
    } else {
      v.addEventListener('canplay', tryPlay, { once: true })
    }

    return () => v.removeEventListener('canplay', tryPlay)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slides.length])

  // Preload next video only after first has started playing
  useEffect(() => {
    if (!nextUnlocked || !slides.length) return
    const nextIdx   = (current + 1) % slides.length
    const nextVideo = videoRefs.current[nextIdx]
    if (nextVideo && nextVideo.preload !== 'auto') {
      nextVideo.preload = 'auto'
      nextVideo.load()
    }
  }, [current, nextUnlocked, slides.length])

  // First video starts playing
  const handleFirstPlaying = useCallback(() => {
    if (readyFiredRef.current) return
    readyFiredRef.current = true
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

  // Expose advance to parent via ref
  useImperativeHandle(ref, () => ({ advance }), [advance])

  useEffect(() => () => clearTimeout(fadeTimerRef.current), [])

  return (
    <div className="home-slider-container">
      {slides.map((s, i) => {
        const isActive    = i === current
        const isFadingOut = i === fadingFrom
        const opacity     = isActive ? 1 : isFadingOut ? 0 : 0
        const zIndex      = isActive ? 2 : isFadingOut ? 1 : 0

        return (
          <div
            key={s.id}
            className="slider-slide"
            style={{ opacity, zIndex }}
          >
            <video
              ref={(el) => (videoRefs.current[i] = el)}
              className="home-slide-image"
              muted
              playsInline
              loop
              autoPlay={i === 0}
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
})

export default HomeSlider
