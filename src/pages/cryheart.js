import * as React from "react"
import Layout from "../components/layout"

const CryHeartPage = () => (
  <Layout>
  <style>{`
      body { background-color: pink !important; }
      .centerheader {width:100vw;height:100vh;display:flex;}
      .centerdiv {display:center;}
    `}</style>
  <div class="centerheader">
  <div class="centerdiv">
    <h1>Cry, Heart</h1>
    <p>A new work by Holly Blakey</p>
    <p>You have just seen the first glimpse.</p>
    <p>World premiere at the Queen Elizabeth Hall, Southbank Centre, 24 to 26 March 2027.</p>
  </div>
  </div>
  </Layout>
)
export default CryHeartPage
export const Head = () => <title>Cry, Heart</title>
