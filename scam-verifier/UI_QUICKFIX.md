# CampusGuard — UI Quick Fixes (30 min)

Paste this into your IDE AI chat and say: "Execute every step in this file in order. Make targeted edits only — do not rewrite any file from scratch."

---

## Rules Before You Start

- Make surgical edits only — change only what is specified
- Do not restructure any component
- Do not change any logic, API calls, or state management
- Do not add new dependencies
- Design system: background `#080808`, surface `#111`, border `#1e1e1e`, text `#f5f0e8`, muted `#9a9489`, red `#e63946`, orange `#f4a261`, green `#52b788`
- Fonts: `Playfair Display` for headings, `Sora` for everything else

---

## Fix 1 — Hero Section in `src/App.jsx`

### 1a. Tighten the description paragraph

Find the `<p>` tag in the hero section that contains the product description. Replace only its text content with:

```
CampusGuard catches fake internship offers, WhatsApp payment traps, and phishing emails — before you pay. Built on real attacks from real Indian campuses.
```

Keep all existing styles on the `<p>` unchanged.

### 1b. Add a stats row

Find the two CTA buttons in the hero (the "Analyze a Message" and "Get Extension" buttons). Directly ABOVE the buttons div, insert this stats row:

```jsx
<div style={{
  display: 'flex', gap: 40, marginBottom: 36,
  paddingBottom: 32, borderBottom: '1px solid #1e1e1e'
}}>
  {[
    { n: '₹1.25L Cr', l: 'lost to scams annually' },
    { n: '600M+',     l: 'WhatsApp users at risk' },
    { n: '3',         l: 'surfaces protected' },
  ].map(s => (
    <div key={s.n}>
      <div style={{
        fontFamily: 'Playfair Display, serif',
        fontSize: 28, fontWeight: 700,
        color: '#f5f0e8', lineHeight: 1
      }}>{s.n}</div>
      <div style={{
        fontFamily: 'Sora, sans-serif',
        fontSize: 11, color: '#9a9489',
        marginTop: 5, letterSpacing: '0.04em'
      }}>{s.l}</div>
    </div>
  ))}
</div>
```

### 1c. Shrink the phone sketch

Find the `<PhoneSketch />` component (or the phone SVG inline in App.jsx). Find its wrapping div and add or update `transform: 'scale(0.82)'` and `transformOrigin: 'center top'` to make it slightly smaller and less visually dominant. This gives the stats row more breathing room.

---

## Fix 2 — Analyzer in `src/components/Analyzer.jsx`

### 2a. Fix the Analyze button color

Find the "Analyze Message" submit button. It currently has a dark maroon background (something like `rgba(230,57,70,0.4)` or `#7f1d1d`). Replace the background with:

```
background: loading ? 'rgba(230,57,70,0.35)' : '#e63946'
```

The button must be the full bright `#e63946` red when not loading.

### 2b. Remove the character counter

Find the `{text.length} chars` or `0 chars` display element below the textarea. Delete it entirely. It adds no value and makes the input look unfinished.

### 2c. Make example buttons more prominent

Find the example message buttons (WhatsApp Group Scam / Fake Job Email / Digital Arrest). They are currently small pill-shaped buttons. Update their styles to:

```jsx
style={{
  padding: '7px 16px',
  borderRadius: 999,
  border: '1px solid #2a2a2a',
  background: '#141414',
  color: '#f5f0e8',
  fontSize: 12,
  fontFamily: 'Sora, sans-serif',
  cursor: 'pointer',
  letterSpacing: '0.02em',
  transition: 'border-color 0.2s, background 0.2s',
}}
```

And add an `onMouseEnter` / `onMouseLeave` to each:
```jsx
onMouseEnter={e => { e.target.style.borderColor = '#e63946'; e.target.style.background = 'rgba(230,57,70,0.08)' }}
onMouseLeave={e => { e.target.style.borderColor = '#2a2a2a'; e.target.style.background = '#141414' }}
```

---

## Fix 3 — Extension Section in `src/components/Extension.jsx`

### 3a. Add two feature badges above the download button

Find the download button. Directly ABOVE it, insert:

```jsx
<div style={{ display: 'flex', gap: 10, marginBottom: 24, flexWrap: 'wrap' }}>
  {[
    { icon: '💬', label: 'WhatsApp Web' },
    { icon: '📧', label: 'Outlook Web + Desktop' },
    { icon: '🤖', label: 'llama-3.3-70b' },
  ].map(p => (
    <div key={p.label} style={{
      display: 'flex', alignItems: 'center', gap: 7,
      border: '1px solid #1e1e1e', borderRadius: 999,
      padding: '6px 14px', fontFamily: 'Sora, sans-serif',
      fontSize: 12, color: '#9a9489', background: '#111'
    }}>
      <span>{p.icon}</span><span>{p.label}</span>
    </div>
  ))}
</div>
```

### 3b. Add a warning note below the download button

Find the small text below the download button that lists the included files. Replace it with:

```jsx
<div style={{
  marginTop: 14, padding: '10px 14px',
  background: 'rgba(244,162,97,0.07)',
  border: '1px solid rgba(244,162,97,0.15)',
  borderRadius: 8, fontFamily: 'Sora, sans-serif',
  fontSize: 11, color: '#f4a261', lineHeight: 1.6
}}>
  ⚠️ After installing, open <strong>content.js</strong> and <strong>outlook_content.js</strong> and add your Groq API key before using.
</div>
```

### 3c. Simplify the install steps to 3

Find the steps array in Extension.jsx. Replace the entire steps array with:

```javascript
const STEPS = [
  'Download + unzip the extension folder',
  'Go to chrome://extensions → Enable Developer Mode → Load unpacked',
  'Open WhatsApp Web or Outlook — you are protected',
]
```

---

## Fix 4 — Add The Story Section

### 4a. Create `src/components/TheStory.jsx`

Create this file:

```jsx
export default function TheStory() {
  return (
    <section style={{ padding: '80px 64px', maxWidth: 1200, margin: '0 auto' }}>
      <div style={{ borderTop: '1px solid #1e1e1e', paddingTop: 64 }}>
        <div style={{ maxWidth: 680, margin: '0 auto', textAlign: 'center' }}>

          <span style={{
            display: 'inline-block', border: '1px solid #1e1e1e',
            borderRadius: 999, padding: '4px 14px', fontSize: 11,
            color: '#9a9489', fontFamily: 'Sora, sans-serif',
            letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 28
          }}>
            Why We Built This
          </span>

          <h2 style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(26px, 3vw, 38px)',
            fontWeight: 700, color: '#f5f0e8',
            lineHeight: 1.2, letterSpacing: '-0.02em', marginBottom: 28
          }}>
            This scam already happened.<br />
            <em style={{ fontStyle: 'italic', color: '#e63946' }}>At our college.</em>
          </h2>

          <p style={{
            fontFamily: 'Sora, sans-serif', fontSize: 15,
            lineHeight: 1.85, color: '#9a9489', marginBottom: 20
          }}>
            In our first semester, a stranger added our entire batch to a WhatsApp group called
            <span style={{ color: '#f5f0e8', fontWeight: 500 }}> "Google Internship 2025"</span>.
            Our friends were already in it. It looked real. A Google Form was shared. 
            The internship was free — but there was a ₹999 registration fee to secure your slot. 
            The admin kept sending messages: <span style={{ color: '#f4a261' }}>"Only 3 slots left."</span> Students paid.
            The group went silent the next morning.
          </p>

          <p style={{
            fontFamily: 'Sora, sans-serif', fontSize: 15,
            lineHeight: 1.85, color: '#9a9489', marginBottom: 36
          }}>
            No existing tool caught it. Not because the technology didn't exist — 
            but because no one had trained it on the specific way scammers target Indian college students.
            So we did.
          </p>

          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            background: 'rgba(230,57,70,0.07)',
            border: '1px solid rgba(230,57,70,0.2)',
            borderRadius: 10, padding: '14px 24px',
            fontFamily: 'Sora, sans-serif', fontSize: 13, color: '#f5f0e8'
          }}>
            <span style={{ fontSize: 18 }}>🛡️</span>
            <span>CampusGuard is built on the attacks our campus already survived.</span>
          </div>

        </div>
      </div>
    </section>
  )
}
```

### 4b. Add TheStory to `src/App.jsx`

Add the import at the top:
```jsx
import TheStory from './components/TheStory'
```

Place `<TheStory />` between the Demo Simulator and the Analyzer section. The order should be:

```
Hero
DemoSimulator
TheStory        ← ADD HERE
Analyzer
Features
Extension
Footer
```

---

## Fix 5 — Footer Text (30 seconds)

Find the footer component (`src/components/Footer.jsx`). Find the text that says `"Is This Real?"` and replace it with `"CampusGuard"`. Do this everywhere it appears in the footer.

---

## Verification Checklist

- [ ] Hero has 3 stats (₹1.25L Cr / 600M+ / 3 surfaces) above the CTA buttons
- [ ] Hero description is one sentence, not three
- [ ] Analyze button is bright `#e63946` red when not loading
- [ ] No character counter visible below the textarea
- [ ] Example buttons have a red hover effect
- [ ] Extension section has 3 platform badges and the API key warning
- [ ] Extension install steps are reduced to 3
- [ ] TheStory section appears between Demo and Analyzer
- [ ] Footer says CampusGuard, not "Is This Real?"
- [ ] No console errors
- [ ] No existing functionality broken
