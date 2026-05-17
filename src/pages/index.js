import React, { useState } from 'react'
import Seo from '../components/seo'
import Layout from '../components/layout'
import HomeSlider from '../components/homeSlider'
import placeholder from '../images/placeholder.jpg'

const Index = () => {
  const [videoReady, setVideoReady] = useState(false)

  return (
    <Layout videoReady={videoReady}>
      <HomeSlider
        placeholder={placeholder}
        onReady={() => setVideoReady(true)}
      />
    </Layout>
  )
}

export const Head = () => <Seo />
export default Index
