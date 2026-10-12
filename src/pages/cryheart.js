import * as React from "react"
import Layout from "../components/layout"

const AboutPage = () => (
  <Layout>
  <style>body{background-color:pink !important;}</style>
    <h1>Cry, Heart</h1>
    <p>A new work by Holly Blakey</p>
    <p>You have just seen the first glimpse.</p>
    <p>World premiere at the Queen Elizabeth Hall, Southbank Centre, 24 to 26 March 2027.</p>
  </Layout>
)
export default AboutPage
export const Head = () => <title>Cry, Heart</title>
