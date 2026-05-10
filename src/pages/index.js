import React from 'react'
import Seo from '../components/seo'
import Layout from '../components/layout'
import HomeSlider from '../components/homeSlider'
import Mission from '../components/mission'

const Index = () => {
  return (
    <Layout>
      <HomeSlider />
      <Mission />
    </Layout>
  )
}

export const Head = () => <Seo />
export default Index
