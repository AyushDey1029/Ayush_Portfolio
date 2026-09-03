const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const userPhotoPath = 'C:\\Users\\Ayush\\.gemini\\antigravity-ide\\brain\\5b54c791-96f5-4f3b-96f3-6d40541a21ec\\.user_uploaded\\media_1788454825521.jpg';
const outputDir = path.join(__dirname, 'public', 'assets', 'lanyard');

async function createProfileCard() {
  console.log('Processing user photo...');
  // 1. Resize and crop the user's photo to fit the card inner frame (840 x 880)
  // Focusing on the upper body and guitar
  const photoW = 840;
  const photoH = 880;

  const croppedPhoto = await sharp(userPhotoPath)
    .resize({
      width: photoW,
      height: photoH,
      fit: 'cover',
      position: 'top' // Focus on head, torso, and guitar
    })
    .toBuffer();

  // Create rounded mask for photo
  const maskSvg = `
    <svg width="${photoW}" height="${photoH}">
      <rect x="0" y="0" width="${photoW}" height="${photoH}" rx="24" ry="24" fill="#fff" />
    </svg>
  `;
  const roundedPhoto = await sharp(croppedPhoto)
    .composite([{ input: Buffer.from(maskSvg), blend: 'dest-in' }])
    .png()
    .toBuffer();

  // 2. Create the badge graphic frame SVG
  const cardW = 1024;
  const cardH = 1440;
  const photoX = 92;
  const photoY = 220;

  const badgeFrameSvg = `
  <svg width="${cardW}" height="${cardH}" viewBox="0 0 ${cardW} ${cardH}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="borderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#38bdf8" />
        <stop offset="50%" stop-color="#818cf8" />
        <stop offset="100%" stop-color="#c084fc" />
      </linearGradient>
      <linearGradient id="bgGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#11151e" />
        <stop offset="100%" stop-color="#080a0e" />
      </linearGradient>
    </defs>

    <!-- Outer Card Body -->
    <rect width="${cardW}" height="${cardH}" rx="48" fill="url(#bgGrad)" />
    <rect x="16" y="16" width="${cardW - 32}" height="${cardH - 32}" rx="38" fill="none" stroke="url(#borderGrad)" stroke-width="4" opacity="0.8" />

    <!-- Top clip notch -->
    <rect x="442" y="48" width="140" height="26" rx="13" fill="#000000" stroke="rgba(255,255,255,0.2)" stroke-width="2" />

    <!-- Top header text -->
    <circle cx="100" cy="140" r="8" fill="#10b981" />
    <text x="125" y="147" font-family="monospace" font-size="24" font-weight="700" fill="#38bdf8" letter-spacing="4">DEVELOPER IDENTITY // 2026</text>
    <text x="924" y="147" text-anchor="end" font-family="monospace" font-size="22" fill="#64748b" letter-spacing="3">AUTHENTICATED</text>

    <!-- Photo Border / Glow -->
    <rect x="${photoX - 4}" y="${photoY - 4}" width="${photoW + 8}" height="${photoH + 8}" rx="28" fill="none" stroke="url(#borderGrad)" stroke-width="3" opacity="0.9" />

    <!-- Bottom Footer Credentials -->
    <g transform="translate(512, 1170)" text-anchor="middle">
      <text x="0" y="0" font-family="'Segoe UI', Roboto, sans-serif" font-size="44" font-weight="800" fill="#ffffff" letter-spacing="8">AYUSH DEY</text>
      <text x="0" y="45" font-family="monospace" font-size="22" font-weight="600" fill="#38bdf8" letter-spacing="4">SOFTWARE &amp; ML DEVELOPER</text>
      <line x1="-300" y1="75" x2="300" y2="75" stroke="rgba(255,255,255,0.12)" stroke-width="2" />
    </g>

    <g transform="translate(100, 1310)">
      <text x="0" y="24" font-family="monospace" font-size="20" fill="#64748b" letter-spacing="3">ID: AD-9044 • LPU // CSE</text>
      <text x="824" y="24" text-anchor="end" font-family="monospace" font-size="20" fill="#10b981" letter-spacing="2">ACTIVE ACCESS</text>
      
      <!-- Mini barcode -->
      <g transform="translate(0, 48)" fill="#475569">
        <rect x="0" y="0" width="6" height="28" />
        <rect x="12" y="0" width="12" height="28" />
        <rect x="30" y="0" width="4" height="28" />
        <rect x="40" y="0" width="10" height="28" />
        <rect x="56" y="0" width="8" height="28" />
        <rect x="70" y="0" width="14" height="28" />
        <rect x="90" y="0" width="6" height="28" />
        <rect x="102" y="0" width="10" height="28" />
        <rect x="118" y="0" width="6" height="28" />
        <rect x="130" y="0" width="14" height="28" />
        <rect x="150" y="0" width="4" height="28" />
        <rect x="160" y="0" width="10" height="28" />
        <rect x="176" y="0" width="8" height="28" />
        <rect x="190" y="0" width="14" height="28" />
      </g>
    </g>
  </svg>
  `;

  // 3. Composite the rounded photo onto the badge frame
  const finalCard = await sharp(Buffer.from(badgeFrameSvg))
    .composite([
      {
        input: roundedPhoto,
        left: photoX,
        top: photoY
      }
    ])
    .png()
    .toFile(path.join(outputDir, 'card-profile.png'));

  console.log('Saved card-profile.png with user photo successfully!');
}

createProfileCard().catch(console.error);
