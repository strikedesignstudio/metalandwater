import React from 'react'
import Seo from '../components/seo'
import Layout from '../components/layout'
import HomeVideo from '../components/homeVideo'

const Index = ({ location }) => {
  return (
    <Layout location={location}>
      <HomeVideo />
    </Layout>
  )
}

export const Head = () => <Seo />

export default Index
