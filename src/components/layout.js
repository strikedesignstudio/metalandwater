import React from 'react'
import Header from './header'
import { Script } from 'gatsby'

const Layout = ({ children, className }) => {
  return (
    <div className={className}>
      <Header />
      <main>{children}</main>
      <Script
        src='https://website-widgets.pages.dev/dist/sienna.min.js'
        defer
      />
    </div>
  )
}

export default Layout
