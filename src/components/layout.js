import React from 'react'
import Header from './header'
import { Script } from 'gatsby'

const Layout = ({ children, className }) => {
  return (
    <div className={className} style={{ position: 'relative' }}>
      <div
        style={{
          position: 'fixed',
          top:       0,
          left:      0,
          right:     0,
          zIndex:    100,
        }}
      >
        <Header />
      </div>

      <main
        style={{
          height:         '100vh',
          overflowY:      'scroll',
          scrollSnapType: 'y mandatory',
          scrollBehavior: 'smooth',
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
