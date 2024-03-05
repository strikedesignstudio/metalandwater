import React from 'react'
import Seo from '../components/seo'
import Layout from '../components/layout'
import HomeSlider from '../components/homeSlider'
import SplashContainer from '../components/splashContainer'

const Index = ({ location }) => {
  return (
    <>
      <SplashContainer></SplashContainer>
      <Layout location={location}>
        <HomeSlider />
      </Layout>
    </>
  )
}

export const Head = () => <Seo />

export default Index
