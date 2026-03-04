export default function PhoneSketch() {
  return (
    <svg viewBox="0 0 340 480" fill="none" xmlns="http://www.w3.org/2000/svg" style={{width:"100%",maxHeight:480}}>
      <defs>
        <filter id="sk">
          <feTurbulence type="turbulence" baseFrequency="0.04" numOctaves="4" seed="3" result="n"/>
          <feDisplacementMap in="SourceGraphic" in2="n" scale="1.2" xChannelSelector="R" yChannelSelector="G"/>
        </filter>
      </defs>
      {/* Phone */}
      <rect x="90" y="40" width="160" height="360" rx="22" stroke="#f5f0e8" strokeWidth="1.5" strokeDasharray="4 2" fill="none" filter="url(#sk)" opacity="0.7"/>
      <rect x="100" y="68" width="140" height="284" rx="4" stroke="#f5f0e8" strokeWidth="0.8" fill="#111" opacity="0.5"/>
      <rect x="155" y="50" width="30" height="9" rx="4" stroke="#f5f0e8" strokeWidth="0.7" fill="none" opacity="0.5"/>
      <line x1="150" y1="385" x2="190" y2="385" stroke="#f5f0e8" strokeWidth="1.5" strokeLinecap="round" opacity="0.4"/>
      {/* Messages on screen */}
      {[88,130,172].map((y,i) => (
        <g key={i}>
          <rect x="107" y={y} width="126" height="32" rx="6" stroke="#f5f0e8" strokeWidth="0.7" fill="#1a1a1a" opacity="0.8"/>
          <line x1="116" y1={y+11} x2="222" y2={y+11} stroke="#9a9489" strokeWidth="0.6" opacity="0.6"/>
          <line x1="116" y1={y+20} x2="205" y2={y+20} stroke="#9a9489" strokeWidth="0.6" opacity="0.4"/>
          <line x1={221} y1={y+7} x2={229} y2={y+15} stroke="#e63946" strokeWidth="1.1" strokeLinecap="round" opacity="0.7"/>
          <line x1={229} y1={y+7} x2={221} y2={y+15} stroke="#e63946" strokeWidth="1.1" strokeLinecap="round" opacity="0.7"/>
        </g>
      ))}
      {/* Alert badge top-right */}
      <g transform="translate(216,12)">
        <rect width="124" height="50" rx="10" stroke="#e63946" strokeWidth="1.2" fill="#1a0a0a" opacity="0.95"/>
        <circle cx="16" cy="15" r="7" stroke="#e63946" strokeWidth="1" fill="none"/>
        <line x1="16" y1="11" x2="16" y2="17" stroke="#e63946" strokeWidth="1.2" strokeLinecap="round"/>
        <circle cx="16" cy="20" r="1" fill="#e63946"/>
        <line x1="29" y1="12" x2="112" y2="12" stroke="#e63946" strokeWidth="0.8" opacity="0.9"/>
        <line x1="29" y1="20" x2="100" y2="20" stroke="#9a9489" strokeWidth="0.7" opacity="0.6"/>
        <line x1="29" y1="28" x2="90" y2="28" stroke="#9a9489" strokeWidth="0.7" opacity="0.4"/>
        <text x="29" y="43" fill="#e63946" fontSize="8" fontFamily="Sora,sans-serif" opacity="0.9">SCAM DETECTED</text>
        <line x1="0" y1="50" x2="-30" y2="80" stroke="#e63946" strokeWidth="0.6" strokeDasharray="3 2" opacity="0.5"/>
      </g>
      {/* Alert badge left */}
      <g transform="translate(-94,148)">
        <rect width="114" height="46" rx="10" stroke="#f4a261" strokeWidth="1.2" fill="#1a1208" opacity="0.95"/>
        <circle cx="14" cy="13" r="6" stroke="#f4a261" strokeWidth="1" fill="none"/>
        <line x1="14" y1="9" x2="14" y2="15" stroke="#f4a261" strokeWidth="1.2" strokeLinecap="round"/>
        <circle cx="14" cy="18" r="1" fill="#f4a261"/>
        <line x1="26" y1="10" x2="102" y2="10" stroke="#f4a261" strokeWidth="0.8" opacity="0.9"/>
        <line x1="26" y1="18" x2="96" y2="18" stroke="#9a9489" strokeWidth="0.7" opacity="0.6"/>
        <line x1="26" y1="26" x2="86" y2="26" stroke="#9a9489" strokeWidth="0.7" opacity="0.4"/>
        <text x="26" y="39" fill="#f4a261" fontSize="8" fontFamily="Sora,sans-serif" opacity="0.9">SUSPICIOUS</text>
        <line x1="114" y1="23" x2="154" y2="28" stroke="#f4a261" strokeWidth="0.6" strokeDasharray="3 2" opacity="0.5"/>
      </g>
      {/* Alert badge bottom-right */}
      <g transform="translate(208,318)">
        <rect width="114" height="46" rx="10" stroke="#e63946" strokeWidth="1.2" fill="#1a0a0a" opacity="0.95"/>
        <circle cx="14" cy="13" r="6" stroke="#e63946" strokeWidth="1" fill="none"/>
        <line x1="14" y1="9" x2="14" y2="15" stroke="#e63946" strokeWidth="1.2" strokeLinecap="round"/>
        <circle cx="14" cy="18" r="1" fill="#e63946"/>
        <line x1="26" y1="10" x2="102" y2="10" stroke="#e63946" strokeWidth="0.8" opacity="0.9"/>
        <line x1="26" y1="18" x2="96" y2="18" stroke="#9a9489" strokeWidth="0.7" opacity="0.6"/>
        <line x1="26" y1="26" x2="76" y2="26" stroke="#9a9489" strokeWidth="0.7" opacity="0.4"/>
        <text x="26" y="39" fill="#e63946" fontSize="8" fontFamily="Sora,sans-serif" opacity="0.9">DIGITAL ARREST</text>
        <line x1="0" y1="20" x2="-18" y2="14" stroke="#e63946" strokeWidth="0.6" strokeDasharray="3 2" opacity="0.5"/>
      </g>
      {/* Shield */}
      <path d="M170 230 L160 239 L160 252 C160 259 165 265 170 268 C175 265 180 259 180 252 L180 239 Z" stroke="#52b788" strokeWidth="1" fill="none" opacity="0.5"/>
      <path d="M165 250 L168 254 L176 246" stroke="#52b788" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.7"/>
    </svg>
  )
}
