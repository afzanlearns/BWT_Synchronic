import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
const V = { SCAM: { c: '#e63946', icon: '🚨', label: 'SCAM DETECTED' }, SUSPICIOUS: { c: '#f4a261', icon: '⚠️', label: 'SUSPICIOUS' }, SAFE: { c: '#52b788', icon: '✓', label: 'LOOKS SAFE' } }
export default function ResultCard({ result, onReset, onShare }) {
  const v = V[result.verdict] || V.SUSPICIOUS
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel()
    }
  }, [])

  const toggleSpeech = () => {
    if (isPlaying) {
      window.speechSynthesis.cancel()
      setIsPlaying(false)
      return
    }

    const textParts = [
      v.label,
      "Threat Score is " + result.threat_score,
      result.explanation,
      result.what_they_want ? "They want: " + result.what_they_want : "",
      result.what_to_do ? "What to do: " + result.what_to_do : ""
    ];

    // We try to combine the text in a natural way. Since the output is generated in the selected lang,
    // the system voice will do its best based on device language settings.
    const fullText = textParts.filter(Boolean).join(". ");

    const utterance = new SpeechSynthesisUtterance(fullText);

    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);

    window.speechSynthesis.speak(utterance);
    setIsPlaying(true);
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ borderRadius: 16, border: '1px solid ' + v.c + '44', background: v.c + '11', padding: 28 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 32 }}>{v.icon}</span>
          <div>
            <div style={{ fontSize: 20, fontWeight: 700, color: v.c, fontFamily: 'Playfair Display,serif' }}>{v.label}</div>
            {result.scam_type && <div style={{ color: '#9a9489', fontSize: 12 }}>{result.scam_type}</div>}
          </div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontFamily: 'Playfair Display,serif', fontSize: 36, color: v.c, fontWeight: 700 }}>{result.threat_score}</div>
          <div style={{ color: '#9a9489', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Threat</div>
        </div>
      </div>
      <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: 10, padding: 16, marginBottom: 14, border: '1px solid #1e1e1e' }}>
        <p style={{ color: '#f5f0e8', lineHeight: 1.75, fontSize: 14, margin: 0 }}>{result.explanation}</p>
      </div>
      {result.translated_summary && result.translated_summary !== result.explanation && (
        <div style={{ borderRadius: 10, padding: 14, marginBottom: 14, border: '1px solid #1e1e1e', background: 'rgba(255,255,255,0.02)' }}>
          <div style={{ color: '#9a9489', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }}>Translation</div>
          <p style={{ color: '#9a9489', fontSize: 13, lineHeight: 1.65, margin: 0 }}>{result.translated_summary}</p>
        </div>
      )}
      {result.red_flags?.length > 0 && (
        <div style={{ marginBottom: 14 }}>
          <div style={{ color: '#9a9489', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>Red Flags</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {result.red_flags.map((f, i) => (
              <span key={i} style={{ background: 'rgba(230,57,70,0.1)', border: '1px solid rgba(230,57,70,0.25)', color: '#fca5a5', fontSize: 11, padding: '4px 12px', borderRadius: 999 }}>{f}</span>
            ))}
          </div>
        </div>
      )}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
        {result.what_they_want && (
          <div style={{ background: 'rgba(230,57,70,0.06)', border: '1px solid rgba(230,57,70,0.15)', borderRadius: 10, padding: 14 }}>
            <div style={{ color: '#e63946', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }}>They Want</div>
            <p style={{ color: '#fca5a5', fontSize: 12, margin: 0, lineHeight: 1.5 }}>{result.what_they_want}</p>
          </div>
        )}
        {result.what_to_do && (
          <div style={{ background: 'rgba(82,183,136,0.06)', border: '1px solid rgba(82,183,136,0.15)', borderRadius: 10, padding: 14 }}>
            <div style={{ color: '#52b788', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }}>What To Do</div>
            <p style={{ color: '#86efac', fontSize: 12, margin: 0, lineHeight: 1.5 }}>{result.what_to_do}</p>
          </div>
        )}
      </div>
      <div style={{ display: 'flex', gap: 12 }}>
        <button onClick={() => { window.speechSynthesis.cancel(); onReset() }} style={{ flex: 1, padding: '13px 0', borderRadius: 8, background: 'transparent', border: '1px solid #1e1e1e', color: '#9a9489', fontSize: 12, fontFamily: 'Sora,sans-serif', cursor: 'pointer' }}>Back</button>
        <button onClick={toggleSpeech} style={{ flex: 1, padding: '13px 0', borderRadius: 8, background: 'transparent', border: '1px solid #52b788', color: '#52b788', fontSize: 12, fontFamily: 'Sora,sans-serif', cursor: 'pointer' }}>{isPlaying ? 'Stop Reading' : 'Read Aloud'}</button>
        <button onClick={onShare} style={{ flex: 1, padding: '13px 0', borderRadius: 8, background: '#e63946', border: 'none', color: '#f5f0e8', fontSize: 12, fontFamily: 'Sora,sans-serif', fontWeight: 500, cursor: 'pointer' }}>Warn Others</button>
      </div>
    </motion.div>
  )
}

