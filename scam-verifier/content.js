// CampusGuard — WhatsApp Web Content Script
// Chrome Extension that auto-intercepts messages and checks for scams

(function () {
    const GROQ_KEY = '' // Paste your Groq key here
    const API = 'https://api.groq.com/openai/v1/chat/completions'

    const SYS = `You detect scams targeting Indian college students on WhatsApp.
Focus on: fake internship group scams (Google Form + payment), KYC fraud, digital arrest, bank impersonation.
Key rule: any internship message asking for money is always a SCAM.
Return ONLY JSON: {"verdict":"SCAM or SUSPICIOUS or SAFE","scam_type":"string or null","reason":"one plain sentence"}`

    let processed = new Set()

    async function analyzeText(text) {
        if (!GROQ_KEY) return null

        // Detect Google Form links and add to context
        const formUrls = text.match(/docs\.google\.com\/forms\/[^\s]+|forms\.gle\/[^\s]+/gi) || []
        let formContext = ''
        if (formUrls.length > 0) {
            formContext = ' [ALERT: This message contains a Google Form link. Google Forms are commonly used in fake internship WhatsApp group scams to collect payment from students.]'
        }

        try {
            const r = await fetch(API, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + GROQ_KEY,
                },
                body: JSON.stringify({
                    model: 'llama-3.3-70b-versatile',
                    messages: [
                        { role: 'system', content: SYS },
                        { role: 'user', content: 'Analyze this WhatsApp message for campus scams: ' + text + formContext },
                    ],
                    temperature: 0.1,
                    max_tokens: 300,
                }),
            })
            if (!r.ok) return null
            const d = await r.json()
            return JSON.parse(d.choices[0].message.content.trim().replace(/```json|```/g, '').trim())
        } catch {
            return null
        }
    }

    function createBadge(verdict, reason) {
        const colors = {
            SCAM: { bg: 'rgba(230,57,70,0.15)', border: '#e63946', text: '#e63946' },
            SUSPICIOUS: { bg: 'rgba(244,162,97,0.15)', border: '#f4a261', text: '#f4a261' },
            SAFE: { bg: 'rgba(82,183,136,0.15)', border: '#52b788', text: '#52b788' },
        }
        const c = colors[verdict] || colors.SUSPICIOUS
        const el = document.createElement('div')
        el.style.cssText = `
      margin: 4px 0; padding: 6px 10px; border-radius: 8px;
      background: ${c.bg}; border: 1px solid ${c.border};
      font-size: 11px; font-family: sans-serif; color: ${c.text};
    `
        el.textContent = `CampusGuard: ${verdict} — ${reason}`
        return el
    }

    function scan() {
        const msgs = document.querySelectorAll('div.message-in span.selectable-text')
        msgs.forEach(async (el) => {
            const text = el.innerText?.trim()
            if (!text || text.length < 20 || processed.has(text)) return
            processed.add(text)
            const result = await analyzeText(text)
            if (result && result.verdict !== 'SAFE') {
                const parent = el.closest('div.message-in')
                if (parent && !parent.querySelector('.campusguard-badge')) {
                    const badge = createBadge(result.verdict, result.reason)
                    badge.classList.add('campusguard-badge')
                    parent.appendChild(badge)
                }
            }
        })
    }

    // Run every 3 seconds
    setInterval(scan, 3000)
})()
