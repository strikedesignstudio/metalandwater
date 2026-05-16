import React, { useState } from 'react'
import Seo from '../components/seo'
import Layout from '../components/layout'
import HomeSlider from '../components/homeSlider'

// Drop your first-frame JPEG URL here
const PLACEHOLDER = 'https://your-cdn.com/first-frame.jpg'

const Index = () => {
  const [videoReady, setVideoReady] = useState(false)

  return (
    <Layout videoReady={videoReady}>
      <HomeSlider
        placeholder={PLACEHOLDER}
        onReady={() => setVideoReady(true)}
      />
    </Layout>
  )
}

export const Head = () => <Seo />
export default Index
