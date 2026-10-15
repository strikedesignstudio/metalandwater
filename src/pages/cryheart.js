import * as React from "react"
import Layout from "../components/layout"

const CryHeartPage = () => (
  <Layout>
  <style>{`
      body { background-color: pink !important; margin: 0; }
      h1 {text-transform:uppercase;}
  .centerheader {
    width: 100vw;
    height: auto;
  }
  .centerdiv {
    max-width: 40rem;
    padding: 2rem;
    text-align: center;
    margin: 100px auto;
  }
    `}</style>
  <div className="centerheader">
  <div className="centerdiv">
    <h1>Cry, Heart</h1>
    <p>A new work by Holly Blakey</p>
    <p>Queen Elizabeth Hall, Southbank Centre.</p>
    <p>World premiere 24 to 26 March 2027.</p>
   
    <b>Join the Production Circle</b>
    <p>Cry, Heart is Holly Blakey’s most personal and most ambitious work: commissioned by Southbank Centre, premiering at Queen Elizabeth Hall in March 2027, and built to carry her practice onto the international stage. Partners in the Production Circle make it happen at the scale it deserves.</p>
   
    <b>THE WORK</b>
    <p>Cry, Heart is a new ensemble work by Holly Blakey. Grief sits riotously in the body, driving us toward a more alive state.</p>
    <p>It is within this aliveness that we find an infinite communion: porous, solemnly connected, sexed and adrift, all at once.</p>
    <p>A wound, childlike and aged, becomes a place of departure, an opening into fantasy. In grief, we centre the soul and its geography. Grief turns us towards our longing and our intimacy, reminding us of beauty, ritual and the immense indifference of nature.</p>
    <p>Blakey brings the intimate into the spectacular, as pop fantasy becomes an act of imagining life anew.</p>
    <p>A stage cloaked in baby pink, lit like a photographer’s studio, from a concept by artist Tai Shani. Costumes by Alice Gomme, drawn from her archive of garments recovered from European rag yards and mended by hand. Live music performed on stage and among the audience.</p>

    <b>WHY IT MATTERS</b>
    <p>Holly is one of the only women choreographers in the UK making work at this scale, and she does it as an independent artist, without a company building, a permanent ensemble or core public funding behind her. Every production is built from the ground up, and the people who stand behind it decide whether it happens at the scale it deserves.</p>
    <p>Holly is one of the only women choreographers in the UK making work at this scale, and she does it as an independent artist, without a company building, a permanent ensemble or core public funding behind her. Every production is built from the ground up, and the people who stand behind it decide whether it happens at the scale it deserves.</p>

    <b>PARTNERSHIP LEVELS</b>
    <p>Supporting Partner, £1,000+. Supporter credit on Cry, Heart. Two tickets to the premiere at Queen Elizabeth Hall. Invitation to an open rehearsal. Post-show dinner reception and party. Updates from Holly as the work is made.</p>
    <p>Producing Partner, £2,500+. Associate Producer credit on Cry, Heart. Four tickets to the premiere. Rehearsal visits and design presentations with Holly and the creative team. Post-show dinner reception and party. Priority booking across Holly Blakey, BOX and Metal & Water productions.</p>
    <p>All partners are acknowledged in the programme and on the Holly Blakey, BOX and Metal & Water websites and channels. Larger gifts are welcome and shaped with you directly.</p>

    <b>JOIN US</b>
    <p>To talk about becoming involved, contact Nancy May Roberts, nancy@metalwater.co.</p>
    <p>Holly Blakey. BOX Artist Management. Metal & Water. Commissioned by Southbank Centre.</p>
  </div>
  </div>
  </Layout>
)
export default CryHeartPage
export const Head = () => (
  <>
    <title>Cry, Heart</title>
    <meta name="robots" content="noindex, nofollow" />
  </>
)
