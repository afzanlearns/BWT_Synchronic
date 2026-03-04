export default function Features(){
  const F=[{n:'01',t:'Explainable AI',d:'Not just scam or safe. Tells you exactly why, line by line.'},{n:'02',t:'6 Languages',d:'Hindi, Tamil, Telugu, Bengali, Marathi, English.'},{n:'03',t:'Auto Extension',d:'Chrome extension flags WhatsApp Web messages automatically.'},{n:'04',t:'Local Check',d:'Pre-scans for known scam numbers and fake domains.'},{n:'05',t:'Screenshot OCR',d:'Upload screenshot, Tesseract extracts text client-side.'},{n:'06',t:'One-tap Share',d:'Instantly warn whoever forwarded you the message.'}]
  return(
    <section id="features" style={{padding:'80px 64px',maxWidth:1200,margin:'0 auto'}}>
      <div style={{borderTop:'1px solid #1e1e1e',paddingTop:64}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-end',marginBottom:56}}>
          <h2 style={{fontFamily:'Playfair Display,serif',fontSize:'clamp(28px,3vw,42px)',fontWeight:700,color:'#f5f0e8',lineHeight:1.2,letterSpacing:'-0.02em'}}>Everything you need<br/>to <em style={{color:'#e63946',fontStyle:'italic'}}>stay safe.</em></h2>
          <span style={{fontFamily:'Sora,sans-serif',fontSize:12,color:'#9a9489',letterSpacing:'0.06em',textTransform:'uppercase'}}>Features</span>
        </div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:1,background:'#1e1e1e'}}>
          {F.map(f=>(
            <div key={f.n} style={{background:'#080808',padding:32}}>
              <div style={{fontFamily:'Playfair Display,serif',fontSize:13,color:'#252525',marginBottom:20}}>{f.n}</div>
              <div style={{fontFamily:'Playfair Display,serif',fontSize:18,fontWeight:600,color:'#f5f0e8',marginBottom:12}}>{f.t}</div>
              <p style={{fontFamily:'Sora,sans-serif',fontSize:13,color:'#9a9489',lineHeight:1.75,margin:0}}>{f.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
