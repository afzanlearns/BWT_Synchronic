import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const GROQ_API_KEY = "YOUR_GROQ_API_KEY_HERE"
const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions"

const WA_MESSAGES = [
    {
        id: 1,
        avatar: "R",
        avatarColor: "#4a9eff",
        name: "Rahul",
        time: "10:42 AM",
        text: "Hey are you coming to the library tonight for the group study?",
    },
    {
        id: 2,
        avatar: "U",
        avatarColor: "#9a9489",
        name: "Unknown +91 98765 43210",
        time: "11:15 AM",
        text: "Dear Student, you have been shortlisted for TCS Campus Drive 2025. Stipend ₹45,000/month. Complete registration at tcs-campus-drive.xyz — only 5 slots remaining!",
        groqMessage: "Dear Student, you have been shortlisted for TCS Campus Drive 2025. Stipend ₹45,000/month. Complete registration at tcs-campus-drive.xyz — only 5 slots remaining!"
    },
    {
        id: 3,
        avatar: "G",
        avatarColor: "#e63946",
        name: "Google Internship 2025 (Group)",
        time: "11:58 AM",
        text: "🎉 Congratulations! You are shortlisted for Google India Internship. Fill the form to secure your slot: docs.google.com/forms/d/abc123. Registration fee ₹999 (refundable). HURRY — only 2 slots left! Closes tonight 11:59 PM ⚠️",
        groqMessage: "Congratulations! You are shortlisted for Google India Internship. Fill the form to secure your slot: docs.google.com/forms/d/abc123. Registration fee ₹999 refundable. HURRY only 2 slots left. Closes tonight 11:59 PM"
    },
]

const OUTLOOK_EMAIL = {
    from: "hr@tcs-careers-india.xyz",
    fromName: "TCS HR Team",
    subject: "Congratulations! You've been shortlisted — Action Required",
    time: "9:30 AM",
    body: `Dear Student,

We are pleased to inform you that you have been shortlisted for the TCS Digital Internship Program 2025 based on your academic profile.

Stipend: ₹45,000/month
Duration: 3 months
Location: Bangalore / Remote

To confirm your slot, you are required to complete our mandatory pre-joining certification course.

Course Fee: ₹3,500 (one-time, non-refundable)
Payment: pay.tcs-careers-india.xyz/checkout

Please complete payment within 24 hours or your slot will be reallocated.

Regards,
HR Team — TCS Digital Campus Program`,
    groqMessage: "From: hr@tcs-careers-india.xyz Subject: TCS Internship shortlisted action required. Body: Shortlisted for TCS internship stipend 45000/month. Must complete mandatory certification course fee 3500 rupees non-refundable. Pay within 24 hours or slot given to next candidate. pay.tcs-careers-india.xyz/checkout"
}

async function analyze(text, context) {
    const sys = `You are a cybersecurity expert protecting Indian college students.
Detect: fake internship scams, Google Form payment scams, fake company impersonation, urgency manipulation.
Rule: ANY internship asking for money is ALWAYS a SCAM.
Return ONLY JSON: {"verdict":"SCAM or SUSPICIOUS or SAFE","scam_type":"string or null","reason":"one short plain sentence","threat_score":0-100}`
    const r = await fetch(GROQ_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: "Bearer " + GROQ_API_KEY },
        body: JSON.stringify({
            model: "llama-3.3-70b-versatile",
            messages: [
                { role: "system", content: sys },
                { role: "user", content: `Analyze this ${context}:\n${text}` }
            ],
            temperature: 0.1, max_tokens: 150
        })
    })
    if (!r.ok) throw new Error("ERR")
    const d = await r.json()
    return JSON.parse(d.choices[0].message.content.trim().replace(/```json|```/g, "").trim())
}

function ScanLine() {
    return (
        <motion.div
            initial={{ scaleX: 0, opacity: 1 }}
            animate={{ scaleX: 1, opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            style={{ height: 2, background: "linear-gradient(90deg, transparent, #e63946, transparent)", borderRadius: 1, marginBottom: 6, transformOrigin: "left" }}
        />
    )
}

function WaBadge({ verdict, scamType, reason, threatScore }) {
    const colors = {
        SCAM: { bg: "#e63946" },
        SUSPICIOUS: { bg: "#f4a261" },
    }
    const c = colors[verdict]
    if (!c) return null
    return (
        <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{
                display: "flex", alignItems: "flex-start", gap: 8,
                background: c.bg, borderRadius: 10, padding: "7px 12px",
                marginBottom: 6, fontSize: 11, color: "#fff",
                fontFamily: "Sora, sans-serif", lineHeight: 1.5,
            }}
        >
            <span style={{ fontSize: 13, flexShrink: 0 }}>{verdict === "SCAM" ? "🚨" : "⚠️"}</span>
            <div>
                <div style={{ fontWeight: 700, fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 2 }}>
                    {scamType || verdict} — {threatScore}/100
                </div>
                <div style={{ opacity: 0.92 }}>{reason}</div>
            </div>
        </motion.div>
    )
}

function OutlookBanner({ result }) {
    const [dismissed, setDismissed] = useState(false)
    if (dismissed || !result) return null
    const isScam = result.verdict === "SCAM"
    const color = isScam ? "#e63946" : "#f4a261"
    const borderColor = isScam ? "#c1121f" : "#e76f51"
    return (
        <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{
                background: color, borderRadius: 8, padding: "12px 16px",
                marginBottom: 16, borderLeft: `4px solid ${borderColor}`,
                fontFamily: "Sora, sans-serif", position: "relative",
                boxShadow: `0 4px 20px ${isScam ? "rgba(230,57,70,0.25)" : "rgba(244,162,97,0.25)"}`,
            }}
        >
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                <span style={{ fontSize: 15 }}>{isScam ? "🚨" : "⚠️"}</span>
                <span style={{ color: "#fff", fontWeight: 700, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                    {result.scam_type || result.verdict}
                </span>
                <span style={{ marginLeft: "auto", background: "rgba(0,0,0,0.2)", color: "#fff", fontSize: 10, padding: "2px 8px", borderRadius: 999 }}>
                    Threat {result.threat_score}/100
                </span>
            </div>
            <div style={{ color: "rgba(255,255,255,0.92)", fontSize: 12, lineHeight: 1.6 }}>{result.reason}</div>
            <button onClick={() => setDismissed(true)} style={{ position: "absolute", top: 10, right: 12, background: "rgba(0,0,0,0.2)", color: "#fff", border: "none", borderRadius: 4, padding: "2px 8px", fontSize: 10, cursor: "pointer", fontFamily: "Sora, sans-serif" }}>
                Dismiss
            </button>
        </motion.div>
    )
}

export default function DemoSimulator({ analyzerRef }) {
    const [phase, setPhase] = useState("idle")
    const [waResults, setWaResults] = useState({})
    const [outlookResult, setOutlookResult] = useState(null)
    const [progress, setProgress] = useState(0)
    const [scanning, setScanning] = useState(null)
    const [autoRan, setAutoRan] = useState(false)
    const autoTimer = useRef(null)

    useEffect(() => {
        autoTimer.current = setTimeout(() => {
            if (!autoRan) { runDemo(); setAutoRan(true) }
        }, 10000)
        return () => clearTimeout(autoTimer.current)
    }, [autoRan])

    const runDemo = async () => {
        if (phase === "running") return
        clearTimeout(autoTimer.current)
        setPhase("running")
        setWaResults({})
        setOutlookResult(null)
        setProgress(0)

        const steps = [
            ...WA_MESSAGES.filter(m => m.groqMessage).map(m => ({ type: "wa", id: m.id, text: m.groqMessage })),
            { type: "outlook", text: OUTLOOK_EMAIL.groqMessage }
        ]

        for (let i = 0; i < steps.length; i++) {
            const step = steps[i]
            setScanning(step.type === "wa" ? `wa_${step.id}` : "outlook")
            setProgress(Math.round(((i + 0.5) / steps.length) * 100))
            try {
                const result = await analyze(step.text, step.type === "wa" ? "WhatsApp message" : "college email")
                if (step.type === "wa") setWaResults(prev => ({ ...prev, [step.id]: result }))
                else setOutlookResult(result)
            } catch (e) { /* skip */ }
            setProgress(Math.round(((i + 1) / steps.length) * 100))
            await new Promise(r => setTimeout(r, 400))
        }

        setScanning(null)
        setPhase("done")
    }

    const reset = () => {
        setPhase("idle"); setWaResults({}); setOutlookResult(null)
        setProgress(0); setScanning(null); setAutoRan(false)
    }

    return (
        <section id="demo" style={{ padding: "80px 64px", maxWidth: 1200, margin: "0 auto" }}>
            <div style={{ borderTop: "1px solid #1e1e1e", paddingTop: 64 }}>

                {/* Header */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 48 }}>
                    <div>
                        <span style={{ display: "inline-block", border: "1px solid #1e1e1e", borderRadius: 999, padding: "4px 14px", fontSize: 11, color: "#9a9489", fontFamily: "Sora, sans-serif", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16 }}>
                            Live Demo
                        </span>
                        <h2 style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(28px,3vw,42px)", fontWeight: 700, color: "#f5f0e8", lineHeight: 1.15, letterSpacing: "-0.02em", margin: 0 }}>
                            Watch it work.<br /><em style={{ fontStyle: "italic", color: "#e63946" }}>Right now.</em>
                        </h2>
                    </div>
                    <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                        {phase === "done" && (
                            <button onClick={reset} style={{ padding: "10px 20px", borderRadius: 7, border: "1px solid #1e1e1e", background: "transparent", color: "#9a9489", fontSize: 12, fontFamily: "Sora, sans-serif", cursor: "pointer" }}>
                                Reset
                            </button>
                        )}
                        <button
                            onClick={runDemo}
                            disabled={phase === "running"}
                            style={{
                                padding: "12px 28px", borderRadius: 8, border: "none",
                                background: phase === "running" ? "rgba(230,57,70,0.3)" : "#e63946",
                                color: "#f5f0e8", fontSize: 13, fontFamily: "Sora, sans-serif",
                                fontWeight: 500, cursor: phase === "running" ? "not-allowed" : "pointer",
                                letterSpacing: "0.03em", display: "flex", alignItems: "center", gap: 8,
                            }}
                        >
                            {phase === "running" ? (
                                <>
                                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                                        style={{ width: 14, height: 14, border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "white", borderRadius: "50%" }} />
                                    Analyzing...
                                </>
                            ) : phase === "done" ? "▶ Run Again" : "▶ Run Live Analysis"}
                        </button>
                    </div>
                </div>

                {/* Progress bar */}
                <AnimatePresence>
                    {phase === "running" && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ marginBottom: 28 }}>
                            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: 11, color: "#9a9489", fontFamily: "Sora, sans-serif" }}>
                                <span style={{ letterSpacing: "0.06em", textTransform: "uppercase" }}>Running AI Analysis</span>
                                <span style={{ fontFamily: "Playfair Display, serif" }}>{progress}%</span>
                            </div>
                            <div style={{ background: "#1e1e1e", borderRadius: 999, height: 3 }}>
                                <motion.div animate={{ width: progress + "%" }} transition={{ duration: 0.4 }}
                                    style={{ height: "100%", background: "#e63946", borderRadius: 999 }} />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Split panels */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>

                    {/* WhatsApp panel */}
                    <div style={{ borderRadius: 14, border: "1px solid #1e1e1e", overflow: "hidden", background: "#0a0a0a" }}>
                        <div style={{ background: "#111", borderBottom: "1px solid #1e1e1e", padding: "12px 16px", display: "flex", alignItems: "center", gap: 10 }}>
                            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#52b788" }} />
                            <span style={{ fontFamily: "Sora, sans-serif", fontSize: 12, color: "#9a9489" }}>WhatsApp Web</span>
                            {phase !== "idle" && (
                                <span style={{ marginLeft: "auto", fontFamily: "Sora, sans-serif", fontSize: 10, color: scanning?.startsWith("wa") ? "#f4a261" : "#52b788", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                                    {scanning?.startsWith("wa") ? "Scanning..." : "Protected ✓"}
                                </span>
                            )}
                        </div>
                        <div style={{ padding: "16px 14px", display: "flex", flexDirection: "column", gap: 14, minHeight: 340 }}>
                            {WA_MESSAGES.map(msg => {
                                const result = waResults[msg.id]
                                const isScanning = scanning === `wa_${msg.id}`
                                return (
                                    <div key={msg.id}>
                                        {isScanning && <ScanLine />}
                                        {result && (result.verdict === "SCAM" || result.verdict === "SUSPICIOUS") && (
                                            <WaBadge verdict={result.verdict} scamType={result.scam_type} reason={result.reason} threatScore={result.threat_score} />
                                        )}
                                        <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                                            <div style={{ width: 32, height: 32, borderRadius: "50%", background: msg.avatarColor, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 13, color: "#fff", fontFamily: "Sora, sans-serif", fontWeight: 600 }}>
                                                {msg.avatar}
                                            </div>
                                            <div style={{ flex: 1, minWidth: 0 }}>
                                                <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 4 }}>
                                                    <span style={{ fontFamily: "Sora, sans-serif", fontSize: 12, fontWeight: 600, color: "#f5f0e8" }}>{msg.name}</span>
                                                    <span style={{ fontFamily: "Sora, sans-serif", fontSize: 10, color: "#9a9489" }}>{msg.time}</span>
                                                </div>
                                                <div style={{
                                                    background: result?.verdict === "SCAM" ? "rgba(230,57,70,0.08)" : result?.verdict === "SUSPICIOUS" ? "rgba(244,162,97,0.08)" : "#1a1a1a",
                                                    border: result?.verdict === "SCAM" ? "1px solid rgba(230,57,70,0.2)" : result?.verdict === "SUSPICIOUS" ? "1px solid rgba(244,162,97,0.2)" : "1px solid #1e1e1e",
                                                    borderRadius: "4px 12px 12px 12px", padding: "10px 12px",
                                                    fontFamily: "Sora, sans-serif", fontSize: 12, color: "#f5f0e8",
                                                    lineHeight: 1.65, wordBreak: "break-word", transition: "background 0.4s, border 0.4s",
                                                }}>
                                                    {msg.text}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    {/* Outlook panel */}
                    <div style={{ borderRadius: 14, border: "1px solid #1e1e1e", overflow: "hidden", background: "#0a0a0a" }}>
                        <div style={{ background: "#111", borderBottom: "1px solid #1e1e1e", padding: "12px 16px", display: "flex", alignItems: "center", gap: 10 }}>
                            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#4a9eff" }} />
                            <span style={{ fontFamily: "Sora, sans-serif", fontSize: 12, color: "#9a9489" }}>Outlook Web</span>
                            {phase !== "idle" && (
                                <span style={{ marginLeft: "auto", fontFamily: "Sora, sans-serif", fontSize: 10, color: scanning === "outlook" ? "#f4a261" : outlookResult ? "#52b788" : "#9a9489", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                                    {scanning === "outlook" ? "Scanning..." : outlookResult ? "Protected ✓" : ""}
                                </span>
                            )}
                        </div>
                        <div style={{ padding: "16px 14px", minHeight: 340 }}>
                            {scanning === "outlook" && <ScanLine />}
                            <div style={{ marginBottom: 14, paddingBottom: 14, borderBottom: "1px solid #1e1e1e" }}>
                                <div style={{ fontFamily: "Playfair Display, serif", fontSize: 15, fontWeight: 600, color: "#f5f0e8", marginBottom: 10, lineHeight: 1.3 }}>
                                    {OUTLOOK_EMAIL.subject}
                                </div>
                                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                    <div style={{ width: 30, height: 30, borderRadius: "50%", background: "#1a3a5c", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: "#4a9eff", fontFamily: "Sora, sans-serif", fontWeight: 600, flexShrink: 0 }}>T</div>
                                    <div>
                                        <div style={{ fontFamily: "Sora, sans-serif", fontSize: 12, color: "#f5f0e8", fontWeight: 500 }}>{OUTLOOK_EMAIL.fromName}</div>
                                        <div style={{ fontFamily: "Sora, sans-serif", fontSize: 10, color: "#e63946" }}>{OUTLOOK_EMAIL.from}</div>
                                    </div>
                                    <div style={{ marginLeft: "auto", fontFamily: "Sora, sans-serif", fontSize: 10, color: "#9a9489" }}>{OUTLOOK_EMAIL.time}</div>
                                </div>
                            </div>
                            <AnimatePresence>
                                {outlookResult && <OutlookBanner result={outlookResult} />}
                            </AnimatePresence>
                            <div style={{ fontFamily: "Sora, sans-serif", fontSize: 12, color: "#9a9489", lineHeight: 1.75, whiteSpace: "pre-line" }}>
                                {OUTLOOK_EMAIL.body}
                            </div>
                        </div>
                    </div>

                </div>

                {/* Footer note */}
                <div style={{ marginTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
                    <p style={{ fontFamily: "Sora, sans-serif", fontSize: 12, color: "#374151", margin: 0, maxWidth: 500, lineHeight: 1.6 }}>
                        Live simulation using the real AI engine — not a recording. The same analysis runs automatically in WhatsApp and Outlook via the Chrome extension.
                    </p>
                    <button
                        onClick={() => analyzerRef?.current?.scrollIntoView({ behavior: "smooth" })}
                        style={{ padding: "10px 22px", borderRadius: 7, border: "1px solid #1e1e1e", background: "transparent", color: "#9a9489", fontSize: 12, fontFamily: "Sora, sans-serif", cursor: "pointer", whiteSpace: "nowrap" }}
                    >
                        Try your own message →
                    </button>
                </div>

            </div>
        </section>
    )
}
