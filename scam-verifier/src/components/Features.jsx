export default function Features() {
  const F = [{ n: '01', t: 'Google Form Scanner', d: 'Detects payment fields inside Google Forms — the exact method used in WhatsApp group internship scams targeting college students.' }, { n: '02', t: 'Safe Browsing Check', d: 'Every URL is cross-referenced against Google\'s database of millions of confirmed phishing and malware sites before the AI even runs.' }, { n: '03', t: 'Domain Age Intelligence', d: 'WHOIS lookup reveals how old a domain is. A site claiming to be TCS registered 4 days ago is an immediate red flag.' }, { n: '04', t: 'Campus Threat Model', d: 'AI trained specifically on internship fraud, fake placement drives, and WhatsApp group scams — not generic fraud patterns.' }, { n: '05', t: '6 Indian Languages', d: 'Results delivered in Hindi, Tamil, Telugu, Bengali, Marathi, or English — built for students who think in their mother tongue.' }, { n: '06', t: 'Three Surfaces', d: 'Web app for one-off checks. Chrome extension auto-intercepts on WhatsApp Web and Outlook. One install, everywhere you need it.' }]
  return (
    <section id="features" style={{ padding: '80px 64px', maxWidth: 1200, margin: '0 auto' }}>
      <div style={{ borderTop: '1px solid #1e1e1e', paddingTop: 64 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 56 }}>
          <h2 style={{ fontFamily: 'Playfair Display,serif', fontSize: 'clamp(28px,3vw,42px)', fontWeight: 700, color: '#f5f0e8', lineHeight: 1.2, letterSpacing: '-0.02em' }}>Everything you need<br />to <em style={{ color: '#e63946', fontStyle: 'italic' }}>stay safe.</em></h2>
          <span style={{ fontFamily: 'Sora,sans-serif', fontSize: 12, color: '#9a9489', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Features</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 1, background: '#1e1e1e' }}>
          {F.map(f => (
            <div key={f.n} style={{ background: '#080808', padding: 32 }}>
              <div style={{ fontFamily: 'Playfair Display,serif', fontSize: 13, color: '#252525', marginBottom: 20 }}>{f.n}</div>
              <div style={{ fontFamily: 'Playfair Display,serif', fontSize: 18, fontWeight: 600, color: '#f5f0e8', marginBottom: 12 }}>{f.t}</div>
              <p style={{ fontFamily: 'Sora,sans-serif', fontSize: 13, color: '#9a9489', lineHeight: 1.75, margin: 0 }}>{f.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
