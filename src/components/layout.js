import React from 'react'
import Header from './header'
import Footer from './footer'
import { Script } from 'gatsby'

const Layout = ({ children }) => {
  return (
    <>
      <Header></Header>
      <main>{children}</main>
      <Script
        src='https://website-widgets.pages.dev/dist/sienna.min.js'
        defer
      ></Script>
      <Footer></Footer>
    </>
  )
}

export default Layout
