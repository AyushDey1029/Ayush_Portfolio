const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const targetDir = path.join(__dirname, 'public', 'assets', 'lanyard');

const frontSvg = `
<svg width="1024" height="1440" viewBox="0 0 1024 1440" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="craftGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#38bdf8" />
      <stop offset="50%" stop-color="#818cf8" />
      <stop offset="100%" stop-color="#c084fc" />
    </linearGradient>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#0f131a" />
      <stop offset="100%" stop-color="#07080b" />
    </linearGradient>
    <linearGradient id="borderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="rgba(56, 189, 248, 0.5)" />
      <stop offset="50%" stop-color="rgba(129, 140, 248, 0.2)" />
      <stop offset="100%" stop-color="rgba(192, 132, 252, 0.5)" />
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1024" height="1440" rx="48" fill="url(#bgGrad)" />
  <rect x="24" y="24" width="976" height="1392" rx="36" fill="none" stroke="url(#borderGrad)" stroke-width="4" />
  
  <!-- Subtle Grid Texture -->
  <g opacity="0.04" stroke="#ffffff" stroke-width="2">
    <line x1="0" y1="200" x2="1024" y2="200" />
    <line x1="0" y1="400" x2="1024" y2="400" />
    <line x1="0" y1="600" x2="1024" y2="600" />
    <line x1="0" y1="800" x2="1024" y2="800" />
    <line x1="0" y1="1000" x2="1024" y2="1000" />
    <line x1="0" y1="1200" x2="1024" y2="1200" />
    <line x1="256" y1="0" x2="256" y2="1440" />
    <line x1="512" y1="0" x2="512" y2="1440" />
    <line x1="768" y1="0" x2="768" y2="1440" />
  </g>

  <!-- Clip Hole Notch Representation -->
  <rect x="442" y="56" width="140" height="28" rx="14" fill="#000000" stroke="rgba(255,255,255,0.2)" stroke-width="2" />

  <!-- Corner Crosshairs -->
  <g stroke="rgba(56, 189, 248, 0.6)" stroke-width="3">
    <path d="M 64 120 L 84 120 M 74 110 L 74 130" />
    <path d="M 940 120 L 960 120 M 950 110 L 950 130" />
    <path d="M 64 1320 L 84 1320 M 74 1310 L 74 1330" />
    <path d="M 940 1320 L 960 1320 M 950 1310 L 950 1330" />
  </g>

  <!-- Top Metadata Bar -->
  <g transform="translate(100, 190)">
    <circle cx="10" cy="10" r="8" fill="#10b981" />
    <text x="35" y="16" font-family="monospace" font-size="24" font-weight="700" fill="#38bdf8" letter-spacing="4">DEVELOPER PASS // 2026</text>
    <text x="824" y="16" text-anchor="end" font-family="monospace" font-size="22" fill="#64748b" letter-spacing="3">VOL. 01</text>
  </g>

  <!-- Inner Content Frame -->
  <rect x="80" y="240" width="864" height="960" rx="24" fill="rgba(255,255,255,0.015)" stroke="rgba(255,255,255,0.06)" stroke-width="2" />

  <!-- Center Typography: BEHOLD THE CRAFT -->
  <g text-anchor="middle" transform="translate(512, 630)">
    <text x="0" y="0" font-family="'Segoe UI', Roboto, Helvetica, sans-serif" font-size="110" font-weight="900" fill="#ffffff" letter-spacing="18">BEHOLD</text>
    <text x="0" y="135" font-family="'Segoe UI', Roboto, Helvetica, sans-serif" font-size="110" font-weight="900" fill="url(#craftGrad)" letter-spacing="18">THE CRAFT</text>
  </g>

  <!-- Accent Line and Diamond -->
  <g transform="translate(512, 850)">
    <line x1="-320" y1="0" x2="-40" y2="0" stroke="rgba(255,255,255,0.15)" stroke-width="2" />
    <polygon points="0,-12 12,0 0,12 -12,0" fill="#38bdf8" />
    <line x1="40" y1="0" x2="320" y2="0" stroke="rgba(255,255,255,0.15)" stroke-width="2" />
  </g>

  <!-- Title & Subtitle -->
  <g text-anchor="middle" transform="translate(512, 930)">
    <text x="0" y="0" font-family="monospace" font-size="32" font-weight="700" fill="#f1f5f9" letter-spacing="6">AYUSH DEY</text>
    <text x="0" y="48" font-family="'Segoe UI', Roboto, sans-serif" font-size="22" font-weight="500" fill="#94a3b8" letter-spacing="4">FULL-STACK &amp; MACHINE LEARNING ENGINEER</text>
  </g>

  <!-- Tech Badges -->
  <g transform="translate(240, 1070)">
    <rect x="0" y="0" width="150" height="42" rx="8" fill="rgba(56, 189, 248, 0.1)" stroke="rgba(56, 189, 248, 0.3)" stroke-width="1.5" />
    <text x="75" y="27" text-anchor="middle" font-family="monospace" font-size="18" fill="#38bdf8" font-weight="600">REACT</text>

    <rect x="180" y="0" width="160" height="42" rx="8" fill="rgba(129, 140, 248, 0.1)" stroke="rgba(129, 140, 248, 0.3)" stroke-width="1.5" />
    <text x="260" y="27" text-anchor="middle" font-family="monospace" font-size="18" fill="#818cf8" font-weight="600">PYTORCH</text>

    <rect x="370" y="0" width="170" height="42" rx="8" fill="rgba(192, 132, 252, 0.1)" stroke="rgba(192, 132, 252, 0.3)" stroke-width="1.5" />
    <text x="455" y="27" text-anchor="middle" font-family="monospace" font-size="18" fill="#c084fc" font-weight="600">NODE.JS</text>
  </g>

  <!-- Bottom Details & Barcode -->
  <g transform="translate(100, 1260)">
    <text x="0" y="30" font-family="monospace" font-size="20" fill="#475569" letter-spacing="3">HASH: 0x9044F • LPU // CSE</text>
    <text x="824" y="30" text-anchor="end" font-family="monospace" font-size="20" fill="#38bdf8" letter-spacing="2">VERIFIED ACCESS</text>
    
    <!-- Stylized Mini Barcode -->
    <g transform="translate(0, 55)" fill="#64748b">
      <rect x="0" y="0" width="6" height="32" />
      <rect x="12" y="0" width="14" height="32" />
      <rect x="32" y="0" width="4" height="32" />
      <rect x="42" y="0" width="10" height="32" />
      <rect x="58" y="0" width="8" height="32" />
      <rect x="72" y="0" width="4" height="32" />
      <rect x="82" y="0" width="16" height="32" />
      <rect x="104" y="0" width="6" height="32" />
      <rect x="116" y="0" width="12" height="32" />
      <rect x="134" y="0" width="6" height="32" />
      <rect x="146" y="0" width="14" height="32" />
      <rect x="166" y="0" width="4" height="32" />
      <rect x="176" y="0" width="10" height="32" />
      <rect x="192" y="0" width="8" height="32" />
      <rect x="206" y="0" width="4" height="32" />
      <rect x="216" y="0" width="16" height="32" />
      <rect x="238" y="0" width="6" height="32" />
      <rect x="250" y="0" width="12" height="32" />
      <rect x="268" y="0" width="6" height="32" />
      <rect x="280" y="0" width="14" height="32" />
      <rect x="300" y="0" width="4" height="32" />
      <rect x="310" y="0" width="10" height="32" />
      <rect x="326" y="0" width="8" height="32" />
    </g>
  </g>
</svg>
`;

const backSvg = `
<svg width="1024" height="1440" viewBox="0 0 1024 1440" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGradBack" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#0b0d13" />
      <stop offset="100%" stop-color="#050608" />
    </linearGradient>
    <linearGradient id="emblemGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#38bdf8" />
      <stop offset="100%" stop-color="#c084fc" />
    </linearGradient>
  </defs>

  <rect width="1024" height="1440" rx="48" fill="url(#bgGradBack)" />
  <rect x="24" y="24" width="976" height="1392" rx="36" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="4" />

  <!-- Center Monogram Emblem -->
  <g transform="translate(512, 700)" text-anchor="middle">
    <circle cx="0" cy="0" r="140" fill="none" stroke="url(#emblemGrad)" stroke-width="4" stroke-dasharray="8 6" />
    <circle cx="0" cy="0" r="110" fill="rgba(56, 189, 248, 0.04)" stroke="rgba(255,255,255,0.15)" stroke-width="2" />
    <text x="0" y="32" font-family="'Segoe UI', sans-serif" font-size="90" font-weight="900" fill="url(#emblemGrad)" letter-spacing="6">AD</text>
    
    <text x="0" y="220" font-family="monospace" font-size="26" font-weight="700" fill="#f8fafc" letter-spacing="8">AYUSH DEY</text>
    <text x="0" y="265" font-family="monospace" font-size="18" fill="#64748b" letter-spacing="4">SYSTEM PASS • 2026</text>
  </g>
</svg>
`;

async function run() {
  await sharp(Buffer.from(frontSvg)).png().toFile(path.join(targetDir, 'card-front.png'));
  console.log('Generated card-front.png');
  await sharp(Buffer.from(backSvg)).png().toFile(path.join(targetDir, 'card-back.png'));
  console.log('Generated card-back.png');
}

run();
