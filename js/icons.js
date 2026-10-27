/* =========================================================
   EcoGuardiões — Biblioteca Vetorial Customizada (icons.js)
   Substitui 100% dos emojis do sistema por ilustrações SVG
   autorais, ícones de UI, mascotes expressivos, itens de
   coleta seletiva e cenários arquitetônicos interativos.
   ========================================================= */
(function () {
  'use strict';

  /* ---------------- ÍCONES DE INTERFACE (UI) ---------------- */
  const UI = {
    home: `<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/></svg>`,
    trails: `<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/><path d="M9 7h6M9 11h4"/></svg>`,
    games: `<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="6" width="20" height="12" rx="6"/><path d="M6 12h4M8 10v4"/><circle cx="15.5" cy="10.5" r="1" fill="currentColor"/><circle cx="17.5" cy="13.5" r="1" fill="currentColor"/></svg>`,
    calc: `<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="2" width="16" height="20" rx="2.5"/><rect x="7.5" y="5.5" width="9" height="3.5" rx="1"/><path d="M8 13h.01M12 13h.01M16 13h.01M8 17h.01M12 17h.01M16 17h.01" stroke-width="2.8"/></svg>`,
    habits: `<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="9" r="6"/><path d="M8.5 14.5 7 22l5-2.5L17 22l-1.5-7.5"/><path d="m9.5 9 1.8 1.8 3.5-3.6"/></svg>`,
    star: `<svg class="ico ico-star" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4 6.1 20.5l1.2-6.5-4.8-4.6 6.6-.9L12 2.5z" fill="#F59E0B" stroke="#B45309" stroke-width="1.6" stroke-linejoin="round"/></svg>`,
    speaker: `<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.5 8.5a5 5 0 0 1 0 7M19 5a10 10 0 0 1 0 14"/></svg>`,
    soundOn: `<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>`,
    soundOff: `<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M13.73 21a2 2 0 0 1-3.46 0"/><path d="M18.63 13A17.89 17.89 0 0 1 18 8M6.26 6.26A5.86 5.86 0 0 0 6 8c0 7-3 9-3 9h14"/><path d="M18 8a6 6 0 0 0-9.33-5"/><line x1="1" y1="1" x2="23" y2="23"/></svg>`,
    modeKids: `<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M9 10h.01M15 10h.01" stroke-width="3"/><path d="M8.5 14.5c1 1.5 2.2 2 3.5 2s2.5-.5 3.5-2"/><path d="M12 3c1.5 0 2.5 1 2 2.5"/></svg>`,
    modeNormal: `<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="6.5" cy="14.5" r="3.5"/><circle cx="17.5" cy="14.5" r="3.5"/><path d="M10 14.5h4M3 14.5V9a2 2 0 0 1 2-2h1M21 14.5V9a2 2 0 0 0-2-2h-1"/></svg>`,
    check: `<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>`,
    cross: `<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
    arrowRight: `<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 5l7 7-7 7"/></svg>`,
    arrowLeft: `<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 12H5M11 19l-7-7 7-7"/></svg>`,
    refresh: `<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/></svg>`,
    lock: `<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="11" width="16" height="10" rx="2.5"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>`,
    print: `<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9V3h12v6"/><rect x="6" y="14" width="12" height="7" rx="1"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/></svg>`,
    menu: `<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>`,
    water: `<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" fill="currentColor" fill-opacity=".18"/></svg>`,
    energy: `<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" fill="currentColor" fill-opacity=".18"/></svg>`,
    leaf: `<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" fill="currentColor" fill-opacity=".18"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>`,
    globe: `<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3.6 9h16.8M3.6 15h16.8"/><path d="M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></svg>`,
    coin: `<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9" fill="currentColor" fill-opacity=".15"/><path d="M14.5 9.5c-.4-1-1.3-1.5-2.5-1.5-1.5 0-2.5.8-2.5 2s1 1.7 2.5 2 2.5.8 2.5 2-1 2-2.5 2c-1.2 0-2.1-.5-2.5-1.5M12 6.5v11"/></svg>`,
    recycle: `<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 19H4.815a1.83 1.83 0 0 1-1.57-.881 1.785 1.785 0 0 1-.004-1.784L7.196 9.5"/><path d="M11 19h8.203a1.83 1.83 0 0 0 1.556-.89 1.784 1.784 0 0 0 0-1.775l-1.226-2.12"/><path d="m14 16-3 3 3 3"/><path d="M8.293 13.596 7.196 9.5 3.1 10.598"/><path d="m9.344 5.811 1.093-1.892A1.83 1.83 0 0 1 11.985 3a1.784 1.784 0 0 1 1.546.888l3.943 6.843"/><path d="m13.378 9.633 4.096 1.098 1.097-4.096"/></svg>`,
    search: `<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="7" fill="currentColor" fill-opacity=".14"/><path d="m20 20-3.5-3.5"/></svg>`,
    quiz: `<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 2a7 7 0 0 1 5 11.9c-.9.9-1.5 2.1-1.5 3.1H8.5c0-1-.6-2.2-1.5-3.1A7 7 0 0 1 12 2z" fill="currentColor" fill-opacity=".16"/><path d="M9 20h6M10 23h4"/></svg>`,
    cert: `<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="14" rx="2"/><path d="M7 7h10M7 11h5"/><circle cx="16" cy="15" r="3" fill="#FDE68A"/><path d="m14.5 17.5-.5 4.5 2-1 2 1-.5-4.5"/></svg>`,
    trophy: `<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9H4a2 2 0 0 1-2-2V5h4M18 9h2a2 2 0 0 0 2-2V5h-4"/><path d="M6 4h12v5a6 6 0 0 1-12 0V4z" fill="#FDE68A"/><path d="M12 15v4M8 21h8"/></svg>`
  };

  /* ---------------- 3 MASCOTES ILUSTRADOS (SVG) ---------------- */
  const MASCOTS = {
    water: `<svg class="mascot-svg" viewBox="0 0 120 120" aria-hidden="true">
      <ellipse cx="60" cy="108" rx="30" ry="6" fill="#0284C7" opacity=".18"/>
      <path d="M60 12 C60 12 96 52 96 76 C96 96 80 106 60 106 C40 106 24 96 24 76 C24 52 60 12 60 12 Z" fill="#0EA5E9" stroke="#075985" stroke-width="3.5" stroke-linejoin="round"/>
      <path d="M60 16 C60 16 88 50 88 73 C88 88 76 98 60 98" fill="#38BDF8" opacity=".55"/>
      <path d="M40 58 C36 68 38 80 45 86" stroke="#BAE6FD" stroke-width="4.5" stroke-linecap="round" fill="none" opacity=".9"/>
      <circle cx="44" cy="46" r="3.5" fill="#E0F2FE"/>
      <circle cx="47" cy="70" r="6" fill="#0C4A6E"/>
      <circle cx="73" cy="70" r="6" fill="#0C4A6E"/>
      <circle cx="45" cy="68" r="2.2" fill="#FFF"/>
      <circle cx="71" cy="68" r="2.2" fill="#FFF"/>
      <ellipse cx="38" cy="77" rx="5" ry="3" fill="#F472B6" opacity=".65"/>
      <ellipse cx="82" cy="77" rx="5" ry="3" fill="#F472B6" opacity=".65"/>
      <path d="M51 81 Q60 90 69 81" stroke="#0C4A6E" stroke-width="3.5" stroke-linecap="round" fill="none"/>
    </svg>`,

    energy: `<svg class="mascot-svg" viewBox="0 0 120 120" aria-hidden="true">
      <ellipse cx="60" cy="108" rx="30" ry="6" fill="#B45309" opacity=".18"/>
      <circle cx="60" cy="60" r="44" fill="#FEF9C3" opacity=".75"/>
      <path d="M60 12 L73 36 L100 32 L84 55 L102 76 L75 80 L66 105 L50 83 L23 86 L36 62 L20 40 L47 38 Z" fill="#FACC15" stroke="#92400E" stroke-width="3.5" stroke-linejoin="round"/>
      <circle cx="60" cy="62" r="24" fill="#FDE047"/>
      <circle cx="48" cy="58" r="5.8" fill="#451A03"/>
      <circle cx="72" cy="58" r="5.8" fill="#451A03"/>
      <circle cx="46.5" cy="56" r="2" fill="#FFF"/>
      <circle cx="70.5" cy="56" r="2" fill="#FFF"/>
      <ellipse cx="39" cy="65" rx="4.5" ry="2.8" fill="#FB7185" opacity=".65"/>
      <ellipse cx="81" cy="65" rx="4.5" ry="2.8" fill="#FB7185" opacity=".65"/>
      <path d="M50 68 Q60 78 70 68" stroke="#451A03" stroke-width="3.5" stroke-linecap="round" fill="none"/>
    </svg>`,

    leaf: `<svg class="mascot-svg" viewBox="0 0 120 120" aria-hidden="true">
      <ellipse cx="60" cy="108" rx="30" ry="6" fill="#14532D" opacity=".18"/>
      <path d="M60 104 L60 92" stroke="#14532D" stroke-width="5" stroke-linecap="round"/>
      <path d="M60 16 C92 18 100 50 92 76 C84 96 68 100 60 100 C52 100 36 96 28 76 C20 50 28 18 60 16 Z" fill="#22C55E" stroke="#14532D" stroke-width="3.5" stroke-linejoin="round"/>
      <path d="M60 20 C84 22 90 48 84 72 C78 88 66 92 60 92" fill="#4ADE80" opacity=".55"/>
      <path d="M60 22 L60 44" stroke="#BBF7D0" stroke-width="3" stroke-linecap="round"/>
      <path d="M60 32 L70 25 M60 38 L49 30" stroke="#BBF7D0" stroke-width="2.5" stroke-linecap="round"/>
      <circle cx="47" cy="62" r="5.8" fill="#052E16"/>
      <circle cx="73" cy="62" r="5.8" fill="#052E16"/>
      <circle cx="45.5" cy="60" r="2" fill="#FFF"/>
      <circle cx="71.5" cy="60" r="2" fill="#FFF"/>
      <ellipse cx="38" cy="69" rx="5" ry="2.8" fill="#FB7185" opacity=".65"/>
      <ellipse cx="82" cy="69" rx="5" ry="2.8" fill="#FB7185" opacity=".65"/>
      <path d="M51 73 Q60 82 69 73" stroke="#052E16" stroke-width="3.5" stroke-linecap="round" fill="none"/>
    </svg>`
  };

  /* ---------------- LIXEIRAS VETORIAIS 3D ---------------- */
  function binSVG(color, labelColor, symbolType) {
    const emblem = symbolType === 'danger'
      ? `<path d="M36 38 L46 56 L26 56 Z" fill="none" stroke="${labelColor}" stroke-width="2.4" stroke-linejoin="round"/><path d="M36 44v6M36 53v.5" stroke="${labelColor}" stroke-width="2.4" stroke-linecap="round"/>`
      : symbolType === 'trash'
        ? `<circle cx="36" cy="48" r="9" fill="none" stroke="${labelColor}" stroke-width="2.2"/><path d="M31 43l10 10M41 43l-10 10" stroke="${labelColor}" stroke-width="2.2" stroke-linecap="round"/>`
        : `<path d="M36 39 l4 6 h-8 z M44 52 l-4 5 -3-5 z M28 52 l7 0 -3 5 z" fill="${labelColor}" opacity=".9"/><circle cx="36" cy="48" r="9" fill="none" stroke="${labelColor}" stroke-width="2.2" stroke-dasharray="9 4"/>`;
    return `<svg class="bin-svg" viewBox="0 0 72 88" aria-hidden="true">
      <g class="bin-cap">
        <rect x="8" y="8" width="56" height="9" rx="4.5" fill="${color}" stroke="#0F172A" stroke-width="2.5"/>
        <path d="M27 8 V4 a3 3 0 0 1 3-3 h12 a3 3 0 0 1 3 3 v4" fill="none" stroke="#0F172A" stroke-width="2.5"/>
      </g>
      <path d="M13 17 H59 L54 81 a5 5 0 0 1-5 4 H23 a5 5 0 0 1-5-4 Z" fill="${color}" stroke="#0F172A" stroke-width="2.5" stroke-linejoin="round"/>
      <path d="M19 23 V76" stroke="#FFFFFF" stroke-width="2.5" stroke-linecap="round" opacity=".32"/>
      ${emblem}
    </svg>`;
  }

  /* ---------------- ILUSTRAÇÕES DOS 20 ITENS DE COLETA ---------------- */
  const ITEMS = {
    banana: `<svg viewBox="0 0 64 64" class="item-svg"><path d="M18 46 C32 52 50 38 50 16 C44 28 32 38 14 38 Z" fill="#FACC15" stroke="#854D0E" stroke-width="2.5" stroke-linejoin="round"/><path d="M48 14 L52 10" stroke="#713F12" stroke-width="3.5" stroke-linecap="round"/><path d="M14 38 C20 48 34 54 46 46" fill="none" stroke="#FEF08A" stroke-width="2.5" stroke-linecap="round"/></svg>`,
    apple: `<svg viewBox="0 0 64 64" class="item-svg"><path d="M32 14 V8" stroke="#713F12" stroke-width="3" stroke-linecap="round"/><path d="M33 10 C40 6 45 10 42 15 C37 16 33 13 33 10Z" fill="#22C55E" stroke="#14532D" stroke-width="2"/><path d="M22 16 C12 16 10 30 16 44 C20 52 26 54 32 50 C38 54 44 52 48 44 C50 39 43 37 43 30 C43 23 49 21 46 18 C42 15 36 16 32 19 C28 16 25 16 22 16Z" fill="#EF4444" stroke="#7F1D1D" stroke-width="2.5" stroke-linejoin="round"/><path d="M43 22 C38 25 38 35 44 38" fill="#FEF2F2" stroke="#7F1D1D" stroke-width="2"/><circle cx="39" cy="29" r="1.5" fill="#713F12"/><circle cx="39" cy="33" r="1.5" fill="#713F12"/></svg>`,
    leaves: `<svg viewBox="0 0 64 64" class="item-svg"><path d="M14 48 C16 24 36 14 52 14 C50 32 38 48 14 48Z" fill="#D97706" stroke="#78350F" stroke-width="2.5" stroke-linejoin="round"/><path d="M12 50 L42 22" stroke="#78350F" stroke-width="2.5" stroke-linecap="round"/><path d="M26 36 L24 26 M34 30 L42 32" stroke="#78350F" stroke-width="2" stroke-linecap="round"/></svg>`,
    newspaper: `<svg viewBox="0 0 64 64" class="item-svg"><rect x="10" y="14" width="40" height="38" rx="3" fill="#F1F5F9" stroke="#334155" stroke-width="2.5"/><path d="M50 20 H55 a2 2 0 0 1 2 2 V49 a3 3 0 0 1-3 3 H50" fill="#CBD5E1" stroke="#334155" stroke-width="2.5"/><rect x="16" y="20" width="14" height="10" fill="#94A3B8"/><path d="M34 22h10M34 27h10M16 36h28M16 41h28M16 46h20" stroke="#475569" stroke-width="2.4" stroke-linecap="round"/></svg>`,
    box: `<svg viewBox="0 0 64 64" class="item-svg"><polygon points="32 10 54 20 54 44 32 54 10 44 10 20" fill="#D97706" stroke="#78350F" stroke-width="2.5" stroke-linejoin="round"/><polyline points="10 20 32 30 54 20" fill="none" stroke="#78350F" stroke-width="2.5"/><line x1="32" y1="30" x2="32" y2="54" stroke="#78350F" stroke-width="2.5"/><line x1="21" y1="15" x2="43" y2="25" stroke="#FDE68A" stroke-width="3"/></svg>`,
    notebook: `<svg viewBox="0 0 64 64" class="item-svg"><rect x="16" y="10" width="34" height="44" rx="3" fill="#3B82F6" stroke="#1E3A8A" stroke-width="2.5"/><rect x="22" y="18" width="22" height="10" rx="1.5" fill="#EFF6FF"/><path d="M12 16h6M12 24h6M12 32h6M12 40h6M12 48h6" stroke="#1E3A8A" stroke-width="3" stroke-linecap="round"/></svg>`,
    cup: `<svg viewBox="0 0 64 64" class="item-svg"><path d="M18 18 H46 L42 52 H22 Z" fill="#FCA5A5" stroke="#991B1B" stroke-width="2.5" stroke-linejoin="round"/><rect x="15" y="13" width="34" height="5" rx="2" fill="#EF4444" stroke="#991B1B" stroke-width="2.2"/><path d="M21 26H43M22 34H42M23 42H41" stroke="#FEE2E2" stroke-width="2"/></svg>`,
    bag: `<svg viewBox="0 0 64 64" class="item-svg"><path d="M18 22 H46 L50 52 H14 Z" fill="#F87171" stroke="#991B1B" stroke-width="2.5" stroke-linejoin="round"/><path d="M24 22 V15 a8 8 0 0 1 16 0 V22" fill="none" stroke="#991B1B" stroke-width="2.8"/></svg>`,
    bottle: `<svg viewBox="0 0 64 64" class="item-svg"><rect x="26" y="8" width="12" height="6" rx="1.5" fill="#0284C7" stroke="#0C4A6E" stroke-width="2"/><path d="M24 14 H40 L44 24 V52 a4 4 0 0 1-4 4 H24 a4 4 0 0 1-4-4 V24 Z" fill="#7DD3FC" stroke="#0C4A6E" stroke-width="2.5" stroke-linejoin="round"/><rect x="20" y="30" width="24" height="10" fill="#0284C7"/></svg>`,
    can: `<svg viewBox="0 0 64 64" class="item-svg"><rect x="18" y="12" width="28" height="42" rx="5" fill="#FACC15" stroke="#713F12" stroke-width="2.5"/><ellipse cx="32" cy="14" rx="13" ry="3.5" fill="#E2E8F0" stroke="#475569" stroke-width="2"/><path d="M18 26 H46 L46 38 H18 Z" fill="#EF4444"/></svg>`,
    clip: `<svg viewBox="0 0 64 64" class="item-svg"><path d="M26 22 V44 a8 8 0 0 0 16 0 V18 a11 11 0 0 0-22 0 V42 a14 14 0 0 0 28 0 V24" fill="none" stroke="#475569" stroke-width="3.5" stroke-linecap="round"/></svg>`,
    glass_bottle: `<svg viewBox="0 0 64 64" class="item-svg"><path d="M28 8 H36 V20 L43 28 V52 a3 3 0 0 1-3 3 H24 a3 3 0 0 1-3-3 V28 L28 20 Z" fill="#4ADE80" stroke="#14532D" stroke-width="2.5" stroke-linejoin="round"/><path d="M26 32 V48" stroke="#DCFCE7" stroke-width="2.5" stroke-linecap="round"/></svg>`,
    jar: `<svg viewBox="0 0 64 64" class="item-svg"><rect x="20" y="12" width="24" height="6" rx="2" fill="#94A3B8" stroke="#334155" stroke-width="2.2"/><rect x="16" y="18" width="32" height="36" rx="6" fill="#BBF7D0" stroke="#14532D" stroke-width="2.5"/><path d="M22 25 V46" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round"/></svg>`,
    mirror: `<svg viewBox="0 0 64 64" class="item-svg"><rect x="14" y="10" width="36" height="44" rx="6" fill="#E2E8F0" stroke="#475569" stroke-width="3"/><polyline points="16 22 32 32 26 42 46 50" fill="none" stroke="#1E293B" stroke-width="2.2"/><line x1="32" y1="32" x2="48" y2="20" stroke="#1E293B" stroke-width="2.2"/></svg>`,
    tissue: `<svg viewBox="0 0 64 64" class="item-svg"><path d="M18 44 C12 36 18 22 28 24 C32 16 44 18 46 28 C54 32 50 46 40 48 Z" fill="#E5E7EB" stroke="#4B5563" stroke-width="2.5" stroke-linejoin="round"/><path d="M26 34 l6 4 M36 30 l-4 8" stroke="#9CA3AF" stroke-width="2" stroke-linecap="round"/></svg>`,
    pizza: `<svg viewBox="0 0 64 64" class="item-svg"><polygon points="10 36 32 22 54 36 32 50" fill="#FDE68A" stroke="#78350F" stroke-width="2.5" stroke-linejoin="round"/><polygon points="12 24 34 10 54 24 32 36" fill="#FCD34D" stroke="#78350F" stroke-width="2.5" stroke-linejoin="round"/><circle cx="30" cy="36" r="4" fill="#D97706" opacity=".6"/><circle cx="38" cy="40" r="3" fill="#D97706" opacity=".6"/></svg>`,
    cig: `<svg viewBox="0 0 64 64" class="item-svg"><rect x="12" y="34" width="14" height="8" rx="1.5" fill="#F59E0B" stroke="#78350F" stroke-width="2"/><rect x="26" y="34" width="24" height="8" rx="1.5" fill="#F8FAFC" stroke="#475569" stroke-width="2"/><path d="M48 28 c2-4-2-6 0-10" fill="none" stroke="#94A3B8" stroke-width="2.5" stroke-linecap="round"/></svg>`,
    battery: `<svg viewBox="0 0 64 64" class="item-svg"><rect x="26" y="10" width="12" height="5" rx="1.5" fill="#64748B" stroke="#1E293B" stroke-width="2"/><rect x="18" y="15" width="28" height="40" rx="4" fill="#FB923C" stroke="#7C2D12" stroke-width="2.5"/><rect x="18" y="32" width="28" height="23" rx="3" fill="#1E293B"/><polygon points="34 20 26 32 33 32 30 44 38 30 32 30" fill="#FDE047"/></svg>`,
    phone: `<svg viewBox="0 0 64 64" class="item-svg"><rect x="18" y="8" width="28" height="48" rx="5" fill="#334155" stroke="#0F172A" stroke-width="2.5"/><rect x="22" y="14" width="20" height="32" rx="1.5" fill="#94A3B8"/><polyline points="24 20 34 28 28 36 40 42" fill="none" stroke="#1E293B" stroke-width="2"/><circle cx="32" cy="51" r="2" fill="#E2E8F0"/></svg>`,
    bulb: `<svg viewBox="0 0 64 64" class="item-svg"><path d="M24 38 V20 a8 8 0 0 1 16 0 V38" fill="none" stroke="#0F172A" stroke-width="6" stroke-linecap="round"/><path d="M24 38 V20 a8 8 0 0 1 16 0 V38" fill="none" stroke="#E0F2FE" stroke-width="3.2" stroke-linecap="round"/><rect x="22" y="38" width="20" height="12" rx="2" fill="#94A3B8" stroke="#334155" stroke-width="2.2"/><path d="M28 50 h8 v4 h-8 z" fill="#475569"/></svg>`
  };

  /* ---------------- ILUSTRAÇÕES DOS SLIDES INFANTIS ---------------- */
  const SLIDES = {
    drip: `<svg viewBox="0 0 160 110" class="slide-svg"><rect width="160" height="110" rx="16" fill="#E0F2FE"/><path d="M20 35 H75 a12 12 0 0 1 12 12 v10 H72 v-8 H20 Z" fill="#64748B" stroke="#1E293B" stroke-width="3"/><rect x="52" y="20" width="22" height="7" rx="3" fill="#0284C7" stroke="#1E293B" stroke-width="2.5"/><path d="M79 66 C79 66 88 78 88 84 a9 9 0 0 1-18 0 C70 78 79 66 79 66Z" fill="#0EA5E9" stroke="#0369A1" stroke-width="2.5"/><circle cx="122" cy="55" r="24" fill="#FFF" stroke="#0284C7" stroke-width="3"/><text x="122" y="61" text-anchor="middle" font-size="16" font-weight="800" fill="#0369A1">46 L</text></svg>`,
    meter: `<svg viewBox="0 0 160 110" class="slide-svg"><rect width="160" height="110" rx="16" fill="#DBEAFE"/><circle cx="80" cy="55" r="36" fill="#FFF" stroke="#1E3A8A" stroke-width="4"/><circle cx="80" cy="55" r="28" fill="#EFF6FF" stroke="#93C5FD" stroke-width="2"/><line x1="80" y1="55" x2="100" y2="42" stroke="#EF4444" stroke-width="4" stroke-linecap="round"/><circle cx="80" cy="55" r="5" fill="#1E3A8A"/></svg>`,
    shower: `<svg viewBox="0 0 160 110" class="slide-svg"><rect width="160" height="110" rx="16" fill="#E0F2FE"/><path d="M35 20 H85 v12 H65 Z" fill="#94A3B8" stroke="#1E293B" stroke-width="3"/><path d="M55 38 v14 M68 38 v18 M81 38 v14" stroke="#0EA5E9" stroke-width="3.5" stroke-linecap="round" stroke-dasharray="4 6"/><circle cx="118" cy="58" r="24" fill="#FEF3C7" stroke="#D97706" stroke-width="3"/><text x="118" y="64" text-anchor="middle" font-size="16" font-weight="800" fill="#92400E">5 min</text></svg>`,
    tooth: `<svg viewBox="0 0 160 110" class="slide-svg"><rect width="160" height="110" rx="16" fill="#DCFCE7"/><path d="M52 28 H88 L83 84 H57 Z" fill="#7DD3FC" stroke="#0369A1" stroke-width="3"/><rect x="98" y="22" width="10" height="64" rx="5" fill="#F43F5E" stroke="#881337" stroke-width="2.5"/><rect x="88" y="22" width="12" height="18" rx="3" fill="#FFF" stroke="#475569" stroke-width="2"/></svg>`,
    reuse: `<svg viewBox="0 0 160 110" class="slide-svg"><rect width="160" height="110" rx="16" fill="#E0F2FE"/><path d="M48 36 H112 L104 88 H56 Z" fill="#38BDF8" stroke="#075985" stroke-width="3"/><rect x="42" y="26" width="76" height="10" rx="4" fill="#0284C7" stroke="#075985" stroke-width="3"/><path d="M72 58 l6 6 12-12" stroke="#FFF" stroke-width="4" fill="none" stroke-linecap="round"/></svg>`,
    oil: `<svg viewBox="0 0 160 110" class="slide-svg"><rect width="160" height="110" rx="16" fill="#FEF3C7"/><path d="M68 18 H92 V28 L100 40 V88 H60 V40 L68 28 Z" fill="#FACC15" stroke="#854D0E" stroke-width="3"/><rect x="70" y="12" width="20" height="7" rx="2" fill="#16A34A"/></svg>`,
    fridge: `<svg viewBox="0 0 160 110" class="slide-svg"><rect width="160" height="110" rx="16" fill="#FEF3C7"/><rect x="52" y="14" width="56" height="82" rx="6" fill="#F8FAFC" stroke="#1E293B" stroke-width="3"/><line x1="52" y1="46" x2="108" y2="46" stroke="#1E293B" stroke-width="3"/><line x1="98" y1="26" x2="98" y2="38" stroke="#0284C7" stroke-width="4" stroke-linecap="round"/><line x1="98" y1="54" x2="98" y2="72" stroke="#0284C7" stroke-width="4" stroke-linecap="round"/></svg>`,
    led: `<svg viewBox="0 0 160 110" class="slide-svg"><rect width="160" height="110" rx="16" fill="#FEF9C3"/><circle cx="80" cy="46" r="24" fill="#FDE047" stroke="#CA8A04" stroke-width="3"/><rect x="70" y="68" width="20" height="14" rx="3" fill="#94A3B8" stroke="#334155" stroke-width="2.5"/><path d="M80 10 v6 M44 46 h6 M110 46 h6 M54 22 l5 5 M106 22 l-5 5" stroke="#F59E0B" stroke-width="3.5" stroke-linecap="round"/></svg>`,
    solar: `<svg viewBox="0 0 160 110" class="slide-svg"><rect width="160" height="110" rx="16" fill="#E0F2FE"/><circle cx="42" cy="34" r="16" fill="#FACC15" stroke="#CA8A04" stroke-width="3"/><polygon points="72 44 134 44 124 84 62 84" fill="#0284C7" stroke="#1E3A8A" stroke-width="3"/><line x1="98" y1="44" x2="88" y2="84" stroke="#BAE6FD" stroke-width="2"/><line x1="67" y1="64" x2="129" y2="64" stroke="#BAE6FD" stroke-width="2"/></svg>`,
    bins: `<svg viewBox="0 0 160 110" class="slide-svg"><rect width="160" height="110" rx="16" fill="#DCFCE7"/><rect x="20" y="30" width="26" height="54" rx="4" fill="#2563EB" stroke="#1E293B" stroke-width="2.5"/><rect x="52" y="30" width="26" height="54" rx="4" fill="#DC2626" stroke="#1E293B" stroke-width="2.5"/><rect x="84" y="30" width="26" height="54" rx="4" fill="#16A34A" stroke="#1E293B" stroke-width="2.5"/><rect x="116" y="30" width="26" height="54" rx="4" fill="#FACC15" stroke="#1E293B" stroke-width="2.5"/></svg>`,
    compost: `<svg viewBox="0 0 160 110" class="slide-svg"><rect width="160" height="110" rx="16" fill="#DCFCE7"/><path d="M40 90 C46 66 114 66 120 90 Z" fill="#78350F" stroke="#451A03" stroke-width="3"/><path d="M80 68 V36" stroke="#15803D" stroke-width="4" stroke-linecap="round"/><path d="M80 48 C62 46 58 30 76 28 C78 36 80 48 80 48 Z" fill="#22C55E" stroke="#14532D" stroke-width="2.5"/><path d="M80 42 C98 40 102 24 84 22 C82 30 80 42 80 42 Z" fill="#4ADE80" stroke="#14532D" stroke-width="2.5"/></svg>`,
    hazard: `<svg viewBox="0 0 160 110" class="slide-svg"><rect width="160" height="110" rx="16" fill="#FFEDD5"/><rect x="68" y="16" width="24" height="8" rx="2" fill="#64748B" stroke="#1E293B" stroke-width="2.5"/><rect x="54" y="24" width="52" height="68" rx="6" fill="#EA580C" stroke="#1E293B" stroke-width="3"/><rect x="54" y="54" width="52" height="38" rx="4" fill="#1E293B"/><polygon points="84 32 72 52 82 52 76 74 92 48 81 48" fill="#FDE047"/></svg>`,
    plug: `<svg viewBox="0 0 160 110" class="slide-svg"><rect width="160" height="110" rx="16" fill="#F1F5F9"/><rect x="34" y="24" width="92" height="54" rx="6" fill="#1E293B" stroke="#0F172A" stroke-width="3"/><circle cx="114" cy="68" r="5" fill="#EF4444"/><rect x="64" y="78" width="32" height="8" rx="2" fill="#475569"/></svg>`,
    broom: `<svg viewBox="0 0 160 110" class="slide-svg"><rect width="160" height="110" rx="16" fill="#E0F2FE"/><path d="M36 46 H78 L72 88 H42 Z" fill="#0284C7" stroke="#0F172A" stroke-width="3"/><line x1="122" y1="18" x2="98" y2="68" stroke="#78350F" stroke-width="6" stroke-linecap="round"/><polygon points="84 64 112 72 104 92 74 82" fill="#FACC15" stroke="#92400E" stroke-width="2.5"/></svg>`,
    procel: `<svg viewBox="0 0 160 110" class="slide-svg"><rect width="160" height="110" rx="16" fill="#DCFCE7"/><rect x="44" y="16" width="72" height="78" rx="8" fill="#FFFFFF" stroke="#15803D" stroke-width="3"/><rect x="54" y="28" width="44" height="18" rx="4" fill="#16A34A"/><text x="76" y="42" text-anchor="middle" font-size="14" font-weight="800" fill="#FFFFFF">A</text><rect x="54" y="52" width="52" height="8" rx="3" fill="#86EFAC"/><rect x="54" y="66" width="38" height="8" rx="3" fill="#BBF7D0"/></svg>`
  };

  /* ---------------- ÍCONES DE HÁBITOS E MEDALHAS ---------------- */
  const HABIT_ICONS = {
    h1: UI.water,
    h2: `<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="13" r="8"/><path d="M12 9v4l2.5 2.5M9 2h6"/></svg>`,
    h3: UI.quiz,
    h4: `<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22v-5"/><path d="M9 8V2M15 8V2"/><path d="M18 8v5a6 6 0 0 1-12 0V8Z"/></svg>`,
    h5: UI.recycle,
    h6: `<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>`,
    h7: `<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>`,
    h8: `<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`
  };

  /* ---------------- ILUSTRAÇÕES DOS OBJETOS DO DETETIVE ---------------- */
  function sceneObjectSVG(code, fixed) {
    switch (code) {
      case 'tap':
        return `<svg viewBox="0 0 72 72" class="obj-svg">
          <rect x="14" y="42" width="44" height="14" rx="6" fill="#E2E8F0" stroke="#1E293B" stroke-width="2.5"/>
          <path d="M26 42 V24 a8 8 0 0 1 16 0 v6" fill="none" stroke="#64748B" stroke-width="5" stroke-linecap="round"/>
          <rect x="20" y="16" width="12" height="5" rx="2" fill="#0284C7"/>
          ${fixed ? '' : `<path class="anim-drop" d="M42 34 c0 0 5 6 5 9 a5 5 0 0 1-10 0 c0-3 5-9 5-9z" fill="#0EA5E9"/>`}
        </svg>`;
      case 'shower':
        return `<svg viewBox="0 0 72 72" class="obj-svg">
          <path d="M18 14 H48 v10 H34 Z" fill="#94A3B8" stroke="#1E293B" stroke-width="2.5"/>
          ${fixed ? '' : `<path class="anim-stream" d="M32 28 v26 M40 28 v30 M48 28 v26" stroke="#0EA5E9" stroke-width="3" stroke-linecap="round" stroke-dasharray="4 5"/>`}
        </svg>`;
      case 'toilet':
        return `<svg viewBox="0 0 72 72" class="obj-svg">
          <rect x="22" y="12" width="28" height="20" rx="3" fill="#F8FAFC" stroke="#1E293B" stroke-width="2.5"/>
          <path d="M18 32 H54 L48 56 H24 Z" fill="#E2E8F0" stroke="#1E293B" stroke-width="2.5"/>
          ${fixed ? '' : `<path class="anim-stream" d="M36 34 v16" stroke="#0EA5E9" stroke-width="3.5" stroke-linecap="round" stroke-dasharray="3 4"/>`}
        </svg>`;
      case 'cup_brush':
        return `<svg viewBox="0 0 72 72" class="obj-svg">
          <path d="M22 28 H44 L41 58 H25 Z" fill="#BAE6FD" stroke="#0369A1" stroke-width="2.5"/>
          <line x1="46" y1="16" x2="34" y2="52" stroke="#F43F5E" stroke-width="4" stroke-linecap="round"/>
        </svg>`;
      case 'basket':
        return `<svg viewBox="0 0 72 72" class="obj-svg">
          <path d="M16 28 H56 L50 58 H22 Z" fill="#FDE68A" stroke="#92400E" stroke-width="2.5"/>
          <path d="M22 28 C26 18 46 18 50 28" fill="#93C5FD" stroke="#1E3A8A" stroke-width="2.2"/>
        </svg>`;
      case 'fridge':
        return `<svg viewBox="0 0 72 72" class="obj-svg">
          <rect x="18" y="10" width="32" height="52" rx="4" fill="#F8FAFC" stroke="#1E293B" stroke-width="2.5"/>
          <line x1="18" y1="30" x2="50" y2="30" stroke="#1E293B" stroke-width="2.5"/>
          ${fixed
            ? `<line x1="44" y1="18" x2="44" y2="26" stroke="#0284C7" stroke-width="3" stroke-linecap="round"/><line x1="44" y1="36" x2="44" y2="48" stroke="#0284C7" stroke-width="3" stroke-linecap="round"/>`
            : `<polygon points="50 12 64 18 64 58 50 62" fill="#E0F2FE" stroke="#0284C7" stroke-width="2"/><path class="anim-stream" d="M54 26 h8 M54 38 h10" stroke="#38BDF8" stroke-width="2.5" stroke-linecap="round"/>`}
        </svg>`;
      case 'dishes':
        return `<svg viewBox="0 0 72 72" class="obj-svg">
          <rect x="12" y="42" width="48" height="16" rx="4" fill="#CBD5E1" stroke="#1E293B" stroke-width="2.5"/>
          <path d="M28 42 V22 a6 6 0 0 1 12 0 v6" fill="none" stroke="#475569" stroke-width="4" stroke-linecap="round"/>
          ${fixed ? '' : `<path class="anim-stream" d="M40 30 v14" stroke="#0EA5E9" stroke-width="4" stroke-linecap="round"/>`}
        </svg>`;
      case 'oil':
        return `<svg viewBox="0 0 72 72" class="obj-svg">
          <path d="M26 16 H42 V24 L46 32 V56 H22 V32 L26 24 Z" fill="#FACC15" stroke="#854D0E" stroke-width="2.5"/>
          <rect x="27" y="11" width="14" height="5" rx="1.5" fill="${fixed ? '#16A34A' : '#DC2626'}"/>
        </svg>`;
      case 'pot':
        return `<svg viewBox="0 0 72 72" class="obj-svg">
          <rect x="18" y="30" width="36" height="24" rx="4" fill="#94A3B8" stroke="#1E293B" stroke-width="2.5"/>
          <path d="M16 30 Q36 18 56 30 Z" fill="#64748B" stroke="#1E293B" stroke-width="2.5"/>
        </svg>`;
      case 'bins_pair':
        return `<svg viewBox="0 0 72 72" class="obj-svg">
          <rect x="14" y="22" width="20" height="36" rx="3" fill="#16A34A" stroke="#1E293B" stroke-width="2.2"/>
          <rect x="38" y="22" width="20" height="36" rx="3" fill="#78350F" stroke="#1E293B" stroke-width="2.2"/>
        </svg>`;
      case 'tv':
        return `<svg viewBox="0 0 72 72" class="obj-svg">
          <rect x="10" y="16" width="52" height="34" rx="4" fill="${fixed ? '#1E293B' : '#38BDF8'}" stroke="#0F172A" stroke-width="3"/>
          <path d="M28 50 L24 58 H48 L44 50" fill="#475569" stroke="#0F172A" stroke-width="2"/>
          ${fixed ? '' : `<circle cx="36" cy="33" r="8" fill="#FDE047" opacity=".85"/>`}
        </svg>`;
      case 'outlet':
        return `<svg viewBox="0 0 72 72" class="obj-svg">
          <rect x="18" y="18" width="36" height="36" rx="6" fill="#F8FAFC" stroke="#1E293B" stroke-width="2.5"/>
          <circle cx="30" cy="36" r="3" fill="#1E293B"/><circle cx="42" cy="36" r="3" fill="#1E293B"/>
          ${fixed ? '' : `<circle class="anim-drop" cx="46" cy="24" r="4" fill="#EF4444"/><path d="M36 42 v18" stroke="#1E293B" stroke-width="3.5"/>`}
        </svg>`;
      case 'lamp':
        return `<svg viewBox="0 0 72 72" class="obj-svg">
          <polygon points="22 16 50 16 56 36 16 36" fill="${fixed ? '#CBD5E1' : '#FDE047'}" stroke="#1E293B" stroke-width="2.5"/>
          <path d="M36 36 v20 M26 56 h20" stroke="#1E293B" stroke-width="3" stroke-linecap="round"/>
        </svg>`;
      case 'window_sun':
        return `<svg viewBox="0 0 72 72" class="obj-svg">
          <rect x="14" y="12" width="44" height="48" rx="4" fill="#BAE6FD" stroke="#1E293B" stroke-width="2.5"/>
          <circle cx="44" cy="26" r="7" fill="#FACC15"/>
          <path d="M36 12 v48 M14 36 h44" stroke="#1E293B" stroke-width="2.5"/>
        </svg>`;
      case 'books':
        return `<svg viewBox="0 0 72 72" class="obj-svg">
          <rect x="14" y="42" width="44" height="10" rx="2" fill="#2563EB" stroke="#1E293B" stroke-width="2.2"/>
          <rect x="18" y="32" width="38" height="10" rx="2" fill="#16A34A" stroke="#1E293B" stroke-width="2.2"/>
          <rect x="22" y="22" width="32" height="10" rx="2" fill="#F59E0B" stroke="#1E293B" stroke-width="2.2"/>
        </svg>`;
      case 'hose':
        return `<svg viewBox="0 0 72 72" class="obj-svg">
          <path d="M14 54 C14 34 38 34 42 26" fill="none" stroke="#16A34A" stroke-width="6" stroke-linecap="round"/>
          ${fixed ? '' : `<path class="anim-stream" d="M46 24 l16-8 M46 26 l18 0 M46 28 l16 8" stroke="#0EA5E9" stroke-width="3" stroke-linecap="round"/>`}
        </svg>`;
      case 'bucket':
        return `<svg viewBox="0 0 72 72" class="obj-svg">
          ${fixed ? `<rect x="18" y="20" width="36" height="6" rx="2" fill="#0284C7" stroke="#1E293B" stroke-width="2.2"/>` : `<text x="36" y="18" text-anchor="middle" font-size="11" font-weight="800" fill="#B91C1C">ZZZ</text>`}
          <path d="M20 26 H52 L48 56 H24 Z" fill="#38BDF8" stroke="#1E293B" stroke-width="2.5"/>
        </svg>`;
      case 'fire':
        return `<svg viewBox="0 0 72 72" class="obj-svg">
          ${fixed
            ? `<circle cx="36" cy="40" r="14" fill="#4ADE80" stroke="#14532D" stroke-width="2.5"/><path d="M30 40 l4 4 8-8" stroke="#14532D" stroke-width="3" fill="none" stroke-linecap="round"/>`
            : `<path class="anim-drop" d="M36 14 C50 28 52 46 36 56 C20 46 22 28 36 14 Z" fill="#F97316" stroke="#9A3412" stroke-width="2.5"/><path d="M36 28 C44 36 44 46 36 54 C28 46 28 36 36 28 Z" fill="#FDE047"/>`}
        </svg>`;
      case 'solar_panel':
        return `<svg viewBox="0 0 72 72" class="obj-svg">
          <polygon points="16 22 56 22 50 50 10 50" fill="#0284C7" stroke="#1E293B" stroke-width="2.5"/>
          <line x1="36" y1="22" x2="30" y2="50" stroke="#BAE6FD" stroke-width="2"/><line x1="13" y1="36" x2="53" y2="36" stroke="#BAE6FD" stroke-width="2"/>
        </svg>`;
      case 'compost_bin':
        return `<svg viewBox="0 0 72 72" class="obj-svg">
          <rect x="20" y="22" width="32" height="36" rx="4" fill="#78350F" stroke="#451A03" stroke-width="2.5"/>
          <path d="M36 22 V12 M36 16 c-6-4-10 2-4 6 M36 14 c6-4 10 2 4 6" stroke="#16A34A" stroke-width="2.5" fill="none" stroke-linecap="round"/>
        </svg>`;
      case 'broom':
        return `<svg viewBox="0 0 72 72" class="obj-svg">
          <line x1="48" y1="12" x2="30" y2="44" stroke="#92400E" stroke-width="4" stroke-linecap="round"/>
          <polygon points="22 42 38 46 32 58 14 54" fill="#FACC15" stroke="#854D0E" stroke-width="2.2"/>
        </svg>`;
      default:
        return UI.leaf;
    }
  }

  /* ---------------- CENÁRIOS ARQUITETÔNICOS DOS CÔMODOS ---------------- */
  const ROOM_DECOR = {
    banheiro: `<svg viewBox="0 0 800 390" preserveAspectRatio="none" class="room-bg-svg">
      <rect width="800" height="275" fill="#E0F2FE"/>
      <g stroke="#BAE6FD" stroke-width="1.5">
        <line x1="0" y1="55" x2="800" y2="55"/><line x1="0" y1="110" x2="800" y2="110"/>
        <line x1="0" y1="165" x2="800" y2="165"/><line x1="0" y1="220" x2="800" y2="220"/>
        <line x1="100" y1="0" x2="100" y2="275"/><line x1="200" y1="0" x2="200" y2="275"/>
        <line x1="300" y1="0" x2="300" y2="275"/><line x1="400" y1="0" x2="400" y2="275"/>
        <line x1="500" y1="0" x2="500" y2="275"/><line x1="600" y1="0" x2="600" y2="275"/>
        <line x1="700" y1="0" x2="700" y2="275"/>
      </g>
      <!-- Espelho acima da pia -->
      <rect x="95" y="28" width="95" height="72" rx="10" fill="#F8FAFC" stroke="#64748B" stroke-width="3"/>
      <line x1="112" y1="42" x2="132" y2="82" stroke="#BAE6FD" stroke-width="3" stroke-linecap="round"/>
      <!-- Box do chuveiro -->
      <rect x="560" y="10" width="210" height="265" fill="#F0F9FF" fill-opacity=".55" stroke="#94A3B8" stroke-width="3"/>
      <rect y="275" width="800" height="115" fill="#CBD5E1"/>
      <line x1="0" y1="275" x2="800" y2="275" stroke="#475569" stroke-width="4"/>
    </svg>`,
    cozinha: `<svg viewBox="0 0 800 390" preserveAspectRatio="none" class="room-bg-svg">
      <rect width="800" height="275" fill="#FEF3C7"/>
      <!-- Armários superiores -->
      <rect x="270" y="22" width="240" height="68" rx="6" fill="#FDE68A" stroke="#92400E" stroke-width="3"/>
      <line x1="390" y1="22" x2="390" y2="90" stroke="#92400E" stroke-width="3"/>
      <!-- Bancada -->
      <rect x="250" y="175" width="510" height="100" fill="#E2E8F0" stroke="#475569" stroke-width="3"/>
      <rect x="245" y="168" width="520" height="12" rx="3" fill="#64748B"/>
      <rect y="275" width="800" height="115" fill="#E2E8F0"/>
      <line x1="0" y1="275" x2="800" y2="275" stroke="#475569" stroke-width="4"/>
    </svg>`,
    sala: `<svg viewBox="0 0 800 390" preserveAspectRatio="none" class="room-bg-svg">
      <rect width="800" height="275" fill="#EDE9FE"/>
      <!-- Quadro decorativo -->
      <rect x="250" y="30" width="80" height="56" rx="4" fill="#DDD6FE" stroke="#5B21B6" stroke-width="2.5"/>
      <!-- Rack da TV -->
      <rect x="280" y="185" width="220" height="90" rx="6" fill="#A16207" stroke="#451A03" stroke-width="3"/>
      <rect y="275" width="800" height="115" fill="#B45309"/>
      <line x1="0" y1="275" x2="800" y2="275" stroke="#451A03" stroke-width="4"/>
    </svg>`,
    quintal: `<svg viewBox="0 0 800 390" preserveAspectRatio="none" class="room-bg-svg">
      <rect width="800" height="260" fill="#BAE6FD"/>
      <circle cx="110" cy="58" r="32" fill="#FDE047"/>
      <!-- Telhado da casa p/ placa solar -->
      <polygon points="520 120 790 120 750 40 560 40" fill="#B45309" stroke="#451A03" stroke-width="3"/>
      <rect x="545" y="120" width="220" height="140" fill="#F8FAFC" stroke="#334155" stroke-width="3"/>
      <!-- Cerca -->
      <rect x="0" y="210" width="545" height="50" fill="#FDE68A" stroke="#92400E" stroke-width="2.5"/>
      <rect y="260" width="800" height="130" fill="#22C55E"/>
      <line x1="0" y1="260" x2="800" y2="260" stroke="#14532D" stroke-width="4"/>
    </svg>`
  };

  window.EcoIcons = {
    ui: (name) => UI[name] || '',
    mascot: (name) => MASCOTS[name] || MASCOTS.leaf,
    bin: binSVG,
    item: (key) => ITEMS[key] || ITEMS.leaf,
    slide: (key) => SLIDES[key] || SLIDES.compost,
    habit: (id) => HABIT_ICONS[id] || UI.check,
    sceneObj: sceneObjectSVG,
    roomDecor: (id) => ROOM_DECOR[id] || ''
  };
})();
