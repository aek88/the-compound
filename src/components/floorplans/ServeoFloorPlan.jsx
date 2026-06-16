const W = '#1a1a18'
const FT = 'Inter, sans-serif'

function NorthArrow({ cx, cy }) {
  return (
    <g transform={`translate(${cx},${cy})`}>
      <circle r="14" fill="white" stroke="#bbb" strokeWidth="0.75" />
      <path d="M0,-11 L4.5,3 L0,0 Z" fill={W} />
      <path d="M0,-11 L-4.5,3 L0,0 Z" fill="white" stroke={W} strokeWidth="0.6" />
      <path d="M0,0 L4.5,3 L0,11 L-4.5,3 Z" fill="white" stroke={W} strokeWidth="0.6" />
      <text y="-18" textAnchor="middle" fontFamily={FT} fontWeight="700" fontSize="9" fill={W}>N</text>
    </g>
  )
}

function ScaleBar({ x, y }) {
  return (
    <g transform={`translate(${x},${y})`}>
      {[0, 1, 2, 3].map(i => (
        <rect key={i} x={i * 40} y="0" width="40" height="6"
          fill={i % 2 === 0 ? W : 'white'} stroke={W} strokeWidth="0.6" />
      ))}
      {[0, 5, 10, 15, 20].map((label, i) => (
        <text key={label} x={i * 40} y="16" textAnchor="middle"
          fontFamily={FT} fontSize="7" fill="#888">{label}m</text>
      ))}
    </g>
  )
}

function Desk({ x, y }) {
  return (
    <g>
      <rect x={x} y={y} width="60" height="38" rx="2" fill="#e8e4de" stroke="#555" strokeWidth="1.1" />
      <rect x={x + 6} y={y + 5} width="38" height="22" rx="1" fill="#d8dde8" stroke="#888" strokeWidth="0.65" />
      <rect x={x + 10} y={y + 30} width="40" height="5" rx="1" fill="#ccc" stroke="#bbb" strokeWidth="0.5" />
      {/* chair circle below desk */}
      <circle cx={x + 30} cy={y + 52} r="7" fill="none" stroke="#aaa" strokeWidth="0.75" />
    </g>
  )
}

export default function ServeoFloorPlan() {
  // partition coords
  const vS = 460  // workspace | offices+reception
  const hM = 315  // upper | lower zone
  const hO = 185  // private suite | meeting A (right zone)
  const vB = 295  // breakout | meeting B (left lower zone)

  // open-plan desk grid: 5 cols × 2 rows
  const deskCols = [70, 140, 210, 280, 350]
  const deskRows = [118, 188]

  // private suite desks
  const suiteDeskRow1 = [478, 558, 638]
  const suiteDeskRow2 = [518, 598]

  return (
    <svg viewBox="0 0 920 610" xmlns="http://www.w3.org/2000/svg"
      className="w-full h-auto" aria-label="Serveo Group Offices architectural floor plan">

      <rect width="920" height="610" fill="white" />

      {/* ── ROOM FILLS ─────────────────────────────── */}
      <rect x="53" y="53" width="404" height="259" fill="#f8f9fd" />
      <rect x="463" y="53" width="404" height="129" fill="#f3f5fa" />
      <rect x="463" y="188" width="404" height="124" fill="#f5f7fb" />
      <rect x="53" y="318" width="239" height="227" fill="#f7f7f5" />
      <rect x="298" y="318" width="159" height="227" fill="#f5f6fb" />
      <rect x="463" y="318" width="404" height="227" fill="#f7f7f5" />

      {/* ── OUTER WALLS ────────────────────────────── */}
      <line x1="50" y1="50" x2="870" y2="50" stroke={W} strokeWidth="7" strokeLinecap="square" />
      <line x1="870" y1="50" x2="870" y2="548" stroke={W} strokeWidth="7" strokeLinecap="square" />
      {/* bottom: gap at x=678→728 for main entry into reception */}
      <line x1="50" y1="548" x2="678" y2="548" stroke={W} strokeWidth="7" strokeLinecap="square" />
      <line x1="728" y1="548" x2="870" y2="548" stroke={W} strokeWidth="7" strokeLinecap="square" />
      <line x1="50" y1="50" x2="50" y2="548" stroke={W} strokeWidth="7" strokeLinecap="square" />

      {/* ── INTERIOR PARTITIONS ────────────────────── */}
      {/* V-split full height: workspace | offices (with gap in lower zone) */}
      <line x1={vS} y1="50" x2={vS} y2={hM} stroke={W} strokeWidth="5" strokeLinecap="square" />
      {/* V-split lower zone: gap at 385→435 (open plan → reception corridor) */}
      <line x1={vS} y1={hM} x2={vS} y2="385" stroke={W} strokeWidth="5" strokeLinecap="square" />
      <line x1={vS} y1="435" x2={vS} y2="548" stroke={W} strokeWidth="5" strokeLinecap="square" />

      {/* H-mid full width: upper | lower (gap at x=145→195 for breakout entry, x=345→395 for meeting B) */}
      <line x1="50" y1={hM} x2="145" y2={hM} stroke={W} strokeWidth="5" strokeLinecap="square" />
      <line x1="195" y1={hM} x2="345" y2={hM} stroke={W} strokeWidth="5" strokeLinecap="square" />
      <line x1="395" y1={hM} x2={vS} y2={hM} stroke={W} strokeWidth="5" strokeLinecap="square" />
      <line x1={vS} y1={hM} x2="870" y2={hM} stroke={W} strokeWidth="5" strokeLinecap="square" />

      {/* H-office: private suite | meeting A (right zone, gap at 678→728) */}
      <line x1={vS} y1={hO} x2="678" y2={hO} stroke={W} strokeWidth="4" strokeLinecap="square" />
      <line x1="728" y1={hO} x2="870" y2={hO} stroke={W} strokeWidth="4" strokeLinecap="square" />

      {/* V-breakout: breakout | meeting B (left lower) */}
      <line x1={vB} y1={hM} x2={vB} y2="548" stroke={W} strokeWidth="4" strokeLinecap="square" />

      {/* ── DOOR SYMBOLS ───────────────────────────── */}
      {/* Door 1 – main entry south wall (x=678→728) */}
      <line x1="678" y1="548" x2="678" y2="498" stroke={W} strokeWidth="1.5" />
      <path d="M728,548 A50,50 0 0,0 678,498" fill="none" stroke={W} strokeWidth="0.9" strokeDasharray="4,3" />

      {/* Door 2 – breakout entry from open plan (H-mid at x=145→195) */}
      <line x1="145" y1={hM} x2="145" y2="365" stroke={W} strokeWidth="1.5" />
      <path d="M195,315 A50,50 0 0,1 145,365" fill="none" stroke={W} strokeWidth="0.9" strokeDasharray="4,3" />

      {/* Door 3 – meeting B entry from open plan (H-mid at x=345→395) */}
      <line x1="395" y1={hM} x2="395" y2="365" stroke={W} strokeWidth="1.5" />
      <path d="M345,315 A50,50 0 0,1 395,365" fill="none" stroke={W} strokeWidth="0.9" strokeDasharray="4,3" />

      {/* Door 4 – private suite → meeting A (H-office at x=678→728) */}
      <line x1="728" y1={hO} x2="728" y2="135" stroke={W} strokeWidth="1.5" />
      <path d="M678,185 A50,50 0 0,1 728,135" fill="none" stroke={W} strokeWidth="0.9" strokeDasharray="4,3" />

      {/* Door 5 – open plan → reception corridor (V-split lower, y=385→435) */}
      <line x1={vS} y1="385" x2="510" y2="385" stroke={W} strokeWidth="1.5" />
      <path d="M460,435 A50,50 0 0,0 510,385" fill="none" stroke={W} strokeWidth="0.9" strokeDasharray="4,3" />

      {/* ── OPEN PLAN DESKS (5 × 2 grid) ────────────── */}
      {deskCols.map(cx => deskRows.map(ry => (
        <Desk key={`${cx}-${ry}`} x={cx} y={ry} />
      )))}

      {/* Shared display wall */}
      <rect x="68" y="266" width="368" height="18" rx="2"
        fill="#d0d6e8" stroke="#6677aa" strokeWidth="1" strokeDasharray="6,3" />
      <text x="252" y="279" textAnchor="middle" fontFamily={FT} fontSize="7.5" fill="#5566aa">
        SHARED DISPLAY WALL
      </text>

      {/* Aisle label */}
      <text x="252" y="177" textAnchor="middle" fontFamily={FT} fontSize="7" fill="#ccc">aisle</text>

      {/* ── PRIVATE SUITE DESKS ─────────────────────── */}
      {suiteDeskRow1.map(cx => (
        <Desk key={`sr1-${cx}`} x={cx} y={98} />
      ))}
      {suiteDeskRow2.map(cx => (
        <Desk key={`sr2-${cx}`} x={cx} y={148} />
      ))}

      {/* ── MEETING ROOM A — BOARDROOM ──────────────── */}
      <ellipse cx="665" cy="253" rx="152" ry="22" fill="#dde0ea" stroke="#555" strokeWidth="1.5" />
      {/* chairs top */}
      {[-108, -66, -24, 22, 66, 108].map(dx => (
        <rect key={`mta${dx}`} x={665 + dx - 11} y="222" width="22" height="10" rx="2"
          fill="#ccc" stroke="#888" strokeWidth="0.7" />
      ))}
      {/* chairs bottom */}
      {[-108, -66, -24, 22, 66, 108].map(dx => (
        <rect key={`mtb${dx}`} x={665 + dx - 11} y="267" width="22" height="10" rx="2"
          fill="#ccc" stroke="#888" strokeWidth="0.7" />
      ))}
      {/* end chairs */}
      <rect x="505" y="247" width="10" height="14" rx="2" fill="#ccc" stroke="#888" strokeWidth="0.7" />
      <rect x="822" y="247" width="10" height="14" rx="2" fill="#ccc" stroke="#888" strokeWidth="0.7" />
      {/* AV screen */}
      <rect x="506" y="196" width="10" height="80" rx="1" fill="#d0d6e8" stroke="#7788bb" strokeWidth="0.75" />
      <text x="521" y="242" fontFamily={FT} fontSize="6.5" fill="#9988bb"
        transform="rotate(90,521,242)">AV SCREEN</text>

      {/* ── BREAKOUT & LOUNGE ───────────────────────── */}
      {/* sofa 1 */}
      <rect x="68" y="380" width="95" height="38" rx="5" fill="#ddd9d3" stroke="#777" strokeWidth="1.1" />
      <rect x="70" y="382" width="8" height="34" rx="3" fill="#ccc8c2" stroke="#999" strokeWidth="0.6" />
      <rect x="152" y="382" width="8" height="34" rx="3" fill="#ccc8c2" stroke="#999" strokeWidth="0.6" />
      {/* sofa 2 */}
      <rect x="185" y="380" width="95" height="38" rx="5" fill="#ddd9d3" stroke="#777" strokeWidth="1.1" />
      <rect x="187" y="382" width="8" height="34" rx="3" fill="#ccc8c2" stroke="#999" strokeWidth="0.6" />
      <rect x="269" y="382" width="8" height="34" rx="3" fill="#ccc8c2" stroke="#999" strokeWidth="0.6" />
      {/* coffee table */}
      <rect x="122" y="374" width="104" height="55" rx="3" fill="#e6e2dc" stroke="#888" strokeWidth="1" />
      <rect x="127" y="379" width="94" height="45" rx="2" fill="#dedad4" stroke="#aaa" strokeWidth="0.6" />

      {/* ── MEETING ROOM B — HUDDLE ──────────────────── */}
      <rect x="314" y="358" width="124" height="86" rx="3" fill="#dde0ea" stroke="#555" strokeWidth="1.5" />
      {/* 4 chairs around table */}
      <rect x="339" y="348" width="74" height="12" rx="2" fill="#ccc" stroke="#888" strokeWidth="0.7" />
      <rect x="339" y="443" width="74" height="12" rx="2" fill="#ccc" stroke="#888" strokeWidth="0.7" />
      <rect x="303" y="373" width="12" height="48" rx="2" fill="#ccc" stroke="#888" strokeWidth="0.7" />
      <rect x="437" y="373" width="12" height="48" rx="2" fill="#ccc" stroke="#888" strokeWidth="0.7" />
      <text x="376" y="405" textAnchor="middle" fontFamily={FT} fontSize="7" fill="#888">4-person</text>

      {/* ── RECEPTION & ENTRY ───────────────────────── */}
      {/* L-shaped reception counter */}
      <rect x="490" y="428" width="340" height="42" rx="2" fill="#d8d4ce" stroke="#555" strokeWidth="1.2" />
      <rect x="810" y="348" width="42" height="122" rx="2" fill="#d8d4ce" stroke="#555" strokeWidth="1.2" />
      <text x="660" y="454" textAnchor="middle" fontFamily={FT} fontSize="7.5" fill="#666">RECEPTION COUNTER</text>
      {/* entry mat indicator */}
      <rect x="635" y="520" width="82" height="20" rx="1"
        fill="#e8e5e0" stroke="#bbb" strokeWidth="0.75" strokeDasharray="3,2" />
      <text x="676" y="534" textAnchor="middle" fontFamily={FT} fontSize="6.5" fill="#bbb">ENTRY MAT</text>

      {/* ── ROOM LABELS ─────────────────────────────── */}
      <text x="254" y="72" textAnchor="middle" fontFamily={FT} fontWeight="700" fontSize="10.5"
        fill={W} letterSpacing="1.5">OPEN PLAN WORKSPACE</text>
      <text x="254" y="87" textAnchor="middle" fontFamily={FT} fontSize="8.5" fill="#888">
        10 workstations · hot-desk + assigned · ≈ 66 m²
      </text>

      <text x="665" y="72" textAnchor="middle" fontFamily={FT} fontWeight="700" fontSize="9.5"
        fill={W} letterSpacing="1.5">PRIVATE OFFICE SUITE</text>
      <text x="665" y="86" textAnchor="middle" fontFamily={FT} fontSize="8" fill="#888">
        Serveo Group · 5 assigned desks · ≈ 36 m²
      </text>

      <text x="665" y="198" textAnchor="middle" fontFamily={FT} fontWeight="700" fontSize="9.5"
        fill={W} letterSpacing="1.5">MEETING ROOM A</text>
      <text x="665" y="211" textAnchor="middle" fontFamily={FT} fontSize="8" fill="#888">
        boardroom · 14 seats · AV-equipped · ≈ 30 m²
      </text>

      <text x="170" y="470" textAnchor="middle" fontFamily={FT} fontWeight="700" fontSize="9"
        fill={W} letterSpacing="1">BREAKOUT</text>
      <text x="170" y="483" textAnchor="middle" fontFamily={FT} fontSize="8" fill="#888">
        & LOUNGE · ≈ 34 m²
      </text>

      <text x="376" y="475" textAnchor="middle" fontFamily={FT} fontWeight="700" fontSize="9"
        fill={W} letterSpacing="1">MEETING</text>
      <text x="376" y="488" textAnchor="middle" fontFamily={FT} fontWeight="700" fontSize="9"
        fill={W} letterSpacing="1">ROOM B</text>
      <text x="376" y="500" textAnchor="middle" fontFamily={FT} fontSize="7.5" fill="#888">huddle · ≈ 22 m²</text>

      <text x="655" y="368" textAnchor="middle" fontFamily={FT} fontWeight="700" fontSize="9.5"
        fill="#999" letterSpacing="1.2">RECEPTION &</text>
      <text x="655" y="383" textAnchor="middle" fontFamily={FT} fontWeight="700" fontSize="9.5"
        fill="#999" letterSpacing="1.2">ENTRY</text>
      <text x="655" y="397" textAnchor="middle" fontFamily={FT} fontSize="8" fill="#bbb">
        access from The Compound Cafe · ≈ 56 m²
      </text>

      {/* ── DIMENSION ANNOTATIONS ──────────────────── */}
      <line x1="50" y1="36" x2="870" y2="36" stroke="#ccc" strokeWidth="0.75" />
      <line x1="50" y1="32" x2="50" y2="40" stroke="#ccc" strokeWidth="0.75" />
      <line x1="870" y1="32" x2="870" y2="40" stroke="#ccc" strokeWidth="0.75" />
      <text x="460" y="33" textAnchor="middle" fontFamily={FT} fontSize="7" fill="#bbb">≈ 20 m</text>
      <line x1="36" y1="50" x2="36" y2="548" stroke="#ccc" strokeWidth="0.75" />
      <line x1="32" y1="50" x2="40" y2="50" stroke="#ccc" strokeWidth="0.75" />
      <line x1="32" y1="548" x2="40" y2="548" stroke="#ccc" strokeWidth="0.75" />
      <text x="32" y="302" textAnchor="middle" fontFamily={FT} fontSize="7" fill="#bbb"
        transform="rotate(-90,32,302)">≈ 12 m</text>

      {/* ── NORTH ARROW ─────────────────────────────── */}
      <NorthArrow cx={885} cy={26} />

      {/* ── SCALE BAR ────────────────────────────────── */}
      <ScaleBar x={50} y={567} />

      {/* ── LEGEND ──────────────────────────────────── */}
      <g transform="translate(330,564)">
        <line x1="0" y1="0" x2="0" y2="-18" stroke={W} strokeWidth="1.5" />
        <path d="M18,0 A18,18 0 0,0 0,-18" fill="none" stroke={W} strokeWidth="0.9" strokeDasharray="3,2" />
        <text x="24" y="-2" fontFamily={FT} fontSize="7" fill="#888">Door swing</text>
        <line x1="100" y1="-4" x2="148" y2="-4" stroke={W} strokeWidth="5" />
        <text x="154" y="-2" fontFamily={FT} fontSize="7" fill="#888">Wall</text>
      </g>

      {/* ── TITLE BLOCK ──────────────────────────────── */}
      <text x="460" y="603" textAnchor="middle" fontFamily={FT} fontSize="7.5" fill="#ccc" letterSpacing="2">
        SERVEO GROUP OFFICES — FLOOR PLAN — ILLUSTRATIVE, NOT TO SCALE
      </text>
    </svg>
  )
}
