import React from 'react'
import Seo from '../components/seo'
import Layout from '../components/layout'
import HomeSlider from '../components/homeSlider'
import Splash from '../components/splash'
import { AnimatePresence, motion } from 'framer-motion'

const Index = ({ location }) => {
  return (
    <>
      <Splash></Splash>
      <AnimatePresence>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Layout location={location}>
            <HomeSlider />
          </Layout>
        </motion.div>
      </AnimatePresence>
    </>
  )
}

export const Head = () => <Seo />

export default Index
