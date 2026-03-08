<div align="center">

<img src="https://img.shields.io/badge/CampusGuard-v2.0-e63946?style=for-the-badge&labelColor=080808" />
<img src="https://img.shields.io/badge/Model-llama--3.3--70b--versatile-f4a261?style=for-the-badge&labelColor=080808" />
<img src="https://img.shields.io/badge/Built_at-Hackathon_2026-52b788?style=for-the-badge&labelColor=080808" />

<br /><br />

```
 ██████╗ █████╗ ███╗   ███╗██████╗ ██╗   ██╗███████╗ ██████╗ ██╗   ██╗ █████╗ ██████╗ ██████╗
██╔════╝██╔══██╗████╗ ████║██╔══██╗██║   ██║██╔════╝██╔════╝ ██║   ██║██╔══██╗██╔══██╗██╔══██╗
██║     ███████║██╔████╔██║██████╔╝██║   ██║███████╗██║  ███╗██║   ██║███████║██████╔╝██║  ██║
██║     ██╔══██║██║╚██╔╝██║██╔═══╝ ██║   ██║╚════██║██║   ██║██║   ██║██╔══██║██╔══██╗██║  ██║
╚██████╗██║  ██║██║ ╚═╝ ██║██║     ╚██████╔╝███████║╚██████╔╝╚██████╔╝██║  ██║██║  ██║██████╔╝
 ╚═════╝╚═╝  ╚═╝╚═╝     ╚═╝╚═╝      ╚═════╝ ╚══════╝ ╚═════╝  ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═════╝
```

### *Your campus. Their target. Our shield.*

**A campus-specific threat intelligence platform that intercepts student-targeted fraud across WhatsApp, Outlook, and the web — before you pay, click, or respond.**

<br />

[**📖 How To Use**](./HOW_TO_USE.md) &nbsp;·&nbsp; [**🗺 Product Plan**](./CAMPUSGUARD_PLAN.md) &nbsp;·&nbsp; [**🏗 Build Instructions**](./AGENT_BUILD_INSTRUCTIONS.md)

<br />

</div>

---

## 📌 The Story Behind This

In our first semester, a stranger added our entire batch to a WhatsApp group called **"Google Internship 2025"**. Our friends were already in it. It looked legitimate. A Google Form was shared. The internship was free — but there was a ₹999 registration fee to "secure your slot." The admin kept spamming: *"Only 3 slots left. Offer closes tonight."*

Students paid. The group went silent the next morning.

No existing tool caught it — not because the technology didn't exist, but because **nobody had trained it on the specific way scammers target Indian college students**.

So we did. CampusGuard is built on the attacks our campus has already survived.

---

## 🎯 What CampusGuard Does

CampusGuard is **not** a generic scam detector. It is a campus threat intelligence system trained on three specific attack patterns that have affected Indian college students:

| Attack | Pattern | Where it appears |
|---|---|---|
| **WhatsApp Group Scam** | Unknown admin + MNC brand name + Google Form + payment | WhatsApp group messages |
| **Fake Internship Email** | Shortlisted for TCS/Google + mandatory course fee + 24hr deadline | College Outlook inbox |
| **Digital Arrest / KYC Fraud** | Government impersonation + legal threat + UPI transfer demand | WhatsApp + SMS |

The difference between CampusGuard and a generic scam checker is context. Our AI knows that a ₹999 "refundable slot booking fee" for a Google internship is always fraud. It knows that TCS HR does not send emails from Gmail. It knows that "only 3 slots left" is manufactured urgency, not a real offer.

---

## 🛡️ Three Surfaces. One Engine.

```
┌─────────────────────────────────────────────────────────────────────┐
│                     CAMPUSGUARD PROTECTION LAYER                    │
│                                                                     │
│  ┌──────────────┐    ┌──────────────────┐    ┌──────────────────┐  │
│  │   Web App    │    │  Chrome Ext #1   │    │  Chrome Ext #2   │  │
│  │              │    │                  │    │                  │  │
│  │  Paste any   │    │  WhatsApp Web    │    │  Outlook Web     │  │
│  │  message,    │    │  auto-intercept  │    │  auto-intercept  │  │
│  │  image, URL  │    │  on every msg    │    │  on every email  │  │
│  └──────────────┘    └──────────────────┘    └──────────────────┘  │
│                                                                     │
│                    ↓             ↓                   ↓             │
│                                                                     │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │                  ENRICHED ANALYSIS PIPELINE                  │   │
│  │                                                             │   │
│  │  Extract URLs → Google Safe Browsing → WHOIS Domain Age    │   │
│  │  Detect Google Forms → Scan for payment fields             │   │
│  │  Pattern pre-scan → Urgency scoring → Brand spoof detect   │   │
│  │                           ↓                                 │   │
│  │           Groq API — llama-3.3-70b-versatile               │   │
│  │           Campus-tuned system prompt                        │   │
│  │                           ↓                                 │   │
│  │  verdict · scam_type · threat_score · red_flags             │   │
│  │  domain_age · safe_browsing_status · what_to_do            │   │
│  └─────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────┘
```

---

## ✨ Features

### 🔍 Multi-Layer URL Analysis
Every URL extracted from a message or email is checked against **three independent sources** before the AI even runs:
- **Google Safe Browsing API** — cross-references against millions of confirmed phishing and malware domains
- **WHOIS Domain Age** — a domain registered 4 days ago claiming to be TCS gets an immediate threat score spike
- **Google Form Scanner** — fetches the form and checks for payment keywords (UPI, registration fee, course fee, refundable deposit)

### 🤖 Campus-Tuned AI Model
Uses `llama-3.3-70b-versatile` via Groq with a system prompt specifically written for Indian college fraud patterns — not generic internet scams. The model understands:
- Why a ₹999 "refundable" internship fee is always extraction
- Why Gmail sender + MNC company name = immediate red flag
- Why "only 3 slots left" is a manipulation technique, not a real constraint
- The difference between a real TCS domain and `tcs-careers-india.xyz`

### 🖥️ Interactive Live Demo
A split-panel demo embedded in the web app shows a simulated WhatsApp Web and Outlook inbox side by side. Click **Run Live Analysis** and the real AI analyzes all messages in real time — badges and banners appear as each result comes back. No extension install required to see the product working.

### 🌍 6 Indian Languages
Results in English, Hindi, Tamil, Telugu, Bengali, or Marathi — built for students who share alerts with parents and family in their native language.

### 🔌 Chrome Extension — One Install, Two Surfaces
- **`content.js`** — Watches WhatsApp Web with a MutationObserver. Scans existing messages on load and new ones in real time. Detects Google Form links and adds alert context before the AI call. Injects colored badges above flagged messages.
- **`outlook_content.js`** — Watches Outlook Web for SPA navigation events. Extracts subject, sender, and body from the reading pane. Injects a full-width warning banner with threat score, scam type, "They Want" and "What To Do" panels.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- A free [Groq API key](https://console.groq.com)
- Optionally: [Google Safe Browsing API key](https://console.cloud.google.com) and [WHOIS XML API key](https://whoisxmlapi.com)

### Web App

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/campusguard.git
cd campusguard

# 2. Install dependencies
npm install

# 3. Add your API keys in src/utils/analyze.js
#    GROQ_API_KEY             — required
#    SAFE_BROWSING_API_KEY    — optional, improves URL detection
#    WHOIS_API_KEY            — optional, enables domain age checking

# 4. Start the development server
npm run dev

# 5. Open http://localhost:5173
```

### Chrome Extension

```bash
# 1. Navigate to the extension folder
cd campusguard-extension/

# 2. Add your Groq API key
#    Open content.js         → paste key on line 12
#    Open outlook_content.js → paste key on line 12

# 3. Open Chrome → chrome://extensions
# 4. Toggle on Developer Mode (top right)
# 5. Click "Load unpacked" → select the campusguard-extension folder
# 6. Open WhatsApp Web or Outlook — protected immediately
```

> **Note:** After installing, refresh any already-open WhatsApp Web or Outlook tabs. Content scripts only inject into pages opened after installation.

---

## 📁 Project Structure

```
campusguard/
│
├── src/
│   ├── components/
│   │   ├── Navbar.jsx              # Fixed nav, CampusGuard branding
│   │   ├── DemoSimulator.jsx       # Live split-panel interactive demo
│   │   ├── TheStory.jsx            # First-semester scam narrative
│   │   ├── Analyzer.jsx            # Main paste-and-analyze interface
│   │   ├── ResultCard.jsx          # Verdict display + URL intelligence
│   │   ├── Features.jsx            # Feature grid
│   │   ├── Extension.jsx           # Extension download via JSZip
│   │   └── Footer.jsx
│   │
│   ├── utils/
│   │   └── analyze.js              # Full analysis pipeline
│   │                               #   extractUrls()
│   │                               #   checkSafeBrowsing()
│   │                               #   checkDomainAge()
│   │                               #   analyzeGoogleForm()
│   │                               #   analyzeMessage()  ← main export
│   │                               #   translateMessage()
│   │
│   ├── App.jsx                     # Layout and section composition
│   ├── main.jsx                    # React entry point
│   └── index.css                   # Global styles, dot grid background
│
├── campusguard-extension/
│   ├── manifest.json               # Chrome Manifest V3
│   ├── content.js                  # WhatsApp Web content script
│   └── outlook_content.js          # Outlook Web content script
│
├── CAMPUSGUARD_PLAN.md             # Full product and technical strategy
├── AGENT_BUILD_INSTRUCTIONS.md     # AI agent build prompt
├── DEMO_AGENT_INSTRUCTIONS.md      # Demo simulator build prompt
├── UI_QUICKFIX.md                  # UI improvement agent prompt
├── HOW_TO_USE.md                   # End-user guide
└── EXTENSION_TEAM_BRIEF.md         # Brief for extension developers
```

---

## 🔬 Analysis Pipeline

```
Input (message / email / URL)
          │
          ▼
   Extract all URLs
          │
     ┌────┴────┬──────────────────┐
     ▼         ▼                  ▼
 Safe Browse  WHOIS           Google Form
 API check    domain age      fetch + scan
 (known bad?) (< 90d = flag)  (payment fields?)
     │         │                  │
     └────┬────┴──────────────────┘
          │
          ▼
  Build enriched context
  (original input + all flag results)
          │
          ▼
   Groq llama-3.3-70b
   Campus threat prompt
          │
          ▼
   JSON result + urlIntelligence
```

---

## 📊 Output Schema

```typescript
{
  verdict:         "SCAM" | "SUSPICIOUS" | "SAFE"
  confidence:      number        // 0–100
  scam_type:       string        // "Fake Internship + Course Fee Scam"
  threat_score:    number        // 0–100 composite
  red_flags:       string[]      // ["Google Form with payment field", ...]
  explanation:     string        // 2–3 plain sentences
  what_they_want:  string        // "₹999 from every student in the group"
  what_to_do:      string        // "Do not pay. Report the group admin."

  urlIntelligence: {
    safeBrowsingFlagged: string[]
    domainAgeResults: {
      domain:    string
      ageInDays: number
      created:   string
    }[]
    formAnalysis: {
      url:           string
      title:         string
      hasPayment:    boolean
      foundKeywords: string[]    // ["upi", "registration fee", "₹"]
    } | null
  }
}
```

---

## 🧰 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite |
| Animations | Framer Motion |
| AI Model | Groq — `llama-3.3-70b-versatile` |
| URL Safety | Google Safe Browsing API v4 |
| Domain Intel | WHOIS XML API |
| Form Analysis | allorigins.win CORS proxy + HTML parsing |
| Extension Packaging | JSZip (client-side, no server) |
| OCR | Tesseract.js |
| Fonts | Playfair Display + Sora (Google Fonts) |
| Deployment | Vercel |
| Extension | Chrome Manifest V3 |

---

## 🔑 API Keys Reference

| Constant | Required | Source | Free Tier |
|---|---|---|---|
| `GROQ_API_KEY` | ✅ Yes | [console.groq.com](https://console.groq.com) | Generous free tier |
| `SAFE_BROWSING_API_KEY` | ⚡ Recommended | [Google Cloud Console](https://console.cloud.google.com) | 10,000 req/day |
| `WHOIS_API_KEY` | ⚡ Recommended | [whoisxmlapi.com](https://whoisxmlapi.com) | 500 req/month |

> ⚠️ Never commit real API keys to a public repository. Use environment variables for production deployments.

```env
VITE_GROQ_API_KEY=gsk_...
VITE_SAFE_BROWSING_KEY=AIza...
VITE_WHOIS_KEY=at_...
```

---

## 🎨 Design System

| Token | Value | Usage |
|---|---|---|
| Background | `#080808` | Page background |
| Surface | `#111111` | Cards, panels |
| Border | `#1e1e1e` | Dividers, card borders |
| Text Primary | `#f5f0e8` | Headings, key content |
| Text Muted | `#9a9489` | Body copy, labels |
| Danger | `#e63946` | SCAM verdict, primary CTA |
| Warning | `#f4a261` | SUSPICIOUS verdict |
| Safe | `#52b788` | SAFE verdict, protected status |
| Heading Font | `Playfair Display` | All display headings |
| Body Font | `Sora` | All UI and body text |

---

## 🗺️ Roadmap

- [ ] Safe Browsing + WHOIS results as visual badges in the web app result card
- [ ] Outlook Office Add-in (Office.js) — runs on Desktop, Web, and Mobile simultaneously
- [ ] Anonymized community threat database — every confirmed scam trains the next detection
- [ ] Mobile wrapper — React Native for on-device analysis of forwarded messages
- [ ] College admin dashboard — aggregated threat intelligence per institution

---

## 👥 Team

Built in 5 hours at **Hackathon 2026 — Problem Statement PS-A**

> *"Every other team built a tool you have to remember to use. We built protection that was already running before you knew you needed it."*

---

## 📄 License

MIT — see [LICENSE](./LICENSE) for details.

---

<div align="center">
<br />

*Built for the students who got scammed, so the next batch doesn't have to be.*

<br />

**CampusGuard** &nbsp;·&nbsp; Hackathon 2026 &nbsp;·&nbsp; PS-A

</div>
