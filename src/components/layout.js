import React from 'react'
import Header from './header'
import { Script } from 'gatsby'

// videoReady: passed from the home page once the first video starts playing.
// On every other page it is undefined, so the header is always fully visible.
const Layout = ({ children, className, videoReady }) => {
  const isHome       = videoReady !== undefined
  const headerOpacity = isHome ? (videoReady ? 1 : 0) : 1

  return (
    <div className={className}>
      <div
        style={{
          opacity:    headerOpacity,
          transition: 'opacity 900ms ease',
        }}
      >
        <Header />
      </div>
      <main>{children}</main>
      <Script
        src='https://website-widgets.pages.dev/dist/sienna.min.js'
        defer
      />
    </div>
  )
}

export default Layout
