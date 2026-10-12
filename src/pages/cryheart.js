import * as React from "react"
import Layout from "../components/layout"

const CryHeartPage = () => (
  <Layout>
  <style>{`
      body { background-color: pink !important; margin: 0; }
      h1 {text-transform:uppercase;}
  .centerheader {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center; 
  }
  .centerdiv {
    max-width: 40rem;
    padding: 2rem;
    text-align: center;
  }
    `}</style>
  <div className="centerheader">
  <div className="centerdiv">
    <h1>Cry, Heart</h1>
    <p>A new work by Holly Blakey</p>
    <p>You have just seen the first glimpse.</p>
    <p>World premiere at the Queen Elizabeth Hall, Southbank Centre, 24 to 26 March 2027.</p>
    <p>Join the Production Circle</p>
    <p>Cry, Heart is a meditation on grief and the possibilities it holds: a work about what loss can reshape in us, and how, together, we return to joy. 
      It is Holly Blakey's most personal and ambitious work, and the one that carries her practice onto the international stage. 
      Partners in the Production Circle help realise it in full, are credited on the production, and are invited into the rehearsal room and to the premiere.
    </p>
    <p>Partnership from £1,000.</p>
    <p>Nancy May Roberts, nancy@metalwater.co Ben Totty, ben@boxartistmanagement.com</p>
    <p>Holly Blakey · BOX Artist Management · Metal & Water</p>
  </div>
  </div>
  </Layout>
)
export default CryHeartPage
export const Head = () => <title>Cry, Heart</title>
