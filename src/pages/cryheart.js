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
  .arial { font-family: Arial, Helvetica, sans-serif; }
    `}</style>
  <div className="centerheader">
  <div className="centerdiv">
    <h1>Cry, Heart</h1>
    <p>A new work by Holly Blakey</p>
    <p>Queen Elizabeth Hall, Southbank Centre.</p>
    <p>World premiere 23 to 26 March 2027.</p>
     <br />
    <b>JOIN THE PRODUCTION CIRCLE</b>
    <p>Cry, Heart is Holly Blakey's most personal and most ambitious work: commissioned by Southbank Centre, premiering at Queen Elizabeth Hall in March 2027, and built to carry her practice onto the international stage. Partners in the Production Circle make it happen at the scale it deserves.</p>
     <br />
    <b>THE WORK</b>
    <p>Cry, Heart is a new ensemble work by Holly Blakey. Grief sits riotously in the body, driving us toward a more alive state.</p>
    <p>It is within this aliveness that we find an infinite communion: porous, solemnly connected, sexed and adrift, all at once.</p>
    <p>A wound, childlike and aged, becomes a place of departure, an opening into fantasy. In grief, we centre the soul and its geography. Grief turns us towards our longing and our intimacy, reminding us of beauty, ritual and the immense indifference of nature.</p>
    <p>Blakey brings the intimate into the spectacular, as pop fantasy becomes an act of imagining life anew.</p>
    <p>A stage cloaked in baby pink, lit like a photographer's studio, from a concept by artist Tai Shani. Costumes by Alice Gomme, drawn from her archive of garments recovered from European rag yards and mended by hand.</p>
    <br />
    <b>WHY IT MATTERS</b>
    <p>Holly is one of the only women choreographers in the UK making work at this scale, and she does it as an independent artist, without a company building, a permanent ensemble or core public funding behind her. Every production is built from the ground up, and the people who stand behind it decide whether it happens at the scale it deserves.</p>
    <p>Cry, Heart previewed at Frieze London in October 2026, premieres at Queen Elizabeth Hall in March 2027, and tours to the European dance houses and festivals from 2027. It lays the foundations of the Holly Blakey Company.</p>
    <br />
    <b>PARTNERSHIP LEVELS</b>
    
  <p>Supporting Partner, <span className="arial">£</span>1,000+. Supporter credit on Cry, Heart. Two tickets to the premiere at Queen Elizabeth Hall. Invitation to an open rehearsal. Post-show dinner reception and party. Updates from Holly as the work is made.</p>
    <p>Producing Partner, <span className="arial">£</span>2,500+. Associate Producer credit on Cry, Heart. Two tickets to the premiere. Rehearsal visits and design presentations with Holly and the creative team. Post-show dinner reception and party. Priority booking across Holly Blakey, BOX and Metal & Water productions.</p>
    <p>Creative Partner, <span className="arial">£</span>5,000+. Co-Producer credit on Cry, Heart. Three tickets to the premiere. Rehearsal visits and design presentations with Holly and the creative team. A private studio conversation with Holly. Post-show dinner reception and party. Priority booking across Holly Blakey, BOX and Metal & Water productions.</p>
    <p>Founding Partner, above <span className="arial">£</span>5,000. Principal Supporter credit on Cry, Heart, and recognition as a Founding Partner of the Holly Blakey Company, announced at the premiere. Four tickets to the premiere. An invitation into the rehearsal room throughout the creation period. Post-show dinner reception and party.</p>
    
  <p>All partners are acknowledged in the programme and on the Holly Blakey, BOX and Metal & Water websites and channels.</p>
    <br />
    <b>JOIN US</b>
    <p>To talk about becoming involved, contact Nancy May Roberts, <a href="mailto:nancy@metalwater.co">nancy@metalwater.co</a>.</p>
    <br />
    <p>Holly Blakey.</p>
    <p>BOX Artist Management.</p>
    <p>Metal & Water.</p>
    <p>Commissioned by Southbank Centre.</p>
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
