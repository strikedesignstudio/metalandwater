import React from 'react'
import Header from './header'
import Footer from './footer'

const Layout = ({ children, location }) => {
  return (
    <>
      <Header></Header>
      <main>{children}</main>
      {location?.pathname !== '/' && <Footer></Footer>}
    </>
  )
}

export default Layout
