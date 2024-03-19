import React from 'react'
import Seo from '../components/seo'
import Layout from '../components/layout'
import HomeSlider from '../components/homeSlider'
import Splash from '../components/splash'
import Mission from '../components/mission'
import { AnimatePresence, motion } from 'framer-motion'

const Index = () => {
  return (
    <>
      <Splash></Splash>
      <AnimatePresence>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Layout>
            <HomeSlider />
            <Mission />
          </Layout>
        </motion.div>
      </AnimatePresence>
    </>
  )
}

export const Head = () => <Seo />

export default Index
