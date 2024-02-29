import React from 'react'
import Seo from '../components/seo'
import Layout from '../components/layout'
import HomeSlider from '../components/homeSlider'

const Index = ({ location }) => {
  return (
    <Layout location={location}>
      <HomeSlider />
    </Layout>
  )
}

export const Head = () => <Seo />

export default Index
