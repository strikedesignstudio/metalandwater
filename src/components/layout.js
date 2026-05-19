import React from 'react'
import Header from './header'
import { Script } from 'gatsby'

const Layout = ({ children, className, videoReady }) => {
  const isHome        = videoReady !== undefined
  const headerOpacity = isHome ? (videoReady ? 1 : 0) : 1

  return (
    <div className={className} style={{ position: 'relative' }}>
      {/* Header fades in on home once video starts, always visible elsewhere */}
      <div
        style={{
          position:   'fixed',
          top:         0,
          left:        0,
          right:       0,
          zIndex:      100,
          opacity:     headerOpacity,
          transition: 'opacity 900ms ease',
        }}
      >
        <Header />
      </div>

      {/* Scroll-snap container */}
      <main
        style={{
          height:           '100vh',
          overflowY:        'scroll',
          scrollSnapType:   'y mandatory',
          scrollBehavior:   'smooth',
        }}
      >
        {children}
      </main>

      <Script
        src="https://website-widgets.pages.dev/dist/sienna.min.js"
        defer
      />
    </div>
  )
}

export default Layout
