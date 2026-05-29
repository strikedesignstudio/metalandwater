import React, { useEffect, useState } from 'react'
import Header from './header'
import { Script } from 'gatsby'

const Layout = ({ children, className, onAdvance }) => {
  const [onHome, setOnHome] = useState(true)

  useEffect(() => {
    const homeSection = document.getElementById('home')
    if (!homeSection) return

    const observer = new IntersectionObserver(
      ([entry]) => setOnHome(entry.isIntersecting),
      { threshold: 0.5 }
    )

    observer.observe(homeSection)
    return () => observer.disconnect()
  }, [])

  return (
    <div className={`site-wrapper${className ? ` ${className}` : ''}`}>
      <div className={`header-wrapper${onHome ? '' : ' header-dark'}`}>
        <Header onHome={onHome} onAdvance={onAdvance} />
      </div>

      <main className="site-main">
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
